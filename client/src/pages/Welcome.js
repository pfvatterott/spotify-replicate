import React from "react";
const querystring = require('querystring');

function Welcome() {
    const scope = 'user-read-private user-read-email user-top-read playlist-modify-public playlist-modify-private';
    const authUrl = 'https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: "e2af5809a40747b8948398075b01e685",
      scope: scope,
      redirect_uri: "http://localhost:3000/callback"
    })

    return (
        <div className="flex items-center justify-center">
            <a href={authUrl} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 my-10">Log In</a>
        </div>
    );
}

export default Welcome;