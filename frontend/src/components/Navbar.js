import { Link } from 'react-router-dom'
import { useState } from "react"
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

//Component for Navigation Bar
function Navbar() {
  const [displayVal, setDisplayVal] = useState('none')
  const { logout } = useLogout()
  const { user } = useAuthContext()

  //logout
  const handleClick = () => {
    logout()
  }

  //Expand or collapse navigation when using small device
  const ExpandNavigation = () => {
    if(displayVal === 'none'){
      setDisplayVal('flex')
    } else{
      setDisplayVal('none')
    }
    
  }

  return (
    <nav>
      <div className="navbar"></div>
      <div className='navigation-big-devices'>
        <Link to="/">
          <h1>TEXT-TO-GIF</h1>
        </Link>
        {!user && (
        <div>
          <Link to="/login" className='a-button'>Login</Link>
          <Link to="/signup" className='a-button'>Signup</Link>
        </div>
        )}
        {user && (
          <div>
            <p className='user-email'>{user.email}</p>
            <button className='a-button logout' onClick={handleClick}>Logout</button>
          </div>
        )}
      </div>

      {/* Navigation for smaller devices */}
      <button id="navigation-button" onClick={ExpandNavigation}></button>

      {!user && (
        <div style={{display: displayVal}} className="navigation-small-devices">
          <Link to="/" className='a-button'>Home</Link>
          <Link to="/login" className='a-button'>Login</Link>
          <Link to="/signup" className='a-button'>Signup</Link>
        </div>
      )}
      {user && (
        <div style={{display: displayVal}} className="navigation-small-devices">
          <Link to="/" className='a-button'>Home</Link>
          <button className='a-button logout' onClick={handleClick}>Logout</button>
        </div>
      )}
      
    </nav>
  );
}
  
  export default Navbar;
  