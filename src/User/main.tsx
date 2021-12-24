import React, {useEffect, useState} from "react";
import {NavBar} from "./navBar";
import {CatalogOfFiles} from "./CatalogOfFiles";
import {IconButton} from "@mui/material";
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import {SimpleDialog} from "./modalAddFolder";
import {Files} from "../local";
import axios, {} from "axios";
import {useTypedSelector} from "../hooks/useTypeSelector";
import {SimpleDialogFile} from "./modalAddFile";

export const MainPage = () => {

    const [openModal, setOpenModal] = useState(false);
    const [openModalFile, setOpenModalFile] = useState(false);
    const [data, setData] = useState<Files[]>([]);
    const [fRender, setFRender] = useState(true)
    const [prevId, setPrevId] = useState<string[]>([]);
    const [lvl, setLvl] = useState(1);
    const user = useTypedSelector(state => state.user.user);
    const [accessFolder,setAccessFolder] = useState(1);

    const handleClose = () => {
        setOpenModal(false);
    };

    const handleCloseFile = () => {
        setOpenModalFile(false);
    };

    const UpdateData = async () => {
        let state: any = user ? await axios.get(`/folders/${user._id}`) : [];
        let change = [];
        for (let i = 0; i < state.data.length; i++) {
            let finalState: Files = {
                id: state.data[i]._id,
                lvl: state.data[i].lvl,
                name: state.data[i].name,
                creator: state.data[i].creatorId,
                type: state.data[i].type,
                access: state.data[i].access,
                files: state.data[i].files,
                url: state.data[i].url
            }
            console.log(data)
            change.push(finalState);
        }
        setData(change);

    }

    useEffect(() => {
        if (fRender) {
            setFRender(false);
            UpdateData();
        }
    }, [fRender])
    console.log(data)
    return (
        <div>
            <NavBar/>
            <SimpleDialog
                open={openModal}
                onClose={handleClose}
                UpdateData={UpdateData}
                prevId={prevId}
                lvl={lvl}
            />
            <SimpleDialogFile
                open={openModalFile}
                onClose={handleCloseFile}
                UpdateData={UpdateData}
                prevId={prevId}
                lvl={lvl}
            />
            <div style={{
                marginTop: lvl !== accessFolder ? 150 :100,
                display: 'flex',
                justifyContent: 'flex-end',
                width: '100%',
                alignItems: 'flex-end',
            }}>
                {lvl === accessFolder && <>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <IconButton onClick={() => setOpenModal(true)} component="span">
                            <CreateNewFolderIcon sx={{fontSize: 30}} color={'primary'}/>

                        </IconButton>
                        Добавить папку
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginInline: 32}}>
                        <IconButton onClick={() => setOpenModalFile(true)}>
                            <UploadFileIcon sx={{fontSize: 30}} color={'primary'}/>
                        </IconButton>
                        Добавить файл
                    </div>
                </>}

            </div>
            <div style={{display: 'flex', width: '84%', alignItems: 'center', marginInline: '8%'}}>
                <CatalogOfFiles accessFolder={accessFolder} setAccessFolder={setAccessFolder} UpdateData={UpdateData} lvl={lvl} data={data} setPrevId={setPrevId} prevId={prevId} setLvl={setLvl}/>
            </div>
        </div>
    )
}
