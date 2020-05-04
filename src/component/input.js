import * as React from "react";


class EditInput extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            name: '',
            done: false,
            elevation: '',
            length: '',
            notes:''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.setState({
            name: this.props.place.name,
            done: this.props.place.done,
            elevation: this.props.place.elevation,
            length: this.props.place.length,
            notes:this.props.place.notes
        });
    }
    handleInputChange(event){
        const target = event.target;
        const value = target.name === 'done' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });

    }
    handleSubmit(event) {
        event.preventDefault();
        const place = {
            _id: this.props.place._id,
            name: this.state.name,
            done: this.state.done,
            elevation: this.state.elevation,
            length: this.state.length,
            notes:this.state.notes

        }
        this.props.onFormSubmit(place);
        this.setState({
            name: '',
            done: false,
            elevation: '',
            length: '',
            notes:''
        });



    }

    componentDidUpdate(prevProps) {

    }

    render() {

        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Done:
                    <input
                        name="done"
                        type="checkbox"
                        checked={this.state.done}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Name:
                    <input
                        name="name"
                        type="text"
                        value={this.state.name}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Elevation in meters:
                    <input
                        name="elevation"
                        type="number"
                        value={this.state.elevation}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Length in kilometers:
                    <input
                        name="length"
                        type="number"
                        value={this.state.length}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Notes:
                    <input
                        name="notes"
                        type="text"
                        value={this.state.notes}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <input type="submit" value="Submit" />
            </form>
        )
    }

}

class AddInput extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            name: '',
            done: false,
            elevation: '',
            length: '',
            notes:''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {

    }
    handleInputChange(event){
        const target = event.target;
        const value = target.name === 'done' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });

    }
    handleSubmit(event) {
        event.preventDefault();
        const place = {
            name: this.state.name,
            done: this.state.done,
            elevation: this.state.elevation,
            length: this.state.length,
            notes:this.state.notes

        }
        this.props.onFormSubmit(place);
        this.setState({
            name: '',
            done: false,
            elevation: '',
            length: '',
            notes:''
        });



    }

    componentDidUpdate(prevProps) {

    }

    render() {

        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Done:
                    <input
                        name="done"
                        type="checkbox"
                        checked={this.state.done}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Name:
                    <input
                        name="name"
                        type="text"
                        value={this.state.name}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Elevation in meters:
                    <input
                        name="elevation"
                        type="number"
                        value={this.state.elevation}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Length in kilometers:
                    <input
                        name="length"
                        type="number"
                        value={this.state.length}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Notes:
                    <input
                        name="notes"
                        type="text"
                        value={this.state.notes}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <input type="submit" value="Submit" />
            </form>
        )
    }

} export {AddInput,EditInput}