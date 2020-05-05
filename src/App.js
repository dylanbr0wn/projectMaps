import React, { Component }  from 'react';
import './App.css';
import Info from './component/info';
import dbService from './services/databaseService';
import MapArea from './component/map'
import AddButton from "./component/addButton";

function InfoSection(props){
    if(!props.ready){
        return null
    }
    return(
        <Info dest={props.dest} ready={props.ready} addElement={props.addElement} editElement={props.editElement} deleteElement={props.deleteElement}/>
    )
}


class App extends Component {
    constructor(props) {
        super(props);
        this.state={
            dest: [],
            selectedDest: {},
            ready: false
        };
        this.addElement = this.addElement.bind(this);
        this.editElement = this.editElement.bind(this);
        this.deleteElement = this.deleteElement.bind(this);
    };

    componentDidMount() {
        this.getPlaces()

    }

  render() {
        const ready = this.state.ready
        return (
            <div className="App">
                <div className="row1">
                    <h1>Project Maps</h1>
                </div>
                <div className="row2">

                    <div className="column1">
                        <div className="info-area">
                            <InfoSection dest={this.state.selectedDest} ready={ready} editElement={this.editElement} deleteElement={this.deleteElement}/>
                        </div>
                        <div className="map-area">
                            <MapArea />
                        </div>

                    </div>
                    <div className="column2">



                        {this.listElements()}
                        <div className="add-button">
                            <AddButton addElement={this.addElement}/>
                        </div>

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
      this.setState({selectedDest:dest})
  }

    addElement(place){
      dbService.postPlace(place)
          .then(res => {
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
                this.getPlaces()
                this.setState({selectedDest:this.state.dest[0]})
            })
    }

  getPlaces(){
      dbService.getPlaces()
          .then(res => {
              this.setState({
                  dest: res.data,
                  selectedDest: isEmpty(this.state.selectedDest) ? res.data[0] : this.state.selectedDest,
                  ready:true
              });
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

export default App;
