import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import InputComponents from '../Common/Input';
import { toast } from 'react-toastify';
import Button from '../Common/Button';
import FileInput from '../Common/Input/FileInput';
import { auth, db, storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { upload } from '@testing-library/user-event/dist/upload';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

const CreatePodcastForm=()=> {
    const [title,setTitle]=useState("");
    const [desc,setDesc]=useState("");
    const [displayImage,setDisplayImage]=useState();
    const [bannerImage,setBannerImage]=useState();

    const [loader,setLoader]=useState(false);

    const navigate=useNavigate();
    const dispatch=useDispatch();

    const handleSubmit=async()=>{
        toast.success("Handling Form");
        if(title && desc && displayImage && bannerImage){
            setLoader(true)
            // 1. Upload filese -> get downloadable links
            try{
                const bannerImageRef=ref(
                    storage,
                    `podcasts/${auth.currentUser.uid}/${Date.now()}`
                )
                //const uploaded=await uploadBytes(bannerImageRef,bannerImage);
                //console.log(uploaded);
                //toast.success("file Uploaded");
                await uploadBytes(bannerImageRef,bannerImage);
                const bannerImageUrl=await getDownloadURL(bannerImageRef);
                console.log(bannerImageUrl)

                //display image
                const displayImageRef=ref(
                    storage,
                    `podcasts/${auth.currentUser.uid}/${Date.now()}`
                )
                await uploadBytes(displayImageRef,displayImage);
                const displayImageUrl=await getDownloadURL(displayImageRef);
                console.log(displayImageUrl)

                const podcastData={
                    title:title,
                    description:desc,
                    bannerImage:bannerImageUrl,
                    displayImage:displayImageUrl,
                    createdBy:auth.currentUser.uid,
                }
                const docRef=await addDoc(collection(db,"podcasts"),podcastData);
                toast.success("Podcast created")
                setTitle("");
                setDesc("");
                setBannerImage(null);
                setDisplayImage(null);
                setLoader(false);
              

            }catch(e){
                toast.error(e.message);
                setLoader(false);
            }
            
           
            // 2. create a new doc in a new collection called podcasts
            // 3.save this new podcast episode states in our podcasts
        }else{
            toast.error("Please Enter All VAlues");
            setLoader(false);
        }
    }

    const displayImageHandle=(file)=>{
        setDisplayImage(file)
    }
    const bannerImageHandle=(file)=>{
        setBannerImage(file)
    }

  return (
    <>
          <InputComponents 
           state={title} 
           setState={setTitle} 
           required={true}
           type="text"
           placeholder="Title">
        </InputComponents>
        <InputComponents 
          state={desc} 
          setState={setDesc} 
          required={true} 
          type="text"
          placeholder="Description">
        </InputComponents>
        <FileInput accept={"image/*"} id="display-image-input" fileHandleFnc={displayImageHandle} text={"Display Image Upload"}/>
        <FileInput accept={"image/*"} id="banner-image-input" fileHandleFnc={bannerImageHandle} text={"Banner Image Upload"}/>

        {/*<InputComponents 
          state={displayImage} 
          setState={setDisplayImage} 
          required={true} 
          type="file"
          placeholder="Display Image">
  </InputComponents>*/}
          
           <Button text={loader?"Loading...":"Create Podcast"} disabled={loader} onClick={handleSubmit} classes="btn"></Button>
    </>
  )
}

export default CreatePodcastForm;