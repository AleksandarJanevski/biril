const user = require('../models/BeRealModel');

exports.getAll = async (req, res) => {
    try {
        const client = await user.find();
        res.status(200).json({ status: 'success', data: { info: client } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err, });
    }
};

exports.getOne = async (req, res) => {
    try {
        const client = await user.findById(req.params.id);
        res.status(200).json({ status: 'success', data: { info: client } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err, });
    }
};

exports.createUser = async (req, res) => {
    try {
        const client = await user.create(req.body)
        res.status(201).json({ status: 'sucess', data: { info: client } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err, });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const updatedClient = await user.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(201).json({ status: 'sucess', data: { info: updatedClient } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err, });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await user.findByIdAndDelete(req.params.id)
        res.status(204).json({ status: 'sucess', data: null });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err, });
    }
}