import React, {useEffect, useState} from 'react';
import {TextField} from "@mui/material";
import Button from '@mui/material/Button';
import {
    useNavigate
} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../hooks/useTypeSelector";
import {ClearError, PostUser} from "../Redux/actions/user";

export const SignInPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useTypedSelector(state => state.user);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [fRender, setFRender] = useState(true)

    const SignInFun = () => {
        setError('');
        if (login.length <= 6) {
            setError('Слишком маленький логин')
        } else if (password.length <= 6) setError("Слишком маленький пароль")
        else {
            dispatch(PostUser(login, password));
            if (user.error)
                setError(user.error)
            else if (user.user)
            {
                setError('')
                navigate("/user");
            }


        }

    }

    useEffect(() => {
        if (fRender) {
            setFRender(false);
            dispatch(ClearError());
        } else {
            console.log(user)
            if (user.error)
                setError(user.error)
            else if (user.user)
            {
                setError('')
                navigate("/user");
            }
        }
    }, [fRender, user, error])


    return (
        <div style={{display: 'flex', flex: '1 0 auto', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{
                backgroundColor: '#F5F7FA',
                width: '35%',
                padding: 45,
                borderRadius: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',

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
                    <TextField
                        error={error === 'Слишком маленький логин' || error === 'Incorrect login or password'}
                        helperText={error === 'Слишком маленький логин' ? 'Слишком маленький логин' : ''}
                        value={login} onChange={(e) => setLogin(e.target.value)} id="outlined-basic"
                        label="Логин"
                        variant="outlined"
                        style={{marginBottom: 20, width: '100%'}}/>
                    <TextField error={error === "Слишком маленький пароль" || error === 'Incorrect login or password'}
                               helperText={error === "Слишком маленький пароль" ? "Слишком маленький пароль" : error === 'Incorrect login or password' ? 'Неверный логин или пароль' : ''}
                               type={'password'}
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               id="outlined-basic" label="Пароль" variant="outlined" style={{width: '100%'}}/>
                </div>
                <div>
                    <Button
                        onClick={SignInFun}
                        variant="contained" size={'large'}>
                        Зайти
                    </Button>
                </div>
                <Button onClick={() => navigate('/registration')} style={{color: 'rgb(25, 118, 210)', marginTop: 20}}>
                    Регистрация
                </Button>
            </div>
        </div>
    );
}

