const { search } = require("../utils/spotifyapi");

module.exports.search = async (req, res) => {
    console.log("search request");
    try{
        return res.status(200).json(await search(req.query.q));
    }
    catch(error){
        console.log(err);
        return res.status(400).json({message: "An error has occured while searching"});
    }
}