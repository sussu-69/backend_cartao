import { Router } from "express";


import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { CreateCardController } from "./controllers/user/CreateCardController";
import { userValidate } from "./middlewares/UserValidate";
import { cardValidate } from "./middlewares/CardValidate";

const router = Router();




router.post('/user',userValidate, new CreateUserController().handle)




router.post('/card',cardValidate ,new CreateCardController().handle)

router.post('/session',new AuthUserController().handle)

router.get('/userinfo', isAuthenticated,new DetailUserController().handle)

// router.get('/teste',(req:Request, res:Response)=>{
//   return res.json ({nome:'rodrigo'})
//    //throw new Error('Erro ao fazer requisição');
// })

export{router};