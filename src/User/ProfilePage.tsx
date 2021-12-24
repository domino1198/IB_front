import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useTypedSelector} from "../hooks/useTypeSelector";
import {PutUser} from "../Redux/actions/user";
import {useDispatch} from "react-redux";


export const ProfilePage = () => {
    const navigate = useNavigate();

    const user = useTypedSelector(state => state.user.user)
    const dispatch = useDispatch();
    const [login, setLogin] = useState(user ? user.login : '');
    const [fName, setFName] = useState(user ? user.firstName : '');
    const [lName, setLName] = useState(user ? user.lastName : '');
    const [error, setError] = useState('');

    const SignInFun = async () => {
        setError('');
        if (login.length <= 6)
            setError('Слишком маленький логин')
        else if (fName.length < 2) setError("Слишком маленькое имя")
        else if (lName.length < 2) setError("Слишком маленькая фамилия")
        else {
            console.log(login,fName,lName,user?._id)
            user && user._id && await dispatch(PutUser(login,fName,lName,user?._id));
            navigate("/user");
        }
    }

    return (
        <div style={{display: 'flex', flex: '1 0 auto', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{
                backgroundColor: '#F5F7FA',
                width: '35%',
                padding: 45,
                borderRadius: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <div
                    style={{
                        textAlign: 'center',
                        fontSize: 36,
                        fontWeight: 'bold',
                        color: 'rgb(25, 118, 210)'
                    }}>Авторизация
                </div>
                <div style={{marginBlock: '10%', width: '60%'}}>
                    <TextField error={error === "Слишком маленькое имя"}
                               helperText={error === "Слишком маленькое имя" ? "Слишком маленькое имя" : ''}
                               value={fName}
                               onChange={(e) => setFName(e.target.value)}
                               id="outlined-basic" label='Имя' variant="outlined"
                               style={{marginBottom: 20, width: '100%'}}/>
                    <TextField error={error === "Слишком маленькая фамилия"}
                               helperText={error === "Слишком маленькая фамилия" ? "Слишком маленькая фамилия" : ''}
                               value={lName}
                               onChange={(e) => setLName(e.target.value)}
                               id="outlined-basic" label='Фамилия' variant="outlined"
                               style={{marginBottom: 20, width: '100%'}}/>
                    <TextField
                        error={error === 'Слишком маленький логин'}
                        helperText={error === 'Слишком маленький логин' ? 'Слишком маленький логин' : ''}
                        value={login} onChange={(e) => setLogin(e.target.value)} id="outlined-basic"
                        label="Логин"
                        variant="outlined"
                        style={{marginBottom: 20, width: '100%'}}/>
                </div>
                <div>
                    <Button
                        onClick={SignInFun}
                        variant="contained" size={'large'}>
                        Сохранить
                    </Button>
                </div>
            </div>
        </div>
    )
}
