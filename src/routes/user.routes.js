import { Router } from 'express'
const router = Router()

import * as userCtrl from '../controllers/user.controller'
import { authjwt, verifysignup } from '../middlewares'

router.post('/', [
    authjwt.verifyToken, 
    authjwt.isAdmin,
    verifysignup.checkRoleExisted
], userCtrl.createUser)

router.get('/', [
    authjwt.verifyToken
], userCtrl.getUsers)

router.get('/:userId', [
    authjwt.verifyToken
], userCtrl.getUser)

export default router