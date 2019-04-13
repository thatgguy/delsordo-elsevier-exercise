import React, { Component } from 'react';
import { getPatientInformation, getPatientConditions } from './api/cerner-api';
import PatientDetails from './components/patient-details/patient-details';
import PatientConditions from './components/patient-conditions/patient-conditions';
import './App.scss';

class App extends Component {
    state = {
        patientInfo: {},
        patientConditions: [],
        activeSort: {
            type: 'conditionName',
            direction: 'down',
        },
    }

    componentDidMount() {
        const app = this;

        const getPatientInfoSucceeded = (response) => app.setState({ patientInfo: response.entry[0].resource });
        const getPatientInfoFailed = (error) => console.warn('Error getting patient information: ', error);
        getPatientInformation(getPatientInfoSucceeded, getPatientInfoFailed);

        const getPatientConditionsSucceeded = (response) => app.setState({ patientConditions: response.entry.map(item => item.resource) });
        const getPatientConditionsFailed = (error) => console.warn('Error getting patient conditions: ', error);
        getPatientConditions(getPatientConditionsSucceeded, getPatientConditionsFailed);
    }

    // removes duplicate conditions and only returns necessary information, then sorts
    getFormattedConditions () {
        const { patientConditions, activeSort: { type, direction } } = this.state;

        const uniqueConditions = new Set(patientConditions.map(condition => condition.code.text))
        const filteredConditions = [...uniqueConditions].map(uniqueCondition => {
            const filteredUniqueConditionInfo = patientConditions.filter(condition => condition.code.text === uniqueCondition)
            const recordedDates = filteredUniqueConditionInfo.map(condition => condition.onsetDateTime)
            let earliestDate;
    
            recordedDates.forEach(date => {
                if (!date) return;
                const formattedDate = new Date(date)
    
                if (!earliestDate || earliestDate > formattedDate) {
                    return earliestDate = formattedDate;
                }
                
            })
    
            return { conditionName: uniqueCondition, firstDateRecorded: earliestDate }
        })

        const sortFunc = (a, b) => {
            if (a[type] < b[type] || (!!a[type] && !b[type])) {
                return -1;
            }
    
            if (a[type] > b[type]) {
                return 1;
            }
    
            return 0
        }

        const sortedConditions = filteredConditions.sort(sortFunc);
        
        return direction === 'down' ? sortedConditions : sortedConditions.reverse();
    }

    render() {
        const { patientInfo } = this.state;
        const app = this;

        return (
        <div className="app">
            <PatientDetails patientInfo={patientInfo} className='app__patient-details'/>
            <PatientConditions
                conditions={this.getFormattedConditions()}
                onSort={(newSort) => this.setState({ activeSort: newSort })}
            />
        </div>
        );
    }
}

export default App;
