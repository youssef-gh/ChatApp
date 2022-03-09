import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from 'firebase';
import  { useAuth } from '../contexts/AuthContext'
import axios from 'axios';

const Chats = () => {

    const history = useHistory();
    const {user} = useAuth();
    const [loading, setLoading] = useState(true);
    // console.log(user);


    const handlelogout = async () => {
        await auth.signOut();
        history.push('/');
    }

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File( [data], "userPohot.jpg", { type : 'image/jpeg'} )
    }

    useEffect( () => {
        if(!user) {
            history.push('/');
            return;
        }
        axios.get('http://api.chatengine.io/users/me', {
            headers: {
            "project-id" : "0510fb53-f545-4e4b-8c9b-79ae77a9a4d2",
            "user-name" : user.email,
            "user-secret" : user.uid,
            }
        })
        .then( () =>{
            setLoading(false)
        })
        .catch(()=>{
            let formdata = new FormData();
            formdata.append('email', user.email);
            formdata.append('username', user.email);
            formdata.append('secret', user.uid)
            getFile(user.photoURL)
                .then((avatar) => {
                    formdata.append('avatar' , avatar , avatar.name);
                    axios.post('http://api.chatengine.io/users',
                    formdata,
                    {headers : { "private-key": "9b07e87e-da90-4147-8298-1b17e6c6c49e"} }
                    )
                    .then( () => setLoading(false))
                    .catch( (error) => console.log(error))
                })
        })
    }, [user, history] ) 

    return ( 
        <div className='chats-page' >
            <div className='nav-bar'>
                <div className='logo-tab'>
                    Unichat
                </div>
                <div onClick = {handlelogout} className='logout-tab'>
                    Logout
                </div>
            </div>
            <ChatEngine 
            height = "calc(100vh - 66px)"
            projectID = "0510fb53-f545-4e4b-8c9b-79ae77a9a4d2" // before upload the file i should move it to ENV
            userName = {user.email}
            userSecret = {user.uid}
            />
            </div>
     );
}
 
export default Chats;