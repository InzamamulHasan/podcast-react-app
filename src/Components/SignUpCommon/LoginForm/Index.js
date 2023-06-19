import React from "react";
import InputComponents from "../../Common/Input";
import Button from "../../Common/Button";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {auth,db} from "../../../firebase";
import { setUser } from "../../../slices/userslice";
import { toast } from "react-toastify";

function LogInForm(){

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("");
    const [loader,setLoader]=useState(false);
    const dispatch=useDispatch();
    let navigate=useNavigate();
    async function handleLogin(){
        console.log("handling the Login button")
        setLoader(true)
        if(email===""||password===""){
            setLoader(false)
            toast.error("Some datas are missing")
        }
        
        try{
            //Creating users Account
            const userCredential=await signInWithEmailAndPassword(
                auth,email,password
            );
            const user=userCredential.user;
            console.log(user);
            // geting user data
            let userDoc=await getDoc(doc(db,"users",user.uid))
            let userData=userDoc.data();
            console.log("userData",userData)
            // Save data in the redux
            dispatch(setUser({
                name:userData.name,
                email:user.email,
                uid:user.uid
                })
            )
            setLoader(false)
            toast.success("Loggin Successfull!")
            navigate("profile")
        }catch(e){
            console.log("errr",e);
            toast.error(e.message)
            setLoader(false)
        }
    }
    
    return(
        <>
        
           <InputComponents state={email} setState={setEmail} required={true} type="email" placeholder="Name"></InputComponents>
           <InputComponents state={password} setState={setPassword} required={true} type="password" placeholder="Password"></InputComponents>  
           <Button  text={loader?"Loading....":"Login"}  disabled={loader} onClick={handleLogin} classes="btn"></Button>
        </>
    )
}
export default LogInForm;