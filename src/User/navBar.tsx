import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {useNavigate} from "react-router-dom";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListItemIcon from '@mui/material/ListItemIcon';
import {ListItemText} from "@mui/material";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../hooks/useTypeSelector";
import {ClearError, ClearUser} from "../Redux/actions/user";
import HomeIcon from '@mui/icons-material/Home';

export const NavBar = (props: { profile?: boolean }) => {

    const {profile} = props;

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const navigate = useNavigate()

    const dispatch = useDispatch();
    const user = useTypedSelector(state => state.user.user)

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    console.log(user?._id)
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Box sx={{width: '100%', position: 'fixed', alignItems: 'flex-start'}}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Привет, {user?.firstName} {user?.lastName}
                        </Typography>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <MenuIcon/>
                                {/*<div style={{marginLeft:10}}>Меню</div>*/}
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={
                                    () => profile ? navigate('/user') : navigate('/profile')}>
                                    <ListItemIcon>
                                        {profile ? <HomeIcon fontSize="small"/> : <AccountCircle fontSize="small"/>}
                                    </ListItemIcon>
                                    <ListItemText>
                                        {profile ? "main" :'Profile'}
                                    </ListItemText>
                                </MenuItem>
                                <MenuItem onClick={() => {
                                    dispatch(ClearError());
                                    dispatch(ClearUser());
                                    navigate('/');
                                }}><ListItemIcon><ExitToAppIcon fontSize="small"/></ListItemIcon>
                                    <ListItemText>Logout</ListItemText>
                                </MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}
