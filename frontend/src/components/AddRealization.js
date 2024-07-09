// frontend/src/components/AddRealization.js
import React, { useState } from 'react';
import api from '../api';

const AddRealization = () => {
    const [operationId, setOperationId] = useState('');
    const [workerId, setWorkerId] = useState('');
    const [workstationId, setWorkstationId] = useState('');
    const [machineUsed, setMachineUsed] = useState('');
    const [timeTaken, setTimeTaken] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/realizations', {
                operation_id: operationId,
                worker_id: workerId,
                workstation_id: workstationId,
                machine_used: machineUsed,
                time_taken: timeTaken,
            });
            alert('Realization added successfully');
        } catch (error) {
            console.error('Error adding realization:', error);
            alert('Failed to add realization');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Operation ID</label>
                <input type="number" value={operationId} onChange={(e) => setOperationId(e.target.value)} />
            </div>
            <div>
                <label>Worker ID</label>
                <input type="number" value={workerId} onChange={(e) => setWorkerId(e.target.value)} />
            </div>
            <div>
                <label>Workstation ID</label>
                <input type="number" value={workstationId} onChange={(e) => setWorkstationId(e.target.value)} />
            </div>
            <div>
                <label>Machine Used</label>
                <input type="text" value={machineUsed} onChange={(e) => setMachineUsed(e.target.value)} />
            </div>
            <div>
                <label>Time Taken</label>
                <input type="number" value={timeTaken} onChange={(e) => setTimeTaken(e.target.value)} />
            </div>
            <button type="submit">Add Realization</button>
        </form>
    );
};

export default AddRealization;
