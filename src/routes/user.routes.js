import { Router } from 'express'
const router = Router()

import * as userCtrl from '../controllers/user.controller'
import { authjwt, verifysignup } from '../middlewares'

router.post('/', [
    authjwt.verifyToken, 
    authjwt.isAdmin,
    verifysignup.checkRoleExisted
], userCtrl.createUser)

export default router