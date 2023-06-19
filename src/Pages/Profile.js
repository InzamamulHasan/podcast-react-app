import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../Components/Common/Header";
import Button from "../Components/Common/Button";
import {auth} from "../firebase"
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import Loader from "../Components/Common/Loader";

let Profile=()=>{
    let user=useSelector((state)=>{console.log("state",state) ;return state.user.user})
    console.log("My user",user,user.profile);
    
    if(!user){
        return <Loader/>;
    }
    
     const handleLogout=()=>{
        signOut(auth).then(() => {
            // Sign-out successful.
            toast.success("User Logged Out!")
          }).catch((error) => {
            // An error happened.
            toast.error("Error",error.meassage);
          });
     }
    console.log(user)
     return<>
     <Header/>
     <div className="profile_div">
      {user.profile?<img src={user.profile} className="profile-image"/>:""}
        <h1>{user.name}</h1>
        <p>{user.email}</p>
        <p>User-Uid :- {user.uid}</p>
        <Button classes="logout" text={"Logout"} onClick={handleLogout}/>
     </div>
     
     </>
}
export default Profile;