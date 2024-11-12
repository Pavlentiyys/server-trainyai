import { UsersModel } from "../models/Users.js";
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";

export const register = async (req, res) => {
    const { firstname, lastname, age, email, password } = req.body;
    const avatarUrl = req.file ? req.file.filename : null;
    
    if (!firstname || !lastname || !age || !email || !password) {
        return res.status(400).json({ error: "Something data is empty" })
    }
    try {
        const user = await UsersModel.findOne({ email });
        
        if (user) {
            return res.json({message: "User is already exist!"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        
        const newUser = new UsersModel({firstname, lastname, age, avatar: avatarUrl, email, password: hashedPassword})
        await newUser.save();
        
        return res.status(201).json({ message: "User registered successfuly"});
    } catch (err) {
        res.status(500).json({ err: "Internal Server Error" });
    };
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "email or password is empty"})
    }
    try {
        const user = await UsersModel.findOne(email);

        if (!user) {
            return res.status(404).json({ error: "User doesn't exist"})
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: "Wrong email or password"});
        }

        const { sign } = pkg;
        const accessToken = sign(
            { 
                email: user.email, 
                id: user._id.toString() 
            },
            process.env.SECRET_KEY || "importantsecret"
        );

        res.status(201).json({ token: accessToken, email: email, id: user._id.toString() })
    } catch (err) {
        res.status(500).json({ err: "Internal Server Error" });
    }
};

export const profile = async (req, res) => {
    try {
        const auth = req.user;
        const user = await UsersModel.findOne({ email: auth.email });

        if (!user) {
            return res.status(404).json({ error: "Course not found"});
        }
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ err: "Internal Server Error" });
    }
};