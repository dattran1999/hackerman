import React, {Component} from "react";
import {Navbar,Nav} from 'react-bootstrap';

function Conditional(props) {
    return (
        props.isLogging === false ? <Nav.Link href="login">Login</Nav.Link> : <Nav.Link href="home" >Logout</Nav.Link>
 
    )
    
}

export default Conditional