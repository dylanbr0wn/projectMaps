import * as React from "react";
import {MapGPS} from "../component/map";

export default class GPS extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            ready:false,
            selectedDest: {},
            mapMarker: {},
            userPos: {}
        }
    }
    componentDidMount() {
    }


    render(){
        return(
            <div>
                <MapGPS userPos={this.state.userPos} updateMarker={this.updateMapMarker.bind(this)} ready={this.state.ready} selectedDest={this.state.selectedDest}/>
            </div>
        )
    }
    updateMapMarker(marker){
        this.setState({mapMarker: marker})
    }
}