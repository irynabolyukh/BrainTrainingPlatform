const Post = require('../models/Post');

module.exports.updateGet = (req, res) =>{
    res.render('update-post');
}

module.exports.updatePost = async (req, res) =>{
    const {header, description, imageLink, videoLink} = req.body;
    const post = await Post.findOne({});

    try {
        await Post.updateOne({ _id: post._id },{header, description, imageLink, videoLink});
        res.status(201).json({post: post._id});
    }
    catch (err){
        res.status(400).json({error: err});
    }
}