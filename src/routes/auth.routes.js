import { Router } from 'express'
const router = Router()

import * as authCtrl from '../controllers/auth.controller'
import { verifysignup } from '../middlewares'

router.post('/signin', authCtrl.signin)

router.post('/signup', [
    verifysignup.checkDuplicatedUsernameOrEmail,
    verifysignup.checkRoleExisted
], authCtrl.signup)

export default router