import React from "react";
import Spinner from "react-bootstrap/Spinner"


export default class ToolColumn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading = true,
            id = "",
            name = "",
            price = "",
            location = "",
            type = "",
        }
    }
    componentWillMount() {
        // fetch(`0.0.0.0:8080/product/${this.props.id}`)
        //     .then(r => r.json())
        //     .then(r => {
        //         console.log(r);
        //     })
        //     .then(() => this.setState({ loading: false })
        let i = 0;
        while (i < 10000000) i++;
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