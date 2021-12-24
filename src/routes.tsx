import React, {useState} from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import {SignInPage} from "./Login/signIn";
import {RegistrationPage} from "./Login/registration";
import {MainPage} from "./User/main";
import {MainProfile} from "./User/mainProfile";

export const RouterComponent = () => {
    return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SignInPage/>}/>
                    <Route path="/user" element={<MainPage/>}/>
                    <Route path="/profile" element={<MainProfile/>}/>
                    <Route path={'/registration'} element={<RegistrationPage/>}/>
                </Routes>
            </BrowserRouter>
    )
}
