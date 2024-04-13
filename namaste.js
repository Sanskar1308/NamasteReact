import React from "react";
import ReactDOM from "react-dom/client";
import companyLogo from './images/nike_logo.png'

const heading = <h1 key="123">Hello</h1>;

const Logo = () => (    
    <div>
        <img src={companyLogo} alt=""></img>
        <div></div>
        <img src="" alt=""></img>
    </div>
)

const Heading = () => (    
    <div>
        <Logo />
        {heading}
        <h3 key="125">Hello</h3>
    </div>
)


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<Heading />);
