import React from "react";
import Spinner from "react-bootstrap/Spinner"


export default class ToolColumn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
    }
    componentWillMount() {
        const url = `http://0.0.0.0:8080/product/123`//${this.props.id}`;
        fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(r => r.json())
            .then(r => {
                console.log(r);
            })
            .then(() => this.setState({ loading: false }))
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
            <h1>{this.state.name}</h1>
        );
    }
}