import Order from "../../../models/Order";
import dbConnect from "../../../utils/dbConnect";

export default async function handler (req,res) {
    const {method , query:{id}} = req;

    dbConnect();

    if(method === 'GET'){
        try {
            const order = await Order.findById(id)
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else if(method === 'PUT'){
        try {
            const order = await Order.create(req.body);
            res.status(201).json(order);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else if(method === 'DELETE'){
        try {
            const order = await Order.findByIdAndDelete(id);
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json(error);
        }
    }
} 