import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios"

function Profile() {
    const location = useLocation();
    const [profileData, setProfileData] = useState(false);
    useEffect(() => {
        axios.post('/api/spotify/getProfileData', {
            bearerToken: location.state.bearerToken,
            refreshToken: location.state.refreshToken
        })
            .then(function (response) {
                setProfileData(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });


    }, [])

    const handleKeyPress = e => {
        if (e.key === "Enter") {
            axios.post('/api/spotify/getTopArtists', {
                bearerToken: location.state.bearerToken,
                refreshToken: location.state.refreshToken
            })
                .then(function (response) {
                    console.log(response.data)
                    let favoriteArtistArray = response.data.items
                    let aiResponse = axios.post('/api/replicate/query', {
                        favoriteArtists: favoriteArtistArray,
                        prompt: 'promptFiller'
                    })
                    console.log(aiResponse)

                })
                .catch(function (error) {
                    console.log(error);
                });
        }
      };

    return (
        <div>
            <div className="flex flex-row justify-center">
                <img className="basis-1" src={profileData ? profileData.images[0].url : null} alt="description"></img>
            </div>
            <div className="flex flex-row justify-center">
                <h2>Name: {profileData.display_name}</h2>
            </div>
            <div className="flex flex-row justify-center">
            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your request here" onKeyPress={handleKeyPress}></input>
            </div>
        </div>
    );
}

export default Profile;