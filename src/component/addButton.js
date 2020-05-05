import {AddInput} from "./input";
import {CSSTransition} from "react-transition-group";
import * as React from "react";
import './addButton.css'

export default class AddButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            place: {},
            change: false,
            add: false,
        }
        this.setAddOn = this.setAddOn.bind(this);
        this.setAddOff = this.setAddOff.bind(this);
        this.addSubmit = this.addSubmit.bind(this);
    }

    setAddOn(){
        this.setState({add: true});
    }
    setAddOff(){
        this.setState({add: false});
    }
    addSubmit(place){
        this.setState({place: place,add: false})
        this.props.addElement(place)

    }


    render(){
        return(
            <div>
                <button className="modal-add-btn" onClick={this.setAddOn}>
                    Add New
                    <i className="fa fa-plus"/>
                </button>
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
            </div>

        )
    }
}

