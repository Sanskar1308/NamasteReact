import { useState } from "react"
import { Link } from "react-router-dom"
// import Logo from "../assets/img/petpooja.png"

export const Logo = () => {
    return (
        <a href="/">
            <img src="https://static.businessworld.in/article/article_extra_large_image/1657054898_mFGu1t_Petpooja.jpg" alt="LOGO"></img>
        </a>
    )
}


const Header = () => {  
    const [isLoggedIn, setIsLoggedIn] = useState(true);
  
    return (<div className="navbar">
                <Logo />
            <div className="navbar-item">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li>Cart</li>
                    </ul>
                </div>
                {isLoggedIn ? 
                (<button type="button" onClick={ () => setIsLoggedIn(false)
                }>
                    Logout
                </button>) : 
                (<button type="button" onClick={ () => setIsLoggedIn(true)
                }>
                    Login
                </button>)}
            
            </div>)
}

export default Header;