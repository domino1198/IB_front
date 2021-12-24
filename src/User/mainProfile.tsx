import React from 'react'
import {NavBar} from "./navBar";
import {ProfilePage} from "./ProfilePage";


export const MainProfile = () => {

    return (
        <div>
            <NavBar profile={true}/>
            <div style={{display: 'flex', width: '84%', alignItems: 'center', marginInline: '8%',justifyContent:'center',marginTop:200}}>
                <ProfilePage/>
            </div>
        </div>
    )
}
