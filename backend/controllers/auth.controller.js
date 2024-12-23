import bcrypt from "bcrypt"
import User from "../models/user.model.js";
import genrateTokenAndSetCookie from '../utils/genrateToken.js'

export const signup = async (req ,res) => {
    try{
        const  {fullName, username, password, confirmPassword ,gender} = req.body;
        if (password !== confirmPassword ){
            return res.status(400).json({error:"Password and confime password do not mach!"})
        }
        const user = await User.findOne({username})
        if(user){
            return res.status(400).json({error:"Username already exists "})
        }

        const salt = await bcrypt.genSalt(10) 
        const hashedPassword = await bcrypt.hash(password, salt)

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender, 
            profilePic: gender === "male"? boyProfilePic: girlProfilePic,
        });

        if (newUser){
            genrateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
        
        
        res.status(201).json({
            _id: newUser._id,
            fullName:newUser.fullName,
            username:newUser.username,
            gender:newUser.gender,
            profilePic:newUser.profilePic,

        });
        console.log(user )
    }else{
        res.status(400).json({error: "Invalid user data"})
    }
    } catch (error){
        console.log("Error in signup controller", error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
};

export const login = async (req ,res) => {
    try{
        const{username,password} = req.body;
        const user = await User.findOne({username})
        const isPasswordCorrect = await bcrypt.compare(password,user?.password || "")

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid usename or password "})
        }

        genrateTokenAndSetCookie(user._id, res);
    

    res.status(200).json({
        _id: user._id,
        fullName:user.fullName,
        username:user.username,
        gender:user.gender,
        profilePic:user.profilePic,
    });

    }catch(error){
        console.log("Error in login controller", error.message)
        res.status(500).json({error:"Internal Server Error"})
    }

};

export const logout = (req ,res) => {
try {
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message:"Logged out successfully"})
} catch (error) {
    console.log("Error in logout controller", error.message)
    res.status(500).json({error:"Internal Server Error"})
}};

export const updateUserProfilePic = async (req, res) => {
    try {
        const { profilePic } = req.body;

        if (!profilePic) {
            return res.status(400).json({ success: false, error: "Profile picture is required" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { profilePic },
            { new: true, select: "profilePic" }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        res.status(200).json({ success: true, profilePic: updatedUser.profilePic });
    } catch (error) {
        console.error("Error updating profile picture:", error.message);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};
