import React from 'react';
import PatientRow from './PatientRow';

function PatientTable({ numBeds, patientData, setPatientData }) {
    const handleCheckboxChange = (rowIndex, checkboxIndex) => {
        const updatedData = [...patientData];
        updatedData[rowIndex][checkboxIndex] = !updatedData[rowIndex][checkboxIndex];
        setPatientData(updatedData);
    };

    return (
        <table className="patient-table" id="patientTable">
            <thead>
                <tr>
                    <th>Bed</th>
                    <th>Score</th>
                    <th>Mobility Issues</th>
                    <th>Cognitive Impairment</th>
                    <th>Communication Difficulty</th>
                    <th>Complex Medical Needs</th>
                    <th>Personal Care Assistance</th>
                    <th>Behavioral Issues</th>
                    <th>High Rehabilitation Needs</th>
                </tr>
            </thead>
            <tbody>
                {patientData.map((data, index) => (
                    <PatientRow 
                        key={index} 
                        rowIndex={index + 1} 
                        patientData={data} 
                        onCheckboxChange={handleCheckboxChange}
                    />
                ))}
            </tbody>
        </table>
    );
}

export default PatientTable;
