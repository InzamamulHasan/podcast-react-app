import React, { useEffect } from 'react'
import Header from '../Components/Common/Header'
import { useDispatch, useSelector } from 'react-redux'
import { collection, onSnapshot, query } from 'firebase/firestore';
import { setPodcasts } from '../slices/podcastSlice';
import {db} from "../firebase"
import PodcastCard from '../Components/Podcasts/PodcastCard';
import { useState } from 'react';
import InputComponents from '../Components/Common/Input';

function PodcastsPage() {
    const dispatch=useDispatch();
    const podcasts=useSelector((state)=>state.podcasts.podcasts)

    const [search,setSearch]=useState("");

    useEffect(()=>{
        const unsubscribe=onSnapshot(
            query(collection(db,"podcasts")),
            (querySnapshot)=>{
                const podcastsData=[];
                querySnapshot.forEach((doc)=>{
                    podcastsData.push({id:doc.id,...doc.data()});
                })
                dispatch(setPodcasts(podcastsData));
            },
          (error)=>{
            console.error("Error fetching pocasts podcasts:",error);
          }
        );

        return ()=>{
            unsubscribe();
        }
    },[dispatch])

    const filteredPodcats=podcasts.filter((item)=>{
      let t=item.title.trim().toLowerCase();
      let s=search.trim().toLowerCase();
      return t.includes(s);
    })
  return (
    <div>
        <Header/>
        <div className='input-wrapper' style={{marginTop:"1rem"}}>
            <h1 style={{marginTop:"0"}}>Discover Podcasts</h1>

            <InputComponents state={search} setState={setSearch} required={true} type="text" placeholder="Search By Title"></InputComponents>

            {filteredPodcats.length>0?
            <div className='podcast-flex' >
              {filteredPodcats.map((item)=>{
                return <PodcastCard key={item.id} id={item.id} title={item.title} displayImage={item.displayImage}/>
              })}
            </div>:<p>{search?"Podcast Not Found":"No Podcast On The Platfomr"}</p>}
        </div>
        
    </div>
  )
}

export default PodcastsPage;