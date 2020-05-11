import React from "react";
import Header from "./component/header";
import "./app.css"
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from './router';
import "@reach/tooltip/styles.css";

const App = () => (
    <div className="App">
        <Router>
            <Header />
            <AppRouter />
        </Router>
    </div>
)

export default App;