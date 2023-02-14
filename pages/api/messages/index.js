import Message from "../../../models/Message";
import dbConnect from "../../../util/dbConnect";

const handler = async (req, res) => {
    await dbConnect()

    const {method} = req

    if (method === "GET") {
        try {
            const messages = await Message.find()
            res.status(200).json(messages)
        } catch (err) {
            console.log(err);
        }
    }

    if (method === "POST") {
        try {
            const newMessages = await Message.create(req.body)
            res.status(200).json(newMessages)
        } catch (err) {
            console.log(err)
        }
    }
};

export default handler