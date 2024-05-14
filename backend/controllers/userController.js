const User = require("../models/User");
const bcrypt = require("bcrypt");

const register =  async (req, res) => {
    const { username, email, password } = req.body;

    // const salt = await bcrypt.genSalt(10);
    // const hashPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
        username,
        email,
        password
    });

    await newUser.save();

    res.status(201).json(newUser);

}

const login = async (req, res) => {
    const { username, password } = req.body;
    if(!username || !password) return res.sendStatus(400);

    const user = await User.findOne({username}).lean();
    
    if(!user) return res.sendStatus(400);

    const comparePassword = await  bcrypt.compare(password, user?.password);
    
    const auth = user && comparePassword === true
    
    if(!auth) return res.sendStatus(401);

    res.status(200).json({
        user
    })
    
}

module.exports = { register, login }