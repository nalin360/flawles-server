
import  express  from "express";
import { deleteUser, getAllUser, updateUser } from '../controllers/userController';
import { isAuthenticated, isOwner } from '../middleware/index';


export default (router:express.Router) => {
    router.get('/user', isAuthenticated, getAllUser);
    router.delete('/user/:id', isAuthenticated,isOwner, deleteUser);   
    router.patch('/user/:id', isAuthenticated,isOwner, updateUser);   
    

}