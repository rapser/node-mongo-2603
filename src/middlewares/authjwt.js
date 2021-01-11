
import jwt from 'jsonwebtoken'
import config from '../config'
import User from '../models/User'
import Role from '../models/Role'

export const verifyToken = async (req, res, next) => {

    try {
        const bearerHeader = req.headers["authorization"]
    
        if (!bearerHeader) return res.status(403).json({message: "no token provider"})

        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken

//        console.log(bearerToken)
    
        const decoded = jwt.verify(req.token, config.SECRET)
        req.userId = decoded.id
    
        const user = await User.findById(req.userId, {password: 0})
    
        if (!user) return res.status(404).json({message: "user not found"})
    
        console.log(decoded)
        next()
    } catch (error) {
        return res.status(500).json({message: "not autorized"})
    }
}

export const isModerator = async (req, res, next) => {

    const user = await User.findById(req.userId)
    const roles = await Role.find({_id: {$in: user.roles}})

    for (let i = 0; i < roles.length ; i++) {

        if( roles[i].name === "moderator"){
            next()
            return
        }
    }

    return res.status(403).json({message: "requiere moderator role"})
}

export const isAdmin = async (req, res, next) => {

    const user = await User.findById(req.userId)
    const roles = await Role.find({_id: {$in: user.roles}})

    for (let i = 0; i < roles.length ; i++) {

        if( roles[i].name === "admin"){
            next()
            return
        }
    }

    return res.status(403).json({message: "requiere admin role"})
}