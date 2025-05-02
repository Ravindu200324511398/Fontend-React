import axios from "axios";
const baseAuthUrl = "http://localhost:8086/booklib/api/v1/auth";

const SignUpTask = async(signUp :any) =>{
    console.log(signUp)
    try{
        const signUpResponse = await axios.post(
            `${baseAuthUrl}/signup`,    
             signUp
        );
        return signUpResponse.data.token
    }catch(err){
        console.error(err)
        throw err
    }
   
}
const SignInTask = async(signIn :any) =>{
    console.log(signIn)
    try{
        const signInResponse = await axios.post(
            `${baseAuthUrl}/signin`,    
              signIn
        );
        console.log(signInResponse.data.token)
        return signInResponse.data.token
    }catch(err){
        console.error(err)
        throw err
    }
   
}

export { SignInTask, SignUpTask}