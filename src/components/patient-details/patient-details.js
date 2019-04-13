import React from 'react';
import PropTypes from 'prop-types';
import './patient-details.scss';

export default function PatientDetails ({ patientInfo, className }) {
    const { name, gender, birthDate } = patientInfo;
    const plainTextName = name ? name[0].text : '';

    return (
        <div className={`patient-details ${className}`}>
            <div className='patient-details__name'>
                <span className='patient-details__name-title'>Name:</span>
                <span className='patient-details__name-details'>{plainTextName}</span>
            </div>
            <div className='patient-details__gender'>
                <span className='patient-details__gender-title'>Gender:</span>
                <span className='patient-details__gender-details'>{gender}</span>
            </div>
            <div className='patient-details__birthday'>
                <span className='patient-details__birthday-title'>Date of Birth:</span>
                <span className='patient-detials__birthday-details'>{birthDate}</span>
            </div>
        </div>
    )
}

PatientDetails.propTypes = {
    PatientDetails: PropTypes.shape({
        name: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string,
        })),
        gender: PropTypes.string,
        birthDate: PropTypes.string,
    })
}