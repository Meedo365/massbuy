const Product = require('../../models/product');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const Datauri = require('datauri')
// const { uploader, cloudinaryConfig } = require("../../config/cloudinaryConfig");
// const { uploader } = require('cloudinary');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getMilliseconds() + file.originalname);
    }
});


// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: './uploads/',
//         format: async (req, file) => 'webp', // supports promises as well
//         public_id: (req, file) => { new Date().getMilliseconds() + file.originalname },
//     },
// });

// const storage = multer.memoryStorage();

const upload = multer({ storage: storage }).single('image');
const path = require("path");

const { auth, isLoggedIn } = require('../middlewares/loggedIn')


let routes = (app) => {
    app.post('/product', async (req, res) => {
        upload(req, res, async (err) => {
            if (err) {
                console.log(err)
                res.json({ msg: "File Missing " })
            } else {
                if (req.file) {
                    // const dUri = new Datauri();
                    // const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);
                    // const file = dataUri(req).content;
                    // console.log(file)
                    // console.log(req.file)
                    // // uploader.upload(file).then((result) => {
                    // //     console.log(result.url)
                    // //     res.body.image = '/' + result.url
                    // // })

                    // uploader.upload('/' + req.file.path).then((result) => {
                    //     console.log(result.url)
                    //     res.body.image = '/' + result.url
                    // })
                    req.body.image = '/' + req.file.path;
                    try {
                        const { itemName, price, image, details, spec, feature,
                            user_id, category_id } = req.body;
                        if (!user_id)
                            return res.status(500).json({ msg: "Please Login In" })
                        if (!itemName || !price)
                            return res.status(500).json({ msg: "Please fill in Product Name and Price at least!" })
                        if (!image)
                            return res.status(500).json({ msg: "Please Upload Product Image" })
                        const newProduct = {
                            itemName, price: Number(price).toLocaleString(), image, details, spec, feature,
                            user_id, category_id
                        };
                        let newProduct_ = new Product(newProduct);
                        await newProduct_.save()
                        return res.status(200).json({ msg: "Product Successfully Created" })
                        // return res.status(200).json(newProduct_)

                    }
                    catch (err) {
                        return res.status(500).send('err');
                    }
                }
            }
        });
    });

    // get product according to categories
    app.get('/products-by-category', async (req, res) => {
        try {
            let products = await Product.find({ status: "active", category_id: req.query.category }).sort({ createdAt: -1 })
                .populate("user_id", "firstname lastname role")
                .populate("category_id", "title")
            res.json(products)
        }
        catch (err) {
            res.status(400).send(err)
        }
    });

    // get all products
    app.get('/products', async (req, res) => {
        try {
            let products = await Product.find({ status: "active" }).sort({ createdAt: -1 })
                .populate("user_id", "firstname lastname role")
                .populate("category_id", "title")
            res.json(products)
        }
        catch (err) {
            res.status(400).send(err)
        }
    });

    // get latest 8 products
    app.get('/product-8', async (req, res) => {
        try {
            let products = await Product.find().sort({ createdAt: -1 }).limit(8)
                .populate("user_id", "firstname lastname role")
                .populate("category_id", "title")
            res.json(products)
        }
        catch (err) {
            res.status(500).send(err)
        }
    });

    app.get('/product/:id', async (req, res) => {
        try {
            let products = await Product.findOne({ _id: req.params.id })
                .populate("user_id", "firstname lastname")
            res.json(products)
        }
        catch (err) {
            res.status(500).send(err)
        }
    });

    app.delete('/product/:id', async (req, res) => {
        try {
            await Product.deleteOne()
            res.json({ msg: "Product Deleted" })
        }
        catch (err) {
            res.status(500).send(err)
        }
    });

};

module.exports = routes;