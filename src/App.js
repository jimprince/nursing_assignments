import React, { useState, useEffect } from 'react';
import NurseForm from './NurseForm';
import PatientTable from './PatientTable';
import NurseAssignments from './NurseAssignments';

import './App.css';
function App() {
    const [numNurses, setNumNurses] = useState(4);
    const [numBeds, setNumBeds] = useState(12);
    const [patientData, setPatientData] = useState(Array(numBeds).fill(Array(7).fill(false)));
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        try {
            const savedState = localStorage.getItem('nursingAssignmentState');
            console.log('Saved state:', savedState);
            if (savedState) {
                const { numNurses, numBeds, patientData, assignments } = JSON.parse(savedState);
    
                if (typeof numNurses === 'number' && typeof numBeds === 'number' && Array.isArray(patientData) && Array.isArray(assignments)) {
                    setNumNurses(numNurses);
                    setNumBeds(numBeds);
                    setPatientData(patientData);
                    setAssignments(assignments);
                    console.log('State loaded from local storage.');
                } else {
                    console.error('Invalid state shape:', { numNurses, numBeds, patientData, assignments });
                }
            } else {
                console.log('No saved state in local storage.');
            }
        } catch (error) {
            console.error('Failed to load state:', error);
        }
    }, []);

    useEffect(() => {
        try {
            // Don't save the state if it has its default values'=
            console.log(numNurses, numBeds, patientData, assignments)
            if (
              numNurses !== 4 ||
              numBeds !== 12 ||
              !patientData.every(subArray => subArray.every(value => value === false)) ||
              assignments.length !== 0
            ) {
                console.log("Saving state to local storage.")
                const state = {
                    numNurses,
                    numBeds,
                    patientData,
                    assignments
                };
                localStorage.setItem('nursingAssignmentState', JSON.stringify(state));
            }
        } catch (error) {
            console.error('Failed to save state to local storage:', error);
        }
    }, [numNurses, numBeds, patientData, assignments]);

    useEffect(() => {
        if (numBeds > patientData.length) {
            // If the number of beds has increased, add new beds
            setPatientData(prevData => [...prevData, ...Array(numBeds - prevData.length).fill(Array(7).fill(false))]);
        } else if (numBeds < patientData.length) {
            // If the number of beds has decreased, remove beds
            setPatientData(prevData => prevData.slice(0, numBeds));
        }
    }, [numBeds]);

    const calculateAssignments = () => {
        let patientScores = patientData.map((data, index) => ({
            bed: index + 1,
            score: data.reduce((acc, curr) => acc + (curr ? 1 : 0), 1)
        }));

        patientScores.sort((a, b) => b.score - a.score);

        let newAssignments = Array.from({ length: numNurses }, () => []);

        patientScores.forEach(patient => {
            const nurseIndex = newAssignments.reduce((lowest, current, index, array) => {
                return array[lowest].reduce((a, b) => a + b.score, 0) <= current.reduce((a, b) => a + b.score, 0) ? lowest : index;
            }, 0);

            newAssignments[nurseIndex].push(patient);
        });

        setAssignments(newAssignments);
    };

    return (
        <div id="assignmentForm">
            <h1>Neurorehabilitation Nursing Assignment Tool</h1>
            <NurseForm 
                numNurses={numNurses} 
                setNumNurses={setNumNurses} 
                numBeds={numBeds} 
                setNumBeds={setNumBeds} 
            />
            <PatientTable 
                numBeds={numBeds} 
                patientData={patientData} 
                setPatientData={setPatientData}
            />
            <button onClick={calculateAssignments}>Calculate Assignments</button>
            <NurseAssignments assignments={assignments} />
        </div>
    );
}

export default App;
