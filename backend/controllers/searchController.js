const { search } = require("../utils/spotifyapi");

module.exports.search = async (req, res) => {
    console.log("search request");
    let out = await search(req.query.q);
    return res.status(200).json(out);
}