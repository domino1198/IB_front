import React, {useState} from 'react'
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import axios, {} from "axios";

export const RegistrationPage = () => {

    const navigate = useNavigate();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [error, setError] = useState('');

    const SignInFun = async () => {
        setError('');
        if (login.length <= 6)
            setError('Слишком маленький логин')
        else if (password.length <= 6) setError("Слишком маленький пароль")
        else if (fName.length < 2) setError("Слишком маленькое имя")
        else if (lName.length < 2) setError("Слишком маленькая фамилия")
        else {
            await axios.post('/registration',{login,password,fName,lName});
            navigate("/");
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
                    <TextField error={error === "Слишком маленький пароль"}
                               helperText={error === "Слишком маленький пароль" ? "Слишком маленький пароль" : ''}
                               type={'password'}
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               id="outlined-basic" label="Пароль" variant="outlined" style={{width: '100%'}}/>
                </div>
                <div>
                    <Button
                        onClick={SignInFun}
                        variant="contained" size={'large'}>
                        Зарегистрироваться
                    </Button>
                </div>
                <Button onClick={() => navigate('/')} style={{color: 'rgb(25, 118, 210)', marginTop: 20}}>
                    Зайти за зарегестрированного ползователя
                </Button>
            </div>
        </div>
    )
}
