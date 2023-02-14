import User from "../../../models/User";
import bcrypt from "bcryptjs"
import dbConnect from "../../../util/dbConnect";

const handler = async (req, res) => {
    await dbConnect()

    const body = req.body;
    const user = await User.findOne({email: body.email})

    if (user) {
        res.status(400).json({message: "Bu kullanıcı halihazırda var!"});
        return;
    }

    try {
        const newUser = await new User(body);
        const salt = await bcrypt.genSalt(10)

        newUser.password = await bcrypt.hash(newUser.password, salt)
        newUser.confirmPassword = await bcrypt.hash(newUser.confirmPassword, salt)
        await newUser.save();
        res.status(200).json(newUser);

    } catch (err) {
        console.log(err);
    }
}

export default handler