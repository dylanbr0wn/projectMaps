import * as React from "react";
import './404.css';

export default class NoMatch extends React.Component{
    render(){
        return(
            <div className="no-match">
                <h1>404 Not Found</h1>
                <p>um.... oops??</p>
            </div>
        )
    }

}