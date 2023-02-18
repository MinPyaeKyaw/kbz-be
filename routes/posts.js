const router = require('express').Router();
const postModel = require("../models/post");

const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, file, callb) => {
      callb(null, "images")
    },
    filename: (req, file, callb) => {
      //callb(null, "file.png")
      console.log(file);
      callb(null, Date.now()+file.originalname);
    },
  })
const upload = multer({ storage: storage });

router.post('/', upload.single("photo"), async (req, res) => {

    req.body['photo'] = 'https://kbz-b4qwvikxp-minpyaekyaw.vercel.app/images/'+req.file.filename;
    
    const createPost = new postModel(req.body);

    try {
        const savePost = await createPost.save();

        res.status(200).json(savePost);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.delete('/:id', async (req, res) => {

    console.log(req.params.id)

    try {
        const deletedPost = await postModel.deleteOne({_id: req.params.id});
        console.log(deletedPost)
        
        res.status(200).json(deletedPost);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const updatedPost = await postModel.findOneAndUpdate(req.params.id, req.body);
        await updatedPost.save();
        
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.get('/latests', async (req, res) => {
    try {
        const latestPosts = await postModel.find().sort({createdAt: -1}).limit(4);

        res.status(200).json(latestPosts);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.get('/related', async (req, res) => {
    try {
        const latestPosts = await postModel.find().sort({createdAt: 1}).limit(3);

        res.status(200).json(latestPosts);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.get('/', async (req, res) => {
    try {
        const postsCount = await postModel.count();

        if(+req.query.offset >= postsCount) {
            res.status(200).json([]);
        }

        const posts = await postModel.paginate({}, {limit: req.query.limit, offset: req.query.offset});

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const findPost = await postModel.findById(req.params.id).populate('tags').populate('category');

        res.status(200).json(findPost);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;