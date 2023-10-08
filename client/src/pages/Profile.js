import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios"

function Profile() {
    const location = useLocation();
    const [profileData, setProfileData] = useState(false);
    const [input, setInput] = useState("");
    const [arrayOfSongs, setArrayOfSongs] = useState([])
    useEffect(() => {
        if (!location.state.userDetails) {
            const fetchData = async () => {
                let userDetails = await getUserDetails(location.state.userDetails.refreshToken)
                setProfileData(userDetails)
            }
            fetchData()
                .catch(console.error);
        }
        else {
            setProfileData(location.state.userDetails)
        }

    }, [])

    const getUserDetails = async (refreshToken) => {
        const response = await axios.post('/api/spotify/getProfileData', {
            refreshToken: refreshToken
        });
        return response.data
    };

    const getUserTopArtists = async (refreshToken) => {
        const response = await axios.post('/api/spotify/getTopArtists', {
            refreshToken: refreshToken
        });
        return response.data.items
    };

    const getAiResponse = async (favoriteArtistArray) => {
        const response = await axios.post("/api/replicate/query", {
            favoriteArtists: favoriteArtistArray,
            prompt: input
        });
        return response.data
    };

    const getSong = async (song, artist, refreshToken) => {
        const response = await axios.post("/api/spotify/getSong", {
            refreshToken: refreshToken,
            song: song,
            artist: artist
        });
        return response.data
    };

    const handleKeyPress = async e => {
        if (e.key === "Enter") {
            let userTopArtists = await getUserTopArtists(location.state.userDetails.refreshToken)
            let aiResponse = await getAiResponse(userTopArtists)
            let songArray = []
            for (let i = 0; i < aiResponse.length; i++) {
                let song = await getSong(aiResponse[i].title, aiResponse[i].artist, location.state.userDetails.refreshToken)
                if (song.tracks.items[0]) {
                    let songObj = {
                        "title": aiResponse[i].title,
                        "artist": aiResponse[i].artist,
                        "id": song.tracks.items[0].id,
                        "link": song.tracks.items[0].external_urls.spotify
                    }
                    songArray.push(songObj)
                }
            }
            console.log(songArray)
            setArrayOfSongs(songArray)
        }
    };

    const mappedItems = arrayOfSongs.map((item) => {
        return (
          <div key={item.id}>
            {item.title} BY {item.artist}
          </div>
        );
      });

    return (
        <div>
            <div className="flex flex-row justify-center">
                <img className="basis-1" src={profileData ? profileData.images[0].url : null} alt="description"></img>
            </div>
            <div className="flex flex-row justify-center">
                <h2>Name: {profileData.display_name}</h2>
            </div>
            <div className="flex flex-row justify-center">
                <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your request here" onKeyUp={handleKeyPress} onInput={e => setInput(e.target.value)}></input>
            </div>
            <div>
                {mappedItems}
            </div>
        </div>
    );
}

export default Profile;