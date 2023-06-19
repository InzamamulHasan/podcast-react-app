import React from "react";
import InputComponents from "../../Common/Input";
import Button from "../../Common/Button";
import { useState } from "react";
import {auth,db, storage} from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../../../slices/userslice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FileInput from "../../Common/Input/FileInput";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";


function SignUpForm(){
    const [fullName,setFullName]=useState("");
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const [loader,setLoader]=useState(false);
    const [profile,setProfile]=useState("");

    let navigate=useNavigate();
    const dispatch=useDispatch();

    let handleSignUp=async()=>{
        console.log("handling the button")
        setLoader(true)
        if(fullName===""||email===""||password===""||confirmPassword===""||profile==""){
            setLoader(false)
            toast.error("First fillup the datas..");
            return;
        }
       
         if(password===confirmPassword && password.length>=6){
            try{
                //Creating users Account
                const userCredential=await createUserWithEmailAndPassword(
                    auth,email,password
                );
               

                const user=userCredential.user;
                console.log(user);

                const profileImageRef=ref(
                    storage,
                    `users/${user.uid}/${Date.now()}`
                )
                await uploadBytes(profileImageRef,profile);
                const profileImageUrl=await getDownloadURL(profileImageRef);
                console.log(profileImageUrl)
                // Saving user data
                await setDoc(doc(db,"users",user.uid),{
                    name:fullName,
                    email:user.email,
                    uid:user.uid,
                    profile:profileImageUrl,
                })

                // Save data in the redux
                dispatch(setUser({
                    name:fullName,
                    email:user.email,
                    uid:user.uid,
                    profile:profileImageUrl
                    })
                )
                toast.success("User has been created");
                setLoader(false)
                navigate("profile")
            }catch(e){
                console.log("errr",e);
                setLoader(false)
                toast.error(e.message);
            }
         }else{
            console.log("Errrrr")
            if(password!==confirmPassword){
                toast.error("Please make sure your password and confirm password matches")
            }else if(password.length<6){
                toast.error("Make sure your password contains 6 or more characters")
            }
            setLoader(false)
         }
        
    }
    function profileImageHandle(file){
        setProfile(file)
    }
    
    return(
        <>
         <InputComponents state={fullName} setState={setFullName} required={true} type="text" placeholder="Full Name"></InputComponents>
           <InputComponents state={email} setState={setEmail} required={true} type="email" placeholder="Email"></InputComponents>
           <InputComponents state={password} setState={setPassword} required={true} type="password" placeholder="Password"></InputComponents>
           <InputComponents state={confirmPassword} setState={setConfirmPassword} required={true} type="password" placeholder="Confirm Password"></InputComponents>

           <FileInput accept={"image/*"} id="display-image-input" fileHandleFnc={profileImageHandle} text={"Upload Profile Image"}/>
           <Button text={loader?"Loading...":"SignUp"} disabled={loader} onClick={handleSignUp} classes="btn"></Button>
        </>
    )
}
export default SignUpForm;