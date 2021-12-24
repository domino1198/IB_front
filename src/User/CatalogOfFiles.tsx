import React, {useEffect, useState} from "react";
import {Files} from "../local";
import FolderIcon from '@mui/icons-material/Folder';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import {useTypedSelector} from "../hooks/useTypeSelector";
import {IconButton} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import axios from "axios";
import {SimpleDialogFileEdit} from "./modalEditFiles";

export const CatalogOfFiles = (props: {
    data: Files[],
    setPrevId: React.Dispatch<React.SetStateAction<string[]>>,
    prevId: string[],
    setLvl: React.Dispatch<React.SetStateAction<number>>,
    lvl: number,
    UpdateData: () => Promise<void>,
    setAccessFolder: React.Dispatch<React.SetStateAction<number>>,
    accessFolder: number
}) => {

    const {data, setPrevId, prevId, setLvl, lvl, UpdateData, setAccessFolder, accessFolder} = props;

    const [arrayId, setArrayId] = useState<string[]>([]);
    const [prevArrdayId, setPrevArrayId] = useState<string[]>([]);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [open, setOpen] = useState(-1);
    const [openModalFile, setOpenModalFile] = useState(false);
    const [stateData, setStateData] = useState(-1);
    const [currentData, setCurrentData] = useState<Files | undefined>()


    const handleCloseFileModal = () => {
        setOpenModalFile(false);
        setAnchorEl(null);
        // setStateData(-1);
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>, num: number) => {
        setAnchorEl(event.currentTarget);
        setOpen(num);
        console.log(arrayId, data);
        let state = data.find((item2) => item2.id === arrayId[stateData])
        setCurrentData(state);
        console.log(state)
    };
    const handleClose = () => {
        setOpen(-1);
        // setAnchorEl(null);
        // setCurrentData(undefined);
    };

    const user = useTypedSelector(state => state.user.user);

    const DoingWithFolder = (lvlObject: number, id: string, array?: string[], access?: { name: string, writing: boolean }[]) => {
        let addFolder = access && access.find((item) => item.name === user?._id)
        let state = [...prevId];
        if (addFolder && addFolder.writing)
            setAccessFolder(lvlObject);
        state.push(id)
        setPrevId(state);
        setPrevArrayId([...arrayId]);
        array && setArrayId(array);
        setLvl(lvlObject);
    }

    const BackLvl = () => {
        let state = [...prevId];
        if (accessFolder > lvl-1)
            setAccessFolder(lvl - 1);
        state.pop();
        setPrevId(state);
        setArrayId([...prevArrdayId]);
        setLvl(lvl - 1);
    }

    const DeleteItem = async (itemId: string) => {
        const res = axios.delete(`/folders/${itemId}/${user?._id}`);
        await UpdateData();
    }

    useEffect(() => {
        if (lvl !== 1) {
            let state = data.find((item) => item.id === prevId[prevId.length - 1]);
            console.log(state?.files)
            state && state.files && setArrayId(state.files);
        }
    }, [data])

    return (
        <div>
            {openModalFile &&
            <SimpleDialogFileEdit open={openModalFile} onClose={handleCloseFileModal} prevId={prevId} lvl={lvl}
                                  UpdateData={UpdateData}
                                  data={lvl !== 1 && currentData ? currentData : data[stateData]}/>}
            {lvl !== 1 &&
            <IconButton color="primary" onClick={BackLvl}>
                <ArrowBackIcon/>
                Назад
            </IconButton>
            }
            <div style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '10%'
            }}>
                {(lvl === 1) ?
                    data.length > 0 && data.map((item, index) => {
                        if (item.access && item.access.find((item2) => item2.name === user?._id) && item.lvl === 1) return (
                            <div key={index} style={{
                                marginInline: 20,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <IconButton
                                    id="fade-button"
                                    aria-controls="fade-menu"
                                    onClick={(e) => handleClick(e, index)}
                                    color="primary" aria-label="upload picture">
                                    {item.type === 'folder' ? <FolderIcon sx={{fontSize: 80}}/> :
                                        <FileOpenIcon sx={{fontSize: 80}}/>}
                                </IconButton>
                                {item.name}
                                <Menu

                                    key={index}
                                    anchorEl={anchorEl}
                                    open={open === index}
                                    MenuListProps={{
                                        'aria-labelledby': 'fade-button',
                                    }}
                                    onClose={handleClose}
                                    onClick={handleClose}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1.5,
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            '&:before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'background.paper',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                    }}
                                    transformOrigin={{horizontal: 'right', vertical: 'top'}}
                                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                                >
                                    <MenuItem
                                        onClick={data[index].type === 'folder' ? () => DoingWithFolder(item.lvl + 1, item.id, item.files, item.access) : () => {
                                            setStateData(index)
                                            setOpenModalFile(true)
                                        }
                                        }>
                                        Открыть
                                    </MenuItem>
                                    {data[index].type === 'folder' && item.access.find((item) => item.writing && user?._id === item.name) &&
                                    <MenuItem onClick={() => {
                                        setStateData(index)
                                        setOpenModalFile(true)
                                    }}>
                                        Изменить
                                    </MenuItem>}
                                    {item.creator === user?._id &&
                                    <>
                                        <Divider/>
                                        <MenuItem
                                            onClick={() => DeleteItem(item.id)}
                                        >
                                            Удалить
                                        </MenuItem>
                                    </>}
                                </Menu>
                            </div>
                        )
                    }) :
                    arrayId.map((itemId, index) => {
                        let object = data.find((item2) => item2.id === itemId)
                        if (object && user && object.access.find((item) => item.name === user._id)) {
                            return (
                                <div key={index} style={{
                                    marginInline: 20,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <IconButton
                                        onClick={(e) => handleClick(e, index)}
                                        color="primary" aria-label="upload picture">
                                        {object.type === 'folder' ? <FolderIcon sx={{fontSize: 80}}/> :
                                            <FileOpenIcon sx={{fontSize: 80}}/>}

                                    </IconButton>
                                    <div>
                                        {object?.name}
                                    </div>
                                    <Menu

                                        key={index}
                                        anchorEl={anchorEl}
                                        open={open === index}
                                        MenuListProps={{
                                            'aria-labelledby': 'fade-button',
                                        }}
                                        onClose={handleClose}
                                        onClick={handleClose}
                                        PaperProps={{
                                            elevation: 0,
                                            sx: {
                                                overflow: 'visible',
                                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                mt: 1.5,
                                                '& .MuiAvatar-root': {
                                                    width: 32,
                                                    height: 32,
                                                    ml: -0.5,
                                                    mr: 1,
                                                },
                                                '&:before': {
                                                    content: '""',
                                                    display: 'block',
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 14,
                                                    width: 10,
                                                    height: 10,
                                                    bgcolor: 'background.paper',
                                                    transform: 'translateY(-50%) rotate(45deg)',
                                                    zIndex: 0,
                                                },
                                            },
                                        }}
                                        transformOrigin={{horizontal: 'right', vertical: 'top'}}
                                        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                                    >
                                        <MenuItem
                                            onClick={object.type === 'folder' ? () => DoingWithFolder(object ? object.lvl + 1 : 1, object ? object.id + 1 : '', object?.files) : () => {
                                                let index = data.findIndex((item) => item.id === object?.id);
                                                index && setStateData(index);
                                                setOpenModalFile(true)
                                            }}>
                                            Открыть
                                        </MenuItem>
                                        {object.type === 'folder' && object.access.find((item) => item.writing && user?._id === item.name) &&
                                        <MenuItem
                                            onClick={() => {
                                                setStateData(index)
                                                setOpenModalFile(true)
                                            }}>
                                                 Изменить
                                        </MenuItem>}
                                        {object.creator === user?._id &&
                                        <>
                                            <Divider/>
                                            <MenuItem
                                                onClick={() => object && DeleteItem(object.id)
                                                }
                                            >
                                                Удалить
                                            </MenuItem>
                                        </>}
                                    </Menu>
                                </div>
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}
