import React, { useState, useEffect } from "react";

function Welcome() {
    
    function spotifyLogin() {
        console.log('spotifyLogin')
    }

    return (
        <div class="flex items-center justify-center">
            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 my-10" onClick={spotifyLogin}>Login</button>
        </div>
    );
}

export default Welcome;