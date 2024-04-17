//authController.js
import express from "express";
import { getUserByEmail, createUser } from '../helpers/userHelper';
import { random, authentication } from '../helpers/authHelpers';
// import { User } from "shared/interfaces/types";

export const login = async (req: express.Request, res: express.Response) => {
    try {

        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json("Enter Email or password! ")
        }

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

        if (!user) {
            return res.status(404).json("user does not exist.")
        }
        const userSalt = user?.authentication?.salt ?? '';
        const expectedHash = authentication(userSalt, password);

        if(user?.authentication?.password !== expectedHash){
            return res.status(403).json("password is worng")
        }

        const salt =  random();
        user.authentication.sessionToken = authentication(salt,user._id.toString());
        await user.save();

        res.cookie('NEO-AUTH', user.authentication.sessionToken, {domain :'localhost', path:"/"})

        return res.status(200).json(user).end();
    } catch (error) {
        return res.status(400).json(`${error}`)
    }
};

// * register controller 

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, username, password } = req.body;

        if (!email || !password || !username) {
            return res.status(400).json("Missing email, username, or password");
        }

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(404).json("Email already exists");
        }

        const salt = random();
        const newUser = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password),
            }
        });
        console.log(email , username , password);
        
        return res.status(200).json(newUser);

    } catch (error) {
        console.log(error);
        return res.status(500).json(`${error}`);
    }
}
