import React from 'react';

function PatientRow({ rowIndex, patientData, onCheckboxChange }) {
    const score = patientData.reduce((acc, curr) => acc + (curr ? 1 : 0), 1); // Start with a base score of 1
    

    return (
        <tr>
            <td>Bed {rowIndex}</td>
            <td><span>{score}</span></td>
            {patientData.map((checked, index) => (
                <td key={index}>
                    <input 
                        type="checkbox" 
                        checked={checked}
                        onChange={() => onCheckboxChange(rowIndex - 1, index)} 
                    />
                </td>
            ))}
        </tr>
    );
}

export default PatientRow;
