import React from 'react';

export default function PatientDetails ({ patientInfo }) {
    const { name, gender, birthDate } = patientInfo;
    const plainTextName = name ? name[0].text : '';

    return (
        <div className='patient-details'>
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