import * as React from "react";
import './info.css';
import dbService from '../services/databaseService';
import { CSSTransition } from 'react-transition-group';
import {EditInput, AddInput} from "./input";

class Info extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            place: {},
            change: false,
            edit: false,
            add: false,
            delete: false
        }
        this.setEditOn = this.setEditOn.bind(this);
        this.setEditOff = this.setEditOff.bind(this);
        this.setAddOn = this.setAddOn.bind(this);
        this.setAddOff = this.setAddOff.bind(this);
        this.addSubmit = this.addSubmit.bind(this);
        this.editSubmit = this.editSubmit.bind(this);
        this.deleteSubmit = this.deleteSubmit.bind(this);
        this.setDeleteOn = this.setDeleteOn.bind(this);
        this.setDeleteOff = this.setDeleteOff.bind(this);
    }
    componentDidMount() {
        this.setState({place: {},change: false})
        this.getPlace();
    }

    componentDidUpdate(prevProps) {
        if (this.props.dest._id !== prevProps.dest._id) {
            this.setState({place: {},change: false})
            this.getPlace();
        }
    }

    getPlace(){
        dbService.getPlace(this.props.dest._id)
            .then(res => {
                this.setState({place: res.data,change: true})
            })
    }

    setEditOn(){
        this.setState({edit: true});
    }
    setEditOff(){
        this.setState({edit: false});
    }
    setAddOn(){
        this.setState({add: true});
    }
    setAddOff(){
        this.setState({add: false});
    }
    setDeleteOn(){
        this.setState({delete: true});
    }
    setDeleteOff(){
        this.setState({delete: false});
    }

    addSubmit(place){
        this.setState({place: place,add: false})
        this.props.addElement(place)

    }
    editSubmit(place){
        this.setState({place:place, edit: false})
        this.props.editElement(place)

    }
    deleteSubmit(){
        this.setState({delete: false})
        this.props.deleteElement(this.state.place._id)

    }



    render() {
        const destName = this.props.dest.name ? this.props.dest.name : this.state.name

        return (

            <div className="info-box" >
                    <div>
                        <h2>{destName}<button className="modal-btn" onClick={this.setEditOn}> Edit</button><button className="modal-btn" onClick={this.setDeleteOn}> Delete</button></h2>


                        <div >
                            Distance: {this.state.place.length}km
                        </div>


                        <div>
                            elevation: {this.state.place.elevation}m
                        </div>

                        <div>
                            visited: {this.state.place.done ? "Yes" : "No"}
                        </div>
                        <div>
                            notes: {this.state.place.notes}
                        </div>
                    </div>
                <br/>
                <button className="modal-btn" onClick={this.setAddOn}> Add New</button>


                <CSSTransition
                    in={this.state.add}
                    timeout={300}
                    classNames="edit"
                    unmountOnExit
                >
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close-btn" onClick={this.setAddOff}>&times;</span>
                            <div className="form-area">
                                <h2>New Place</h2>
                                <AddInput  onFormSubmit={this.addSubmit}/>
                            </div>
                        </div>
                    </div>

                </CSSTransition>
                <CSSTransition
                    in={this.state.delete}
                    timeout={300}
                    classNames="edit"
                    unmountOnExit
                >
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close-btn" onClick={this.setDeleteOff}>&times;</span>
                            <div className="form-area">
                                <h2>Delete Place</h2>
                                <button className="confirm-btn" onClick={this.deleteSubmit}> Confirm</button>
                            </div>
                        </div>
                    </div>

                </CSSTransition>
                <CSSTransition
                    in={this.state.edit}
                    timeout={300}
                    classNames="edit"
                    unmountOnExit
                >
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close-btn" onClick={this.setEditOff}>&times;</span>
                            <div className="form-area">
                                <h2>Edit Place</h2>
                                <EditInput place={this.state.place} onFormSubmit={this.editSubmit}/>
                            </div>
                        </div>
                    </div>

                </CSSTransition>
            </div>

        )
    }

}
export default Info;