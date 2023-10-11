import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
const querystring = require('querystring');


function Welcome() {
    const location = useLocation();
    const navigate = useNavigate();
    const [redirectToProfile, setRedirectToProfile] = useState(false);
    const [userDetails, setUserDetails] = useState({})
    const scope = 'user-read-private user-read-email user-top-read playlist-modify-public playlist-modify-private';
    const authUrl = 'https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: "e2af5809a40747b8948398075b01e685",
            scope: scope,
            redirect_uri: "http://localhost:3000/callback"
        })

    useEffect(() => {
        if (location.state && location.state.userDetails) {
            setUserDetails(location.state.userDetails)
            setRedirectToProfile(true)
        }
    }, [])

    return (
        <div>
            <Navbar></Navbar>
            <div classNameName="flex items-center justify-center">

                <section className="bg-white dark:bg-gray-900">
                    <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
                        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Spotify Meet AI</h1>
                        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">Testing out integrating Meta's large language model with Spotify. Ask AI to create any type of playlist you want. Using your favorite artists and music genres, effortlessly create new Spotify Playlists that are perfect for you. Very much a work in progress.</p>
                        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                            <a href={authUrl} className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                                Get started
                                <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </a>
                            <a href="https://github.com/pfvatterott/spotify-replicate" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                                Learn more
                            </a>
                        </div>
                    </div>
                </section>

            </div>
            <div classNameName="flex items-center justify-center">
            </div>
            {redirectToProfile ? navigate("/profile", { state: userDetails }) : null}
        </div>
    );
}

export default Welcome;