import jwt from 'jsonwebtoken'

const genrateTokenAndSetCookie =(userId, res)=>{
const token = jwt.sign({userId}, process.env.JWT_SECRET,{
    expiresIn: "15d"
})
    res.cookie("jwt",token,{
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly:true, // prevant XSS attacks cross-site scripting attacks
        sameSite:"strict", // CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "devlopment"
    })

}
export default genrateTokenAndSetCookie