import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import Navbar from "../components/Navbar";
import axios from "axios"

function Profile() {
    const location = useLocation();
    const [profileData, setProfileData] = useState(false);
    const [input, setInput] = useState("");
    const [playlistInputText, setPlaylistInputText] = useState("");
    const [arrayOfSongs, setArrayOfSongs] = useState([])
    const [queryBoxVisible, setQueryBoxVisible] = useState("flex flex-row justify-center")
    const [loadingVisible, setLoadingVisible] = useState("invisible")
    const [submitPlaylistVisible, setSubmitPlaylistVisible] = useState("invisible")
    const [playlistUrl, setPlaylistUrl] = useState("")
    useEffect(() => {
        if (!location.state || !location.state.userDetails) {
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

    // const getUserTopArtists = async (refreshToken) => {
    //     const response = await axios.post('/api/spotify/getTopArtists', {
    //         refreshToken: refreshToken
    //     });
    //     return response.data.items
    // };

    const getUserTopGenres = async (refreshToken) => {
        const response = await axios.post('/api/spotify/getTopGenres', {
            refreshToken: refreshToken
        });
        return response.data
    };

    const getAiResponse = async (favoriteGenreArray) => {
        const response = await axios.post("/api/replicate/query", {
            favoriteGenres: favoriteGenreArray,
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
            setQueryBoxVisible("invisible")
            setLoadingVisible("flex flex-row justify-center")
            // let userTopArtists = await getUserTopArtists(location.state.userDetails.refreshToken)
            let userTopGenres = await getUserTopGenres(location.state.userDetails.refreshToken)
            let aiResponse = await getAiResponse(userTopGenres)
            aiResponse = aiResponse.join("")

            let startIndex = aiResponse.indexOf('[');
            let endIndex = aiResponse.lastIndexOf(']') + 1;

            let arrayStr = aiResponse.slice(startIndex, endIndex);

            let aiResponseArray = JSON.parse(arrayStr);
            let songArray = []
            for (let i = 0; i < aiResponseArray.length; i++) {
                let song = await getSong(aiResponseArray[i].title, aiResponseArray[i].artist, location.state.userDetails.refreshToken)
                if (song.tracks.items[0]) {
                    let songObj = {
                        "title": aiResponseArray[i].title,
                        "artist": aiResponseArray[i].artist,
                        "id": song.tracks.items[0].id,
                        "link": song.tracks.items[0].external_urls.spotify,
                        "uri": song.tracks.items[0].uri
                    }
                    songArray.push(songObj)
                }
            }
            setLoadingVisible("invisible")
            setSubmitPlaylistVisible("")
            setArrayOfSongs(songArray)
        }
    };

    let mappedItems = arrayOfSongs.map((item) => {
        let srcUrl = `https://open.spotify.com/embed/track/${item.id}?utm_source=generator`
        return (
            <div key={item.id}>
                <iframe title={item.id} src={srcUrl} width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            </div>
        );
    });

    const savePlaylist = async (e) => {
        e.preventDefault();
        const response = await axios.post("/api/spotify/savePlaylist", {
            refreshToken: location.state.userDetails.refreshToken,
            songs: arrayOfSongs,
            userId: profileData.id,
            playlistName: playlistInputText
        });
        setPlaylistUrl(response.data.external_urls.spotify)
        return response.data

    };

    return (
        <div>
            <Navbar props={profileData ? profileData.images[profileData.images.length - 1].url : null}></Navbar>
            <div className="container mx-auto">
                <div className="flex flex-wrap">
                    <div>
                        <section className="bg-white dark:bg-gray-900">
                            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
                                <div className="flex flex-col justify-center">
                                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Hey, {profileData.display_name} 👋</h1>
                                    <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Thanks for checking this out! A few things to note: </p>
                                    <ul class="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                                        <li>
                                            Alongside your prompt, we include details from your Spotify account to help the AI decide which songs are best for you. If you want some of your favorite genres included or not, be specific!
                                        </li>
                                        <li>
                                            Once the songs are generated you'll have the option to save the playlist directly to your Spotify account.
                                        </li>
                                        <li>
                                            It takes A LONG time for the AI to respond. Thank you for your patience!
                                        </li>
                                        <li>
                                            This is a work in progress. Thank you for testing it out!
                                        </li>
                                    </ul>
                                    <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div>
                        <section className="bg-white dark:bg-gray-900">
                            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
                                <div className="flex flex-col justify-center">
                                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-4xl dark:text-white">Fill out your prompt here:</h1>
                                   
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <div className={queryBoxVisible}>
                    <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your request here" onKeyUp={handleKeyPress} onInput={e => setInput(e.target.value)}></input>
                </div>
                <div className={loadingVisible}>
                    <div class="flex items-center justify-center w-56 h-56 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                        <div role="status">
                            <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
                <div className={submitPlaylistVisible}>
                    <form>
                        <div class="mb-6">
                            <label for="confirm_password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Create Playlist</label>
                            <input id="confirm_password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Playlist Name" required onInput={e => setPlaylistInputText(e.target.value)}>
                            </input>
                        </div>
                        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={(e) => savePlaylist(e)}>Submit</button>
                    </form>
                </div>
                <div>
                    {playlistUrl ? <h2>Playlist URL: {playlistUrl}</h2> : null}
                </div>
                <div>
                    {mappedItems}
                </div>
            </div>
        </div>
    );
}

export default Profile;