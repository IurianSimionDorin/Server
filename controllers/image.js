
const Carifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'b1596bee8f0244f9b5318549a055508b'
});

const handleAPICall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => { res.json(data) })
        .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => {
            res.status(400).json('unable to get image');
        })
}

module.exports = {
    handleImage: handleImage,
    handleAPICall: handleAPICall
}