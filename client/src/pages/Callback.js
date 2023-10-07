import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios"

function Callback() {
    const [searchParams, setSearchParams] = useSearchParams();
    const tempCode = searchParams.get("code")
    useEffect(() => {
        axios.post('/api/spotify/login', {
            code: tempCode
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])
    

   
    return (
        <div className="flex items-center justify-center">
        </div>
    );
}

export default Callback;