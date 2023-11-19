import React from 'react';

function NurseForm({ numNurses, setNumNurses, numBeds, setNumBeds }) {
    return (
        <form>
            <label htmlFor="numNurses">Number of Nurses:</label>
            <input 
                type="number" 
                id="numNurses" 
                name="numNurses" 
                min="1" 
                value={numNurses} 
                onChange={(e) => setNumNurses(e.target.value ? parseInt(e.target.value) : 1)}
            /><br /><br />

            <label htmlFor="numBeds">Number of Beds:</label>
            <input 
                type="number" 
                id="numBeds" 
                name="numBeds" 
                min="1" 
                value={numBeds} 
                onChange={(e) => setNumBeds(e.target.value ? parseInt(e.target.value) : 1)}
            /><br /><br />
        </form>
    );
}

export default NurseForm;
