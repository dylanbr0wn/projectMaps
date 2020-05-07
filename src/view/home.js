import React, { Component }  from 'react';
import './home.css';
import Info from '../component/info';
import dbService from '../services/databaseService';
import {MapArea} from '../component/map'
import AddButton from "../component/addButton";


function InfoSection(props){
    if(!props.ready){
        return null
    }
    return(
        <Info dest={props.dest} ready={props.ready} editElement={props.editElement} deleteElement={props.deleteElement}/>
    )
}


class Home extends Component {
    constructor(props) {
        super(props);
        this.state={
            dest: [],
            selectedDest: {},
            ready: false,
            mapMarker:{},
        };
        this.addElement = this.addElement.bind(this);
        this.editElement = this.editElement.bind(this);
        this.deleteElement = this.deleteElement.bind(this);
    };

    componentDidMount() {
        this.getPlaces()

    }
    componentDidUpdate(prevProps, prevState) {

    }

    render() {
        const ready = this.state.ready
        return (

                <div className="row2">

                    <div className="column1">
                        <div className="info-area">
                            <InfoSection dest={this.state.selectedDest} ready={ready} editElement={this.editElement} deleteElement={this.deleteElement}/>
                        </div>
                        <div className="map-area">
                            <MapArea updateMarker={this.updateMapMarker.bind(this)} ready={ready} selectedDest={this.state.selectedDest}/>
                        </div>
                    </div>
                    <div className="column2">
                        {this.listElements()}
                        <div className="add-button">
                            <AddButton mapMarker={this.state.mapMarker} addElement={this.addElement}/>
                        </div>
                    </div>
                </div>

        );
  }



    listElements(){
        const visitedPlaces = this.state.dest.filter(place=> place.done === true).map(dest =>
            <li key={dest._id}
                // className={dest === this.state.selectedDest ? "active" : null}
                onClick={this.elementClick.bind(this,dest)}
            >
                {dest.name}
            </li>
        );
        const notVisitedPlaces = this.state.dest.filter(place=> place.done === false).map(dest =>
            <li key={dest._id}
                // className={dest === this.state.selectedDest ? "active" : null}
                onClick={this.elementClick.bind(this,dest)}
            >
                {dest.name}
            </li>
        );
        return(
            <div className="list-area">
                <h2 className="column-title">Places</h2>
                <h2 className="list-title">Not Visited</h2>
                <ul>
                    {notVisitedPlaces}
                </ul>
                <hr className="list-hr"/>
                <h2 className="list-title">Visited</h2>
                <ul>
                    {visitedPlaces}
                </ul>
            </div>

        )
    };

  elementClick(dest){
      if(dest._id !== this.state.selectedDest._id){
          this.getPlace(dest._id)
      }
  }

  updateMapMarker(marker){
      this.setState({mapMarker: marker})
  }

    addElement(place){
      dbService.postPlace(place)
          .then(res => {
              this.setState({selectedDest:res.data})
              this.getPlaces()
          })
    }
    editElement(place){
        this.setState({selectedDest:place})
        dbService.putPlace(place,place._id)
            .then(res => {
                this.getPlaces()
            })
    }
    deleteElement(id){
        dbService.deletePlace(id)
            .then(res => {
                this.setState({selectedDest:{},ready:false})
                this.getPlaces()

            })
    }

  getPlaces(){
      dbService.getPlaces()
          .then(res => {
              this.setState({
                  dest: res.data
              });
              if(!isEmpty(this.state.selectedDest)){
                  this.getPlace(this.state.selectedDest._id);
              }
          })
  }
    getPlace(id){
        dbService.getPlace(id)
            .then(res => {
                this.setState({selectedDest: res.data,ready:true})
            })
    }

}
function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

export default Home;
