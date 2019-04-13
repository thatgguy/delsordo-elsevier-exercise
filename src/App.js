import React, { Component } from 'react';
import { getPatientInformation } from './api/cerner-api';
import PatientDetails from './components/patient-details/patient-details';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    state = {
        patientInfo: {},
    }
    componentDidMount() {
        const app = this;
        const getPatientInfoSucceeded = (response) => app.setState({ patientInfo: response.entry[0].resource })
        const onFailure = (error) => console.warn('Error getting patient information: ', error)
        getPatientInformation(getPatientInfoSucceeded, onFailure)
    }

    render() {
        const { patientInfo } = this.state;
        return (
        <div className="App">
            <PatientDetails patientInfo={patientInfo} />
        </div>
        );
    }
}

export default App;
