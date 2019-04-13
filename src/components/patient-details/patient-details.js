import React from 'react';
import PropTypes from 'prop-types';

export default function PatientDetails ({ patientInfo, className }) {
    const { name, gender, birthDate } = patientInfo;
    const plainTextName = name ? name[0].text : '';

    return (
        <div className={`patient-details ${className}`}>
            <div className='patient-details__name'>
                <span>Name:</span>
                <span>{plainTextName}</span>
            </div>
            <div className='patient-details__gender'>
                <span>Gender:</span>
                <span>{gender}</span>
            </div>
            <div className='patient-details__birthday'>
                <span>Date of Birth:</span>
                <span>{birthDate}</span>
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