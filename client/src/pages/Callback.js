import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios"

function Callback() {
    const [redirectToProfile, setRedirectToProfile] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [userDetails, setUserDetails] = useState({})
    const tempCode = searchParams.get("code")
    const navigate = useNavigate();
    useEffect(() => {
        axios.post('/api/spotify/getProfileData', {
            code: tempCode
        })
            .then(function (response) {
                setUserDetails({
                    'userDetails': response.data
                })
                setRedirectToProfile(true)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])
    
    return (
        <div className="flex items-center justify-center">
            {redirectToProfile ? navigate("/profile", {state:userDetails}) : null}
        </div>
    );
}

export default Callback;