import './style.css';
import { Link,useLocation } from 'react-router-dom';
let Header=()=>{
    let location=useLocation();
    const currentPath=location.pathname;
    return(
      
        <div className='navbar'>
            <div className='gradiant'></div>
            <div className='links'>
                <Link to="/" className={currentPath==="/"?"active":""}>SignUp</Link>
                <Link to="/podcasts" className={currentPath==="/podcasts"?"active":""}>Podcast</Link>
                <Link to="/create-a-podcast" className={currentPath==="/create-a-podcast"?"active":""}>Start A Podcast</Link>
                <Link to="/profile" className={currentPath==="/profile"?"active":""}>Profile</Link>
            </div>
        </div>
    )
}
export default Header;