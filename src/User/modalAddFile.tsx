import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {useState} from "react";
import {Button, Checkbox, DialogActions, DialogContent, IconButton, TextField} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import axios, {} from "axios";
import {useTypedSelector} from "../hooks/useTypeSelector";
import TextareaAutosize from '@mui/material/TextareaAutosize';

export interface SimpleDialogProps {
    open: boolean;
    onClose: () => void;
    prevId: string[];
    lvl: number;
    UpdateData: () =>  Promise<void>;
}

export const SimpleDialogFile = (props: SimpleDialogProps) => {
    const {onClose, open, prevId, lvl,UpdateData} = props;

    const [name, setName] = useState('');
    const [access, setAccess] = useState<{ name: string, writing: boolean }[]>([]);
    const [login, setLogin] = useState('');
    const [text,setText] = useState('');

    const user = useTypedSelector(state => state.user.user)

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
        if(user){
            console.log(access)
            const res = await axios.post('/folders', {
                files: prevId[prevId.length - 1],
                name: name,
                access: access,
                type: 'file',
                lvl: lvl,
                creatorId:user._id,
                url:text,
            })
            await UpdateData();

        }
        handleClose();
    }

    return (
        <Dialog maxWidth={'sm'} fullWidth={true} onClose={handleClose} open={open}>
            <div style={{display: 'flex',padding:20, alignItems: 'center', justifyContent: 'space-between'}}>
                <DialogTitle style={{marginLeft: '20%'}}>Впишите название файла и доступ</DialogTitle>
                <DialogActions>
                    <IconButton
                        onClick={handleClose}>
                        <CloseIcon/>
                    </IconButton>
                </DialogActions>
            </div>

            <DialogContent style={{padding:20}}>
                <div style={{marginBottom: 10}}>Название</div>
                <TextField fullWidth={true} value={name} onChange={(e) => setName(e.target.value)} id="outlined-basic"
                           label="Название"
                           variant="outlined"/>
                <div style={{marginBlock: 10}}>Добавить доступ пользовaтелям</div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <TextField fullWidth={true} value={login} onChange={(e) => setLogin(e.target.value)}
                               label="Логин пользователя"
                               id="outlined-basic" variant="outlined"/>
                    <Button onClick={addLogin} variant="contained" style={{marginLeft: 20}}> Добавить</Button>
                </div>
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
            <DialogContent style={{padding:20}}>
                <TextareaAutosize
                    value={text}
                    onChange={e => setText(e.target.value)}
                    aria-label="minimum height"
                    minRows={8}
                    placeholder="Текст файла"
                    style={{ width: '98%' }}
                />
            </DialogContent>
            <DialogActions style={{padding:20}}>
                <Button onClick={CreateFolder} variant="contained" color={'primary'}>
                    Создать файл
                </Button>
            </DialogActions>
        </Dialog>
    );
}
