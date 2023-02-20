const Delivery = require('../../models/delivery');

let routes = (app) => {

    app.post('/delivery', async (req, res) => {
        try {
            let delivery = new Delivery(req.body);
            await delivery.save()
            res.json(delivery)
        }
        catch (err) {
            res.status(500).send(err)
        }
    });

    app.get('/delivery', async (req, res) => {
        try {
            let delivery = await Delivery.find()
                .populate("user_id")
            res.json(delivery)
        }
        catch (err) {
            res.status(500).send(err)
        }
    });

    // get address of a particular user
    app.get('/delivery/:id', async (req, res) => {
        try {
            let delivery = await Delivery.find({ user_id: req.params.id })
            res.json(delivery)
        }
        catch (err) {
            res.status(500).send(err)
        }
    });

    app.delete('/delivery/:id', async (req, res) => {
        try {
            await Delivery.deleteOne({ _id: req.params.id })
            res.json({ msg: "Delivery Deleted" })
        }
        catch (err) {
            res.status(500).send(err)
        }
    });

};

module.exports = routes;