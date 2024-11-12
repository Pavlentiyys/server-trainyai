import pkg from "jsonwebtoken";

const { verify } = pkg;

export const auth = (req, res, next) => {
    const SECRET_KEY = process.env.SECRET_KEY || "importantsecret"
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return res.status(401).json({ error: "User doesn't auth"});
    }

    const accessToken = authHeader.split(" ")[1];

    try {
        const validToken = verify(accessToken, SECRET_KEY);
        req.user = validToken;
        if (validToken) return next();
    } catch (err) {
        return res.json({ err: err.message })
    } 
};