import React, { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../../utils/constant';
import Modal from 'react-modal';

// Create a new Modal instance
Modal.setAppElement('#root');

export const AddModal = ({ isOpen, onRequestClose }) => {

    // const [image, setImage] = useState(null);
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Position, setPosition] = useState('');
    const [Department, setDepartment] = useState('');
    const [HireDate, setHireDate] = useState('');
    const [Salary, setSalary] = useState(0);

    // Function to handle form submission (Add)
    const handleSubmit = (e) => {
        e.preventDefault(); // Add e as a parameter here
        axios.post(`${baseUrl}/api/createEmployee`, {FirstName, LastName, Position, Department, HireDate, Salary})
            .then(res => {
                console.log('API Response:', res.data);
                onRequestClose(); // Close the modal after successful submission
                // You can also refresh the page here if needed
                window.location.reload();
            })
            .catch(err => {
                console.error('Error fetching data:', err);
                // Log specific details of the error
                if (err.response) {
                    // The request was made and the server responded with a status code
                    console.error('Server responded with:', err.response.status, err.response.data);
                } else if (err.request) {
                    // The request was made but no response was received
                    console.error('No response received. Request details:', err.request);
                } else {
                    console.error('Error details:', err.message);
                }
            });
    };

    return (
        <Modal
            id="addModal"
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={{
                overlay: {
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 9999,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                content: {
                    position: 'relative',
                    inset: '0',
                    overflow: '0',
                    borderRadius: '0',
                    outline: 'none',
                    padding: '0',
                    width:'70%',
                    maxWidth: '400px',
                    borderRadius: '15px',
                    background: 'rgb(255, 255, 255)',
                    boxShadow: '0 2px 4px #3e3e3e',
                    color: 'black',
                },
            }}
        >
            <div className="modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form onSubmit={handleSubmit}> 
                            <div className="modal-header">						
                                <h4 className="modal-title" style={{ fontWeight: 'bold', fontSize: '18px', paddingTop: '30px', paddingLeft: '30px'}}>
                                    Add Employee
                                </h4>
                            </div>
                            <div className="modal-body" style={{padding: '30px'}}>					
                                {/* <div className="form-group" style={{marginBottom:'15px'}}>
                                    <label style={{display: 'block', marginBottom:'5px', fontWeight:'bold'}}>
                                        Image
                                    </label>
                                    <input 
                                        type="file" 
                                        className="form-control" 
                                        style={{ borderRadius: '5px', border: '1px solid #ccc', width: '100%', padding: '8px'}} 
                                        onChange={(e) => handleImageChange(e)} 
                                        required
                                    />
                                </div> */}
                                <div className="form-group" style={{marginBottom:'15px'}}>
                                    <label style={{display: 'block', marginBottom:'5px', fontWeight:'bold'}}>
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Hanan Ramos"
                                        className="form-control"
                                        style={{ borderRadius: '5px', border: '1px solid #ccc', width: '100%', padding: '8px' }}
                                        onChange={(e) => {
                                            const fullName = e.target.value.split(' ');
                                            setFirstName(fullName[0]);
                                            setLastName(fullName[1]);
                                        }}
                                        required
                                    />
                                </div>
                                <div className="form-group"  style={{marginBottom:'15px'}}>
                                    <label style={{display: 'block', marginBottom:'5px', fontWeight:'bold'}}>
                                        Position
                                    </label>
                                    <input 
                                        type="text" 
                                        placeholder= "Enter Position" 
                                        className="form-control"  
                                        style={{ borderRadius: '5px', border: '1px solid #ccc', width: '100%', padding: '8px'}} 
                                        onChange={(e) => setPosition(e.target.value)} 
                                        required
                                    />
                                </div>
                                <div className="form-group"  style={{marginBottom:'15px'}}>
                                    <label style={{display: 'block', marginBottom:'5px', fontWeight:'bold'}}>
                                        Department
                                    </label>
                                    <input 
                                    type="text" 
                                    placeholder= "Enter Department" 
                                    className="form-control"  
                                    style={{ borderRadius: '5px', border: '1px solid #ccc', width: '100%', padding: '8px'}} 
                                    onChange={(e) => setDepartment(e.target.value)} 
                                    required
                                />
                                </div>
                                <div className="form-group"  style={{marginBottom:'15px'}}>
                                    <label style={{display: 'block', marginBottom:'5px', fontWeight:'bold'}}>
                                        Hire Date
                                    </label>
                                    <input 
                                        type="Date" 
                                        placeholder= "Enter Date" 
                                        className="form-control"  
                                        style={{ borderRadius: '5px', border: '1px solid #ccc', width: '100%', padding: '8px'}}  
                                        onChange={(e) => setHireDate(e.target.value)} 
                                        required
                                    />
                                </div>
                                <div className="form-group"  style={{marginBottom:'15px'}}>
                                    <label style={{display: 'block', marginBottom:'5px', fontWeight:'bold'}}>
                                        Salary
                                    </label>
                                    <input 
                                    type="number" 
                                    placeholder= "Enter Salary" 
                                    className="form-control"  
                                    style={{ borderRadius: '5px', border: '1px solid #ccc', width: '100%', padding: '8px'}} 
                                    onChange={(e) => setSalary(e.target.value)} 
                                    required
                                />
                                </div>
                            </div>
                            <div className="modal-footer" style={{display:'flex', justifyContent: 'end', backgroundColor: '#E7E7E3', borderRadius: '0 0 15px 15px', padding: '15px', gap: '9px'}}>
                                <button type="button" className="btn btn-default"  onClick={onRequestClose} style={{borderRadius: '5px', minWidth:'100px', border: 'none',  backgroundColor: '#003F62', color: 'white', padding: '6px', cursor: 'pointer'}}>Cancel</button>
                                <button type="submit" className="btn btn-success" style={{borderRadius: '5px', minWidth:'100px',  border: 'none', backgroundColor: '#003F62', color: 'white', padding: '8px', cursor: 'pointer', ':hover': {backgroundColor: '#5E92A3'}}}>Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
