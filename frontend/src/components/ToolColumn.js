import ToolCard from '../element/ToolCard.js';
import React from "react";
import CardColumns from "react-bootstrap/CardColumns"

export default class ToolColumn extends React.Component {
    constructor(props) {
        super(props);
    }
    getTools() {
        let tools = 
            [
                {
                    id: 123,
                    name: "Screw Driver",
                    price: 900,
                    location: "here",
                    type: "machine"
                }, 
                {
                    id: 124,
                    name: "Screw Driver",
                    price: 900,
                    location: "here",
                    type: "machine"
                }
            ];
        // fetch('0.0.0.0:8080/tools')
        //     .then(r => r.json())
        //     .then(r => {
        //         tool = r;
        //     })
        return tools.map(
            t => (
                <ToolCard
                    key={t.id}
                    id={t.id}
                    name={t.name}
                    price={t.price}
                    location={t.location}
                    type={t.type}
                />
            )
        );
        
    }
    render(){
        return (
            <CardColumns>
                {this.getTools()}
            </CardColumns>
        );
    }
}