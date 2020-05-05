import * as React from "react";
import './info.css';
import dbService from '../services/databaseService';
import { CSSTransition } from 'react-transition-group';
import {EditInput} from "./input";

class Info extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            place: {},
            change: false,
            edit: false,
            showInfo: false,
            delete: false
        }
        this.setEditOn = this.setEditOn.bind(this);
        this.setEditOff = this.setEditOff.bind(this);

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

    setDeleteOn(){
        this.setState({delete: true});
    }
    setDeleteOff(){
        this.setState({delete: false});
    }

    editSubmit(place){
        this.setState({place:place, edit: false})
        this.props.editElement(place)

    }
    deleteSubmit(){
        this.setState({delete: false})
        this.props.deleteElement(this.state.place._id)

    }
    toggleInfo(){
        this.setState({showInfo: !this.state.showInfo})
    }



    render() {
        const destName = this.props.dest.name ? this.props.dest.name : this.state.name

        return (
            <div>
                {
                    !this.state.showInfo &&
                    <button className="modal-info-btn" onClick={this.toggleInfo.bind(this)}>
                        <i className="fa fa-info"/>{destName}
                    </button>
                }
                {
                    this.state.showInfo &&
                    <div className="info-box" >
                            <h2 className="info-title">{destName}
                                <button className="modal-close-btn" onClick={this.toggleInfo.bind(this)}>
                                    <i className="fa fa-angle-double-left"/>
                                </button>
                                <button className="modal-edit-btn" onClick={this.setEditOn}>
                                    <i className="fa fa-pencil"/>
                                </button>


                            </h2>
                            <hr className="info-hr"/>
                            <div className="info-line">
                                <span className="info-line-title">Distance: </span> {this.state.place.length}km
                            </div>
                            <div className="info-line">
                                <span className="info-line-title">Elevation:</span> {this.state.place.elevation}m
                            </div>
                            <div className="info-line">
                                <span className="info-line-title">Visited:</span> {this.state.place.done ? "Yes" : "No"}
                            </div>
                            <div className="info-line">
                                <span className="info-line-title">Notes:</span> {this.state.place.notes}
                            </div>
                            <button className="modal-delete-btn" onClick={this.setDeleteOn}>
                                <i className="fa fa-trash"/>Delete 
                            </button>





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

                }
            </div>



        )
    }

}
export default Info;