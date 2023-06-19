
import './App.css';
import {  BrowserRouter ,Routes,Route,} from 'react-router-dom';
import SignUpPage from './Pages/SignUp';
import Profile from './Pages/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth,db } from './firebase';
import { setUser } from './slices/userslice';
import { useDispatch } from 'react-redux';
import PrivateRoutes from './Components/Common/PrivateRoutes';
import CreateAPodcast from './Pages/CreateAPodcast';
import PodcastsPage from './Pages/Podcasts';
import PodcastDetailsPage from './Pages/PodcastDetails';
import CreateAnEpisodePage from './Pages/CreateAnEpisode';


function App() {
  let dispatch=useDispatch();
  useEffect(()=>{
    let unsubscribeAuth=onAuthStateChanged(auth,(user)=>{
      if(user){
        const unsubscribeSnapshot=onSnapshot(
          doc(db,"users",user.uid),
          (userDoc)=>{
            if(userDoc.exists()){
              const userData=userDoc.data();
              console.log(userData);
              dispatch(
                setUser({
                  name:userData.name,
                  email:userData.email,
                  uid:user.uid, 
                  profile:userData.profile     
                })
              )
            }
          },
          (error)=>{
            console.error("Error fetching user data",error);
          }
        )
      }
    })
    return ()=>{
      unsubscribeAuth();
    }
  },[])

  return (
    <div className="App">
    
     <BrowserRouter>
     <ToastContainer position="top-center"/>
      <Routes>
        <Route path='/' element={<SignUpPage/>}/>
        <Route element={<PrivateRoutes/>}>
           <Route path='/profile' element={<Profile/>}/>
           <Route path="/create-a-podcast" element={<CreateAPodcast/>}/>
           <Route path="/podcasts" element={<PodcastsPage/>}/>
           <Route path="/podcast/:id" element={<PodcastDetailsPage/>}/>
           <Route path="/podcast/:id/create-episode" element={<CreateAnEpisodePage/>}/>
        </Route>
       
      </Routes>
     </BrowserRouter>
     
    </div>
  );
}

export default App;
