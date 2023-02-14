import Settings from "../../../models/Settings"
import dbConnect from "../../../util/dbConnect"

const handler = async(req, res) => {
    await dbConnect()
    const {method, query :{id}} = req

    if (method === "GET") {
        try {
            const setting = await Settings.findById(id)
            res.status(200).json(setting)
        } catch (err) {
            console.log(err)
        }
    }

    if (method === "PUT") {
        try {
            const setting = await Settings.findByIdAndUpdate(id, req.body, {new: true})
            res.status(200).json(setting)
        } catch (err) {
            console.log(err);
        }
    }
}

export default handler