import React from 'react';
import './App.css';

import SampleTable from './components/SampleTable';
import FixedHeader from './components/FixedHeader';
// import DataTable from './components/DataTable';
import UnknownSuspects from './components/UnknownSuspects';
import Navbar from './components/Navbar';
import StyledMenu from './components/StyledMenu';
import TestComponent from './components/Test';



import {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {
    DataTable,
} from "./components/index.js"


class App extends Component {


    componentDidMount = async () => {
    };

    render() {
        const props = {

        };
        return (
            <div className="App">
                {/*<Navbar/>*/}
                <StyledMenu/>
                <TestComponent/>
                <Router basename={"admin"}>
                    <Switch>
                        {/*<Route*/}
                            {/*exact*/}
                            {/*path="/"*/}
                            {/*component={Dashboard}*/}
                            {/*props={props}*/}
                        {/*/>*/}
                        <Route
                            path="/DataTable"
                            component={DataTable}
                            props={props}
                        />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
