import Campaigns from "../../../models/Campaigns";
import dbConnect from "../../../util/dbConnect";

const handler = async (req, res) => {
    await dbConnect()
    const {method, query: {id}} = req

    if (method === "DELETE") {
        try {
            const campaigns = await Campaigns.findByIdAndDelete(id)
            res.status(200).json(campaigns)
        } catch (err) {
            console.log(err);
        }
    }
}

export default handler