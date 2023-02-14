import Campaigns from "../../../models/Campaigns";
import dbConnect from "../../../util/dbConnect";

const handler = async (req, res) => {
    await dbConnect()
    const {method} = req

    if (method === "GET") {
        try {
            const campaigns = await Campaigns.find()
            res.status(200).json(campaigns)
        } catch (err) {
            console.log(err);
        }
    }

    if(method === "POST"){
        try {
            const newCampaigns = await Campaigns.create(req.body)
            res.status(200).json(newCampaigns);
        } 
        
        catch (err) {
            console.log(err)
        }
    }
};

export default handler