const Order = require("../models/Order");

exports.getOrders = async (req, res) => {
    try {
        const { date,enviroment,avaible} = req.query;
        console.log(date)
        const formatDate = date.split("-").join(",")

        const order = await Order.find({
         
            dateRegistry: {
                $gte: new Date(new Date(formatDate).setHours(00, 00, 00)),
                $lt: new Date(new Date(formatDate).setHours(23, 59, 59))

            } ,
            enviroment:(enviroment.toUpperCase())
        })
       // .where("avaible").equals(true)
        .sort({ dateRegistry: 'desc' })
       // .select("ocnumber enviroment")
       .select("ocnumber enviroment")
        res.json({ order });
    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error")
    }
}

exports.createOrder = async (req, res) => {
    const { ocnumber, enviroment } = req.body;
    const existOrder = await Order.findOne({ ocnumber });
    req.body.enviroment = enviroment.toUpperCase();

    if(ocnumber.trim().length<18){
        return res.status(500).send('Incorrect Format, min 18 characters');
    }
    if (existOrder) {
        return res.status(500).send('The order already exist in BD ');
    }

    if (!enviroment.toUpperCase().match(/^(PRD|STAGING|PREPROD)$/)) {
        return res.status(500).send('invalid enviroment, must be prd,staging or preprod');
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


exports.changeStateOrder = async (req, res) => {
    try {
        const { ocnumber } = req.query
        let order = await Order.findOne({ ocnumber }).where("avaible").equals(true)

        if (!order) {
            return res.status(500).send('Sorry, order not found');
        }
        req.body.avaible = false
        order = await Order.findOneAndUpdate({ ocnumber: ocnumber }, req.body, { new: true });
        res.json({ order })
    } catch (error) {
        console.log(error);
        res.status(500).send("error")
    }

}