const router = require('express').Router();
const tagModel = require("../models/tag");

router.post('/', async (req, res) => {
    const createTag = new tagModel(req.body);

    try {
        const saveTag = await createTag.save();

        res.status(200).json(saveTag);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.get('/', async (req, res) => {

    try {
        const tags = await tagModel.find();

        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;