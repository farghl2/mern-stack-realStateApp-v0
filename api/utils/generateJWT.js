import jwt from 'jsonwebtoken';


const generateToken = async(payload)=>{
    const token = jwt.sign(payload,process.env.SCT_TOKEN);
    return token;

}

export default generateToken;