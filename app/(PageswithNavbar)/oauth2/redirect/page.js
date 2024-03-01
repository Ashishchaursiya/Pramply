"use client"

import { useEffect } from "react";
import LoadingScreen from "../../loading";
import Cookies from "js-cookie";

const RedirectForGoogleLogin = () => {
    const getUrlParameter =  (name) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    console.log('result',window.location.search)
        var results = regex.exec(window.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };
    useEffect( () => {
        const token = getUrlParameter('token');
        const error = getUrlParameter('error');

        if(token) {
            Cookies.set('token', token,{ expires: 30 });
            return  window.open('/','_parent') 
        } else {
            return  window.open('/login','_parent')  
        }
    },[])
    return <>
    <LoadingScreen />
    </>
   
}
export default RedirectForGoogleLogin;