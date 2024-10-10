import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userID) => {
    const token = jwt.sign({ userId: userID }, process.env.JWT_SECRET, { // Fixed to use userID
        expiresIn: "7d",
    });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return token;
};
