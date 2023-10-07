import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios"

function Callback() {
    const [redirectToProfile, setRedirectToProfile] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [userAuth, setUserAuth] = useState({})
    const tempCode = searchParams.get("code")
    const navigate = useNavigate();
    useEffect(() => {
        axios.post('/api/spotify/login', {
            code: tempCode
        })
            .then(function (response) {
                setUserAuth({
                    'bearerToken': response.data.access_token,
                    'refreshToken': response.data.refresh_token
                })
                setRedirectToProfile(true)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])
    
    return (
        <div className="flex items-center justify-center">
            {redirectToProfile ? navigate("/profile", {state:userAuth}) : null}
        </div>
    );
}

export default Callback;