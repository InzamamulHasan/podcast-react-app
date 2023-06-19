
import { useState } from "react";
import SignInForm from "../Components/SignUpCommon/SignupForm";
import LogInForm from "../Components/SignUpCommon/LoginForm/Index";
import Header from "../Components/Common/Header";
let SignUp=()=>{
   
    const [flag,setFlag]=useState(false)
    

    return(
    <div>
        <Header/>
        <div className="input-wrapper">
            <h1>{!flag?"Signup":"Login"}</h1>

          {!flag?<SignInForm/>:<LogInForm/>}
           {!flag?<p style={{cursor:"pointer"}} className="ac" onClick={()=>setFlag(!flag)}>Aslready have an Account?  Click here to Login.</p>:<p style={{cursor:"pointer"}} className="ac" onClick={()=>setFlag(!flag)}>Don't have any account? Click here to Signup.</p>}
        </div>
        
        
    </div>
    )
}
export default SignUp;