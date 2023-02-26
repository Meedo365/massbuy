const Category = require('../../models/category');
const { isAdmin } = require("../middlewares/loggedIn");

let routes = (app) => {

    app.post('/category', isAdmin, async (req, res) => {
        try {
            let category = new Category(req.body);
            await category.save()
            res.json(category)
        }
        catch (err) {
            res.status(500).send(err)
        }
    });

    app.get('/category', async (req, res) => {
        try {
            let category = await Category.find()
                .populate("createdBy", "firstname lastname role")
            res.json(category)
        }
        catch (err) {
            res.status(500).send(err)
        }
    });

    app.delete('/category/:id', isAdmin, async (req, res) => {
        try {
            await Category.deleteOne({ _id: req.params.id })
            res.json({ msg: "Category Deleted" })
        }
        catch (err) {
            res.status(500).send(err)
        }
    });

};

module.exports = routes;