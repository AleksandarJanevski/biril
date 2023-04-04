const bereal = require('../models/BeRealModel');

exports.getView = async (req, res) => {
    const query = req.query.sort
    let feed = await bereal.user.find();
    if (query) {
        feed = feed.sort((a, b) => {
            if (query === "name") {
                return a.name.localeCompare(b.name);
            } else if (query === "-name") {
                return b.name.localeCompare(a.name);
            } else if (query === "time") {
                return new Date(b.time) - new Date(a.time);
            } else if (query === "-time") {
                return new Date(a.time) - new Date(b.time);
            }
        });
    }
    res.status(200).render('feed', { feed: feed });
};
exports.getForm = async (req, res) => {
    res.render('form');
}
exports.createUser = async (req, res) => {
    await bereal.user.create(req.body);
    res.status(201).redirect('/feed');
}
exports.getOneView = async (req, res) => {
    const feed = await bereal.user.findById(req.params.id);
    const comments = await bereal.userComment.find({ postid: req.params.id })
    res.status(200).render('singlePost', { feed: feed, comments: comments });
};
exports.deleteUser = async (req, res) => {
    await bereal.user.findByIdAndDelete(req.params.id);
    res.status(204).redirect('/feed');
};
exports.updateUser = async (req, res) => {
    await bereal.user.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    })
    res.status(201).redirect('/feed/' + req.params.id);
}
exports.postComment = async (req, res) => {
    await bereal.userComment.create(req.body);
    console.log(req.body);
    res.status(201).redirect('/feed/' + req.body.postid);
};
exports.deleteComment = async (req, res) => {
    await bereal.userComment.findByIdAndDelete(req.params.comment);
    res.status(201).redirect('back');
}
