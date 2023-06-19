import React, { useState } from 'react'
import Header from '../Components/Common/Header'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import InputComponents from '../Components/Common/Input';
import FileInput from '../Components/Common/Input/FileInput';
import Button from '../Components/Common/Button';
import { toast } from 'react-toastify';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';

function CreateAnEpisodePage() {
    const {id}=useParams();
    const [title,setTitle]=useState("");
    const [desc,setDesc]=useState("")
    const [audioFile,setAudioFile]=useState("");

    const [loader,setLoader]=useState(false);

    let navigate=useNavigate();
    const dispatch=useDispatch();

    const audioFileHandle=(file)=>{
        setAudioFile(file)
    }
    const handleSubmit=async()=>{
        setLoader(true)
        if(title,desc,audioFile,id){
            try{
                const audioRef=ref(
                    storage,
                    `podcast-episode/${auth.currentUser.uid}/${Date.now()}`
                );
                await uploadBytes(audioRef,audioFile);
                
                const audioURL=await getDownloadURL(audioRef);
                const episodeData={
                    title:title,
                    description:desc,
                    audioFile:audioURL,
                }

                await addDoc(
                    collection(db,"podcasts",id,"episodes"),
                    episodeData
                );

                toast.success("Episode Created Successfully");
                setLoader(false);
                navigate(`/podcast/${id}`);
                setTitle("");
                setDesc("");
                setAudioFile("");

            }catch(e){
                toast.error(e.message)
                setLoader(false);
            }    
        }else{
            toast.error("ALL Files Should Be There");
            setLoader(false)
        }
    }

  return (
    <div><Header/>
    <div className='input-wrapper'>
        <h1>Create An Episode</h1>
        <InputComponents state={title} setState={setTitle} required={true} type="text" placeholder="Title"></InputComponents>

        <InputComponents state={desc} setState={setDesc} required={true} type="email" placeholder="Description"></InputComponents>
        
        <FileInput
         accept={"audio/*"} 
         id="audio-file-input"
         fileHandleFnc={audioFileHandle}
        text={"Upload Audio File"}
        />
       <Button 
       text={loader?"Loading...":"Create Episode"} 
       disabled={loader} 
       onClick={handleSubmit} 
       classes="btn">
       </Button>
    </div>
    </div>
  )
}

export default CreateAnEpisodePage