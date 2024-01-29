require("dotenv").config();
const axios = require('axios');
const fs = require("fs");
const os = require("os");
const songCollection = require('../models/songModel');
const artistCollection = require("../models/artistModel");
const spotify_token = process.env.SPOTIFY_TOKEN;
const client = process.env.SPOTIFY_CLIENT;
const secret = process.env.SPOTIFY_SECRET;
const genTime = process.env.SPOTIFY_TOKEN_TIME;

function setEnvValue(key, value) {
    // read file from ssd & split if from a linebreak to a array
    const ENV_VARS = fs.readFileSync(".env", "utf8").split(os.EOL);

    // find the env we want based on the key
    const target = ENV_VARS.indexOf(ENV_VARS.find((line) => {
        // (?<!#\s*)   Negative lookbehind to avoid matching comments (lines that starts with #).
        //             There is a double slash in the RegExp constructor to escape it.
        // (?==)       Positive lookahead to check if there is an equal sign right after the key.
        //             This is to prevent matching keys prefixed with the key of the env var to update.
        const keyValRegex = new RegExp(`(?<!#\\s*)${key}(?==)`);

        return line.match(keyValRegex);
    }));

    // if key-value pair exists in the .env file,
    if (target !== -1) {
        // replace the key/value with the new value
        ENV_VARS.splice(target, 1, `${key}=${value}`);
    } else {
        // if it doesn't exist, add it instead
        ENV_VARS.push(`${key}=${value}`);
    }

    // write everything back to the file system
    fs.writeFileSync(".env", ENV_VARS.join(os.EOL));
}

module.exports.refreshToken = async () => {
    console.log("Token refreshing...");
    const timeOfGenerationSeconds = Math.floor(Date.now() / 1000);
    axios.post('https://accounts.spotify.com/api/token', {
        grant_type: "client_credentials",
        client_id: client,
        client_secret: secret
    },
        {
            headers: {
                'Content-Type': "application/x-www-form-urlencoded"
            }
        }
    ).then((res) => {
        console.log(res.data.access_token, "token1");
        const token = res.data.access_token;
        setEnvValue("SPOTIFY_TOKEN", token);
        setEnvValue("SPOTIFY_TOKEN_TIME", timeOfGenerationSeconds.toString());

    }).catch((err) => {
        console.log(err);

    })
}

module.exports.getTracks = async (ids) => {
    if(!Array.isArray(ids) || !ids.length) return [];
    let currTime = Math.floor(Date.now() / 1000);
    if ((currTime - genTime) >= 3600) {
        await this.refreshToken();
    }
    let nonexistent_ids = [];
    console.log("ids are ", ids);
    let out = [];
    for (const id of ids) {
        const check = await songCollection.findOne({ songId: id });
        if (!check) {
            nonexistent_ids.push(id);
        }
        else {
            const song = {
                name: check.name,
                songId: check.songId,
                duration_ms: check.duration_ms,
                images: check.images,
                artists:check.artists,
                album: check.album
            }
            // console.log(song);
            out.push(song);
        }
    }
    if(!Array.isArray(nonexistent_ids) || !nonexistent_ids.length){
        return out;
    }
    commaseparatedids = nonexistent_ids.join(',');
    // console.log(commaseparatedids);
    // console.log(spotify_token, "token2");
    res = await axios.get("https://api.spotify.com/v1/tracks", {
        params: { ids: commaseparatedids },
        headers: {
            Authorization: `Bearer ${spotify_token}`,
            'Content-Type': "application/json"
        }
    }
    )
    console.log(res);
    // console.log(res.data.tracks);
    const data = res.data.tracks;
    for (const track of data) {
        console.log(track);
        const _artists = [];
        // console.log("Artists",track.artists);
        for (const artist of track.artists) {
            _artists.push({
                name: artist.name,
                artistId: artist.id,
            })
            // console.log("artist", artist);
            // Genre not provided by api? why tho
            // to investigate
        }
        const info = {
            name: track.name,
            songId: track.id,
            duration_ms: track.duration_ms,
            images: track.album.images,
            artists: _artists,
            album: {
                type: track.album.album_type,
                albumId: track.album.id
            }
        }
        try {
            const res = await songCollection.create(info);
            console.log(res, "success");
            out.push(res);
        }
        catch (err) {
            console.log(err);
            return;
        }
        
    }
    return out;

}

module.exports.getArtists = async (ids) => {
    if(!Array.isArray(ids) || !ids.length) return [];
    let currTime = Math.floor(Date.now() / 1000);
    if ((currTime - genTime) >= 3600) {
        await this.refreshToken();
    }
    let nonexistent_ids = [];
    console.log("ids are ", ids);
    let out = [];
    for (const id of ids) {
        const check = await artistCollection.findOne({ artistId: id });
        if (!check) {
            nonexistent_ids.push(id);
        }
        else {
            const artist = {
                name: check.name,
                artistId: check.artistId,
                followerCount: check.followerCount,
                images: check.images,
                genres:check.genres,
            }
            console.log(artist);
            out.push(artist);
        }
    }
    if(!Array.isArray(nonexistent_ids) || !nonexistent_ids.length){
        return out;
    }
    commaseparatedids = nonexistent_ids.join(',');
    console.log(commaseparatedids);
    console.log(spotify_token, "token2");
    res = await axios.get("https://api.spotify.com/v1/artists", {
        params: { ids: commaseparatedids },
        headers: {
            Authorization: `Bearer ${spotify_token}`,
            'Content-Type': "application/json"
        }
    }
    )
    console.log(res);
    const data = res.data.artists;
    for (const artist of data) {
        // console.log(track);
        // console.log("Artists",track.artists);
        const info = {
            name: artist.name,
            artistId: artist.id,
            followerCount: artist.followers.total,
            genres: artist.genres,
            images: artist.images
        }
        try {
            const res = await artistCollection.create(info);
            console.log(res, "success");
            out.push(res);
        }
        catch (err) {
            console.log(err);
            return;
        }
        
    }
}