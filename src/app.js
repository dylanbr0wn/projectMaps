import * as React from "react";
import Header from "./component/header";
import "./app.css"
import {CSSTransition, SwitchTransition} from "react-transition-group";
import {BrowserRouter as Router, Route, Switch, withRouter} from "react-router-dom";
import Home from "./view/home";
import GPS from "./view/gps";
import NoMatch from "./view/404";

const AppRouter = withRouter(({ location }) => (


        <SwitchTransition>
            <CSSTransition
                key={location.key}
                classNames="fade"
                timeout={300}
            >
                <Switch location={location}>
                    <Route exact path="/" component={Home} />
                    <Route path="/gps" component={GPS} />
                    <Route path="*" component={NoMatch}/>
                </Switch>
            </CSSTransition>
        </SwitchTransition>

));


export default class App extends React.Component{
    render(){
        return(
            <div className="App">
                <Router>
                    <Header/>
                    <AppRouter/>
                </Router>
            </div>
        )
    }
}