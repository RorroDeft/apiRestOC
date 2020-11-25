const Order = require("../models/Order");

exports.getOrders = async (req, res) => {
    try {
        const { date } = req.body;
        console.log(date)
        const formatDate = date.split("-").join(",")

        const orders = await Order.find({
            dateRegistry: {
                $gte: new Date(new Date(formatDate).setHours(00, 00, 00)),
                $lt: new Date(new Date(formatDate).setHours(23, 59, 59))
            }
        }).sort({ dateRegistry: 'asc' })
        res.json({ orders });
    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error")
    }
}

exports.createOrder = async (req, res) => {
    const { ocnumber, enviroment } = req.body;
    const existOrder = await Order.findOne({ ocnumber });
    req.body.enviroment = enviroment.toUpperCase();
    if (existOrder) {
        return res.status(500).send('The order already exist in BD ');
    }

    if (!enviroment.toUpperCase().match(/^(PRD|STAGING|PREPROD)$/)) {
       return res.status(500).send ('invalid enviroment, must be prd,staging or preprod');
    }
    try {
        const newOrder = new Order(req.body);
        newOrder.save();
        res.json({ newOrder })
    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error")
    }
}


exports.changeStateOrder= async (req, res) => {
    try {
        const { ocnumber } = req.body
        let order = await Order.findOne({ ocnumber }).where("avaible").equals(true)
    
        if (!order) {
            throw new Error('Sorry, order not found');
        }
        req.body.avaible = false
        order = await Order.findOneAndUpdate({ ocnumber : ocnumber }, req.body, { new: true});
        res.json({ order })
    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error")
    }

}