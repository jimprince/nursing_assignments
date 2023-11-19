import React from 'react';

function NurseAssignments({ assignments }) {
    return (
        <div>
            <h2>Nursing Assignments</h2>
            {assignments.map((nurse, index) => (
                <div key={index}>
                    <h3>Nurse {index + 1}:</h3>
                    <ul>
                        {nurse.map((assignment, idx) => (
                            <li key={idx}>
                                Bed {assignment.bed} (Complexity Score: {assignment.score})
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default NurseAssignments;
