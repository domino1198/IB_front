import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {useEffect, useState} from "react";
import {Button, Checkbox, DialogActions, DialogContent, IconButton, TextField} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import axios, {} from "axios";
import {useTypedSelector} from "../hooks/useTypeSelector";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import {Files} from "../local";
import {User} from "../Redux/types/userTypes";

export interface SimpleDialogProps {
    open: boolean;
    onClose: () => void;
    prevId: string[];
    lvl: number;
    UpdateData: () => Promise<void>;
    data: Files
}


export const SimpleDialogFileEdit = (props: SimpleDialogProps) => {
    const {onClose, open, prevId, lvl, UpdateData, data} = props;

    const user = useTypedSelector(state => state.user.user);

    const [name, setName] = useState(data.name ? data.name : '');
    const [access, setAccess] = useState<{ name: string, writing: boolean }[]>([]);
    const [login, setLogin] = useState('');
    const [text, setText] = useState(data.url ? data.url : '');
    const [fRender, setFRender] = useState(true);

    let accessEdit = data.access.find((item) => item.name === user?._id && item.writing)

    const AddLoginUser = async () => {
        let state = []
        for (let i = 0; i < data.access.length; i++) {
            console.log(data.access[i].name)
            if (data.creator !== data.access[i].name) {
                let item = await axios.get<User>(`/users/${data.access[i].name}`);
                state.push({name: item.data.login, writing: data.access[i].writing});
            }
        }
        setAccess(state);
    }

    useEffect(() => {
        if (fRender && data.creator === user?._id) {
            setFRender(false);
            AddLoginUser();
        }
    }, [fRender])

    const handleClose = () => {
        onClose();
        setAccess([])
        setName('');
        setText('');
        setLogin('');
    };

    const addLogin = () => {
        let state = [...access];
        state.push({name: login, writing: false});
        setAccess(state);
        setLogin('');
    }

    const CreateFolder = async () => {
        if (user) {
            console.log(access)
            const res = await axios.put(`/folders/${data.id}`, {
                name: name,
                access: data.creator === user._id ? access : undefined,
                creatorId: data.creator === user._id ? data.creator : undefined,
                url: text,
            })
            await UpdateData();

        }
        handleClose();
    }

    return (
        <Dialog maxWidth={'sm'} fullWidth={true} onClose={handleClose} open={open}>
            <div style={{display: 'flex',padding:20, alignItems: 'center', justifyContent: 'space-between'}}>
                <DialogTitle style={{marginLeft: '20%'}}>{!accessEdit ? `Название: ${data.name}` : "Впишите название файла и доступ"}</DialogTitle>
                <DialogActions>
                    <IconButton
                        onClick={handleClose}>
                        <CloseIcon/>
                    </IconButton>
                </DialogActions>
            </div>

            <DialogContent style={{padding:20}}>
                {accessEdit && <div style={{marginBottom: 10}}>Название</div>}
                {accessEdit && <TextField disabled={!accessEdit} fullWidth={true} value={name} onChange={(e) => setName(e.target.value)} id="outlined-basic"
                           label="Название"
                           variant="outlined"/>}
                {data.creator === user?._id &&
                <>
                    <div style={{marginBlock: 10}}>Добавить доступ пользовaтелям</div>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                         <TextField fullWidth={true} value={login} onChange={(e) => setLogin(e.target.value)}
                                   label="Логин пользователя"
                                   id="outlined-basic" variant="outlined"/>
                        <Button onClick={addLogin} variant="contained" style={{marginLeft: 20}}> Добавить</Button>
                    </div>
                </>}
                {access.map((item, index) => (
                    <div key={index} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        Логин: {item.name}
                        <div style={{display: 'flex', alignItems: 'center',}}>
                            <div style={{marginLeft: 20}}>Доступ к изменениям:</div>
                            <Checkbox style={{marginInline: 10}} checked={item.writing} onChange={(e) => {
                                let state = [...access];
                                state[index].writing = e.target.checked;
                                setAccess(state)
                            }
                            }/>
                            <IconButton
                                onClick={() => {
                                    let state = [...access];
                                    state.splice(index, 1);
                                    setAccess(state)
                                }}
                                style={{color: '#FE2E2E'}}>
                                <CloseIcon/>
                            </IconButton>
                        </div>
                    </div>
                ))}
            </DialogContent>
            {data.type === 'file' && <DialogContent style={{padding:20}}>
                <TextareaAutosize
                    disabled={!accessEdit}
                    value={text}
                    onChange={e => setText(e.target.value)}
                    aria-label="minimum height"
                    minRows={8}
                    placeholder="Текст файла"
                    style={{ width: '98%' }}
                />
            </DialogContent>}
            {accessEdit && <DialogActions style={{padding:20}}>
                <Button onClick={CreateFolder} variant="contained" color={'primary'}>
                    Сохранить изменения
                </Button>
            </DialogActions>}
        </Dialog>
    );
}
