const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.post("/",
    orderController.createOrder
);

router.get("/",
    orderController.getOrders
);

router.put("/",
    orderController.changeStateOrder
);

module.exports = router;

