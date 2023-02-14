import Chat from "../../../models/Chat";
import dbConnect from "../../../util/dbConnect";

const handler = async (req, res) => {
    await dbConnect()

    const {method} = req

    if (method === "GET") {
        try {
            const chats = await Chat.find()
            res.status(200).json(chats)
        } catch (err) {
            console.log(err);
        }
    }

    if (method === "POST") {
        try {
            const newChat = await Chat.create(req.body)
            res.status(200).json(newChat)
        } catch (err) {
            console.log(err)
        }
    }
};

export default handler