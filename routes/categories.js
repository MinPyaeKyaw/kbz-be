const router = require('express').Router();
const categoryModel = require("../models/category");

router.post('/', async (req, res) => {

    const createCategory = new categoryModel(req.body);

    try {
        const saveCategory = await createCategory.save();

        res.status(200).json(saveCategory);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.get('/', async (req, res) => {
    try {
        const findCategories = await categoryModel.find();

        res.status(200).json(findCategories);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const findCategory = await categoryModel.findById(req.params.id);

        res.status(200).json(findCategory);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;