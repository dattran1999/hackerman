import React from "react";
import {Spinner, Image, Container, Col, Row, Button} from "react-bootstrap"


export default class ToolColumn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            productId: props.match.params.productId
        }
    }
    componentWillMount() {
        const url = `http://0.0.0.0:8080/product/${this.state.productId}`;
        fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(r => r.json())
            .then(r => {
                this.setState({data: r})
            })
            .then(() => {
                this.setState({ loading: false })
            })
    }
    render(){
        const { loading } = this.state;
        
        if(loading) { 
            return (
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            );
        }
    
        return (
            <Container>
                <Row>
                    <Col xs={4}>
                        <Image style={{width: "226px", height: "226px"}} src="https://contentgrid.homedepot-static.com/hdus/en_US/DTCCOMNEW/fetch/Category_Pages/Electrical/Electrical_Tools_and_Accessories/electrical-screwdrivers.jpg" />
                    </Col>
                    <Col className="text-left" style={{margin: "20px"}} xs={6}>
                        <h1>{this.state.name}</h1>
                        <p>blah {this.state.productId}</p>
                        <p>Rent now for {this.state.price}</p>
                        <Button variant="primary">Rent</Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}