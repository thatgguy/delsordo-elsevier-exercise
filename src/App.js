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
        isPatientInfoLoading: true,
        isPatientConditionInfoLoading: true,
    }

    componentDidMount() {
        const getPatientInfoSucceeded = (response) => this.setState({
            patientInfo: response.entry[0].resource,
            isPatientInfoLoading: false,
        });
        const getPatientInfoFailed = (error) => console.warn('Error getting patient information: ', error);
        getPatientInformation(getPatientInfoSucceeded, getPatientInfoFailed);

        const getPatientConditionsSucceeded = (response) => this.setState({
            patientConditions: response.entry.map(item => item.resource),
            isPatientConditionInfoLoading: false,
        });
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
            const firstEntry = (a[type] && typeof a[type] === 'string') ? a[type].toLowerCase() : a[type];
            const secondEntry = (b[type] && typeof b[type] === 'string') ? b[type].toLowerCase() : b[type];
            if (firstEntry < secondEntry || (!!firstEntry && !secondEntry)) {
                return -1;
            }
    
            if (firstEntry > secondEntry) {
                return 1;
            }
    
            return 0
        }

        const sortedConditions = filteredConditions.sort(sortFunc);
        
        return direction === 'down' ? sortedConditions : sortedConditions.reverse();
    }

    render() {
        const { patientInfo, isPatientConditionInfoLoading, isPatientInfoLoading } = this.state;

        return (
        <div className="app">
            {(isPatientConditionInfoLoading || isPatientInfoLoading)
                ? <div>Loading...</div>
                : <React.Fragment>
                    <PatientDetails patientInfo={patientInfo} className='app__patient-details'/>
                    <PatientConditions
                        conditions={this.getFormattedConditions()}
                        onSort={(newSort) => this.setState({ activeSort: newSort })}
                    />
                </React.Fragment>
            }
        </div>
        );
    }
}

export default App;
