import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';
import Login from "./Login";
import Register from "./Register";
import Conditional from "./conditional";
import ToolColumn from "./ToolColumn"
import Tool from "./Tool"


const Header = (props) => {

    var isLogging = false
    
    return (
    <Router>
        <main>
            <Navbar bg="light" variant="light">
            <Navbar.Brand href="home">Hackerspace</Navbar.Brand>
            <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
            <Conditional isLogging={isLogging} />
            <Nav.Link href="/booking">Booking</Nav.Link>
            </Nav>
            </Navbar>
            <br>
            </br>
            <Switch>

                <Route path='/' exact render={() => <Redirect to="/tool" />} />
                <Route path='/home' exact render={() => <Redirect to="/tool" />} />
                <Route path='/login' exact component={Login} />
                <Route path='/register' exact component={Register} />
                <Route path='/tool' exact component={ToolColumn} />
                <Route path='/product/:productId' exact component={Tool} />

            </Switch>
            
        </main>
    </Router>
        
       
   
        
    )
}

export default Header;