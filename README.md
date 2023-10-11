# Spotify / ReplicateAI

Testing out integrating Meta's large language model with Spotify. The purpose is to ask the language model to build playlists for you based on both your taste in music as well as your prompt. Very much a work in progress.

## Installation

* After cloning, run `npm i` in both the root folder and in the client folder.
* create a `.env` file in the root folder. You'll have to create an API token in Replicate as well as a client_id and client_secret in Spotify. Here is what your `.env` file should contain:

```
REPLICATE_API_TOKEN={your_replicate_token}
SPOTIFY_CLIENT_SECRET={your_spotify_client_secret}
SPOTIFY_CLIENT_ID={your_spotify_client_id}
```

* run `npm run dev` from the root folder to run the program.

## Technologies Used

This project was created using the following:

* Replicate API
* Spotify API
* React
* TailwindCSS
* Flowbite
* Express
* Axios


