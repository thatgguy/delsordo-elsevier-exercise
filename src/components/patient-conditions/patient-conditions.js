import React from 'react';
import './patient-conditions.scss';

export default function patientConditions({ conditions }) {
    return (
        <div className='patient-conditions'>
            <div className='patient-conditions__title'>Active Conditions</div>
            <div className='patient-conditions__content'>
                <div className='patient-conditions__condition-name-header'>Condition Name</div>
                <div className='patient-conditions__condition-date-recorded-header'>First Recorded Date</div>
                {conditions.map(condition => {
                    const { conditionName, firstDateRecorded } = condition;
                    const urlFormattedConditionName = conditionName.replace(' ', '+');
                    const searchUrl = `https://www.ncbi.nlm.nih.gov/pubmed/?term=${urlFormattedConditionName}`

                    return (
                        <React.Fragment>
                            <div className='patient-conditions__condition-name'>
                                <a href={searchUrl}>{conditionName}</a>
                            </div>
                            <div className='patient-conditions__condition-date-recorded'>{firstDateRecorded ? firstDateRecorded.toString() : 'N/A'}</div>
                        </React.Fragment>                    
                    )
                    
                })}
            </div>
        </div>
    )
}
