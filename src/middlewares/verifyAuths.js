import { expressjwt } from "express-jwt";
import getDb from "../db";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";

//Use in protected routes to validate the token
const requestModifier = async (req, res, next) => {
    const db = getDb();
    const users = db.collection("users");
    if (req.auth.id) {
        req.auth.id = new ObjectId(req.auth.id);
        req.user = await users.findOne({
            _id: req.auth.id,
        });
        console.log("req.user", req.user, req.auth.id);
    }

    next();
};

export default () => [
    expressjwt({secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    requestModifier
]