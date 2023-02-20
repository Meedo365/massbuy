const Order = require('../../models/order');

let routes = (app) => {

    app.post('/order', async (req, res) => {
        try {
            let order = new Order(req.body);
            await order.save()
            res.json(order)
        }
        catch (err) {
            res.status(500).send(err)
        }
    });

    app.get('/order', async (req, res) => {
        try {
            let order = await Order.find()
                .populate("cartId")
                .populate("deliveryId")
            res.json(order)
        }
        catch (err) {
            res.status(500).send(err)
        }
    });

    // order of a particular user
    app.get('/order/:id', async (req, res) => {
        try {
            let order = await Order.find({ user_id: req.params.id })
                .populate("cartId")
                .populate("deliveryId")
            res.json(order)
        }
        catch (err) {
            res.status(500).send(err)
        }
    });

    app.delete('/order/:id', async (req, res) => {
        try {
            await Order.deleteOne({ _id: req.params.id })
            res.json({ msg: "Order Deleted" })
        }
        catch (err) {
            res.status(500).send(err)
        }
    });

};

module.exports = routes;