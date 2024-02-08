const artistCollection = require('../models/artistModel');
const { getArtistTopTracks, getArtistRelations } = require('../utils/spotifyapi');


module.exports.getContent = async (req, res) => {
    const aid = req.query.artistId;
    let topTracks = await getArtistTopTracks(aid);
    let relatedArtists = await getArtistRelations(aid);
    return res.status(200).json({topTracks: topTracks, relatedArtists: relatedArtists});
}