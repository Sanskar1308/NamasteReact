import { useState } from "react"

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
                        <li>Home</li>
                        <li>Product</li>
                        <li>About us</li>
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