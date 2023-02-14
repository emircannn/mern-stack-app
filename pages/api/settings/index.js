import Settings from "../../../models/Settings";
import dbConnect from "../../../util/dbConnect";

const handler = async (req, res) => {
    await dbConnect()
    const {method} = req;

    if (method === "GET") {
        try {
            const settings = await Settings.find()
            res.status(200).json(settings)
        } catch (err) {
            console.log(err);
        }
    }

    if (method === "POST") {
        try {
            const settings = await Settings.create(req.body)
            res.status(200).json(settings)
        } catch (err) {
            console.log(err);
        }
    }
}

export default handler