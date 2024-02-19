import express from 'express';
import { get , identity, merge} from 'lodash';
import { getUserBySessionToken } from '../helpers/userHelper';


export const isOwner = async (req:express.Request, res:express.Response , next:express.NextFunction) => {
    try {
        
        const {id} = req.params;
        const cuurentUserid = get(req, 'identity._id') as string | undefined;

        if(!cuurentUserid){
            return res.sendStatus(403);
        }

        if(cuurentUserid.toString() !== id){
            return res.sendStatus(403);
        }

        return next();
    } catch (error) {
        console.log(error);
        return res.status(400);
    }
}
    

export const isAuthenticated = async (req:express.Request, res:express.Response , next:express.NextFunction) => {
    
    try {
        const sessionToken = req.cookies['NEO-AUTH']
        if(!sessionToken){
            return res.status(403);
        }

        const existingUser = await getUserBySessionToken(sessionToken);

        if(!existingUser){
            return res.status(403)
        }

        merge(req , {identity :  existingUser})

        return next();
    } catch (error) {
        console.log(error);
        return res.status(400);
    }
}

