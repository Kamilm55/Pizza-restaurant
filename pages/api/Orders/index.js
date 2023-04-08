import Order from "../../../models/Order";
import dbConnect from "../../../utils/dbConnect";

export default  async function handler  (req,res) {
    const {method} = req;

    await dbConnect();

    if(method === "GET"){
        try {
            const orders = await Order.find();
            res.status(201).json(orders);
        } catch (e) {
            res.status(500).json(e);
        }
    }
    if(method === "POST"){
        try {
            const order = await Order.create(req.body);
            res.status(201).json(order);
        } catch (e) {
            res.status(500).json(e);
        }
    }
} 