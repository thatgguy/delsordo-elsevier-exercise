import React from 'react';
import PropTypes from 'prop-types';
import './patient-conditions.scss';

export default function PatientConditions({ conditions, onSort }) {
    return (
        <div className='patient-conditions'>
            <div className='patient-conditions__title'>Active Conditions</div>
            <div className='patient-conditions__content'>
                <div className='patient-conditions__condition-name-header'>
                    Condition Name
                    <div className='patient-conditions__sort-buttons-container'>
                        <div className='patient-conditions__sort-up' onClick={() => onSort({type: 'conditionName', direction: 'up' })} />
                        <div className='patient-conditions__sort-down' onClick={() => onSort({type: 'conditionName', direction: 'down' })} />
                    </div>
                </div>
                <div className='patient-conditions__condition-date-recorded-header'>
                First Recorded Date
                <div className='patient-conditions__sort-buttons-container'>
                    <div className='patient-conditions__sort-up' onClick={() => onSort({type: 'firstDateRecorded', direction: 'up' })} />
                    <div className='patient-conditions__sort-down' onClick={() => onSort({type: 'firstDateRecorded', direction: 'down' })} />
                </div>
                </div>
                {conditions.map(condition => {
                    const { conditionName, firstDateRecorded } = condition;
                    const urlFormattedConditionName = conditionName.replace(' ', '+');
                    const searchUrl = `https://www.ncbi.nlm.nih.gov/pubmed/?term=${urlFormattedConditionName}`

                    return (
                        <React.Fragment>
                            <div className='patient-conditions__condition-name' onClick={() => window.open(searchUrl, '_blank')}>
                                {conditionName}
                            </div>
                            <div className='patient-conditions__condition-date-recorded'>{firstDateRecorded ? firstDateRecorded.toString() : 'N/A'}</div>
                        </React.Fragment>                    
                    )
                    
                })}
            </div>
        </div>
    )
}

PatientConditions.propTypes = {
    conditions: PropTypes.arrayOf(PropTypes.shape({
        conditionName: PropTypes.string,
        firstDateRecorded: PropTypes.object,
    })),
    onSort: PropTypes.func,
}
