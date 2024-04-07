import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../../utils/constant';
import Modal from 'react-modal';

// Create a new Modal instance
Modal.setAppElement('#root');

export const EditModal = ({employee, onConfirm, isOpen, onRequestClose }) => {

    // const [image, setImage] = useState(product?.image || '');
    // const [newImage, setNewImage] = useState(null); // State to store the new image file
    const [FirstName, setFirstName] = useState(employee?.FirstName || '');
    const [LastName, setLastName] = useState(employee?.LastName || '');
    const [Position, setPosition] = useState(employee?.Position || '');
    const [Department, setDepartment] = useState(employee?.Department || '');
    const [HireDate, setHireDate] = useState(employee?.HireDate || '');
    const [Salary, setSalary] = useState(employee?.Salary || '');
    const [isSubmitting, setIsSubmitting] = useState(false); // Add state for tracking form submission


    
    // Function to format the date as "yyyy-mm-dd" for the input
    const formatDate = (inputDate) => {
      const dateObject = new Date(inputDate);
      return dateObject.toISOString().split('T')[0];
    };

    // Function to unformat the date back to the original format
    const unformatDate = (formattedDate) => {
      return new Date(formattedDate).toISOString();
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true); // Set isSubmitting to true when form is submitted
  
      try {
        const updatedEmployees = {
            FirstName,
            LastName,
            Position,
            Department,
            HireDate: unformatDate(HireDate), // Unformat createdAt date before sending
            Salary,
        };
  
        const response = await axios.put(`${baseUrl}/api/updateEmployee/${employee._id}`, updatedEmployees);
  
        console.log('Employee updated successfully:', response.data);
        onConfirm(); // Call onConfirm to close the modal or perform additional actions
        window.location.reload();
      } catch (error) {
        console.error('Error updating Employee by ID:', error);
        // Handle the error as needed
        // You can show an error message to the user or log specific details
      }finally {
        setIsSubmitting(false); // Reset isSubmitting to false after form submission
      }
    };

    useEffect(() => {
      // Update the state when the transaction prop changes
      // setImage(product?.newImage || product?.image);
      setFirstName(employee?.FirstName || '');
      setLastName(employee?.LastName || '');
      setPosition(employee?.Position || '');
      setDepartment(employee?.Department || '');
      setHireDate(employee?.HireDate ? formatDate(employee.HireDate) : ''); // Format createdAt date
      setSalary(employee?.Salary || '');
    }, [employee]);
  
    if (!employee) {
      // If transaction is null, you can choose to render an error message or return null
      return null;
    }

    return (
        <Modal
            id="editModal"
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
                                  Update Employee
                                </h4>
                            </div>
                            <div className="modal-body" style={{padding: '30px'}}>			
                                {/* <div className="form-group" style={{marginBottom:'10px'}}>
                                    <label style={{display: 'block', marginBottom:'3px', fontWeight:'bold'}}>
                                        Image
                                    </label>
                                <div style={{marginBottom:'10px', display:'flex'}}>
                                    <img src={product.image} alt="Product" style={{ width: '80px', height: '80px' }} />
                                    <input 
                                        type="file" 
                                        className="form-control" 
                                        style={{ borderRadius: '5px', border: '1px solid #ccc', padding: '8px'}} 
                                        onChange={handleImageChange}
                                        accept="image/*"
                                    />
                                </div>
                                </div> */}
                                <div className="form-group" style={{marginBottom:'10px'}}>
                                    <label style={{display: 'block', marginBottom:'3px', fontWeight:'bold'}}>
                                        Name
                                    </label>
                                    <input 
                                      type="text" 
                                      placeholder="Hanan Ramos"
                                      className="form-control"  
                                      style={{ borderRadius: '5px', border: '1px solid #ccc', width: '100%', padding: '8px'}} 
                                      value={`${FirstName} ${LastName}`}  
                                      onChange={(e) => {
                                        const fullName = e.target.value.split(' ');
                                        setFirstName(fullName[0]);
                                        setLastName(fullName[1]);
                                    }}
                                      required
                                    />
                                </div>
                                <div className="form-group"  style={{marginBottom:'10px'}}>
                                    <label style={{display: 'block', marginBottom:'3px', fontWeight:'bold'}}>
                                    Position
                                    </label>
                                    <input 
                                      type="text" 
                                      placeholder= "Enter Position" 
                                      className="form-control"  
                                      style={{ borderRadius: '5px', border: '1px solid #ccc', width: '100%', padding: '8px'}} 
                                      value={Position} 
                                      onChange={(e) => setPosition(e.target.value)} 
                                      required
                                    />
                                </div>
                                <div className="form-group"  style={{marginBottom:'10px'}}>
                                    <label style={{display: 'block', marginBottom:'3px', fontWeight:'bold'}}>
                                    Department
                                    </label>
                                    <input 
                                      type="text" 
                                      placeholder= "Enter Department" 
                                      className="form-control"  
                                      style={{ borderRadius: '5px', border: '1px solid #ccc', width: '100%', padding: '8px'}}  
                                      value={Department} 
                                      onChange={(e) => setDepartment(e.target.value)} 
                                      required
                                    />
                                </div>
                                <div className="form-group"  style={{marginBottom:'10px'}}>
                                    <label style={{display: 'block', marginBottom:'3px', fontWeight:'bold'}}>
                                    Hire Date
                                    </label>
                                    <input 
                                      type="Date" 
                                      placeholder= "Enter Date" 
                                      className="form-control"  
                                      style={{ borderRadius: '5px', border: '1px solid #ccc', width: '100%', padding: '8px'}}  
                                      value={HireDate} 
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
                                    value={Salary} 
                                    style={{ borderRadius: '5px', border: '1px solid #ccc', width: '100%', padding: '8px'}} 
                                    onChange={(e) => setSalary(e.target.value)} 
                                    required
                                />
                                </div>
                              </div>
                              <div className="modal-footer" style={{display:'flex', justifyContent: 'end', backgroundColor: '#E7E7E3', borderRadius: '0 0 15px 15px', padding: '15px', gap: '9px'}}>
                                  <button 
                                    type="button"
                                    className="btn btn-default"  
                                    onClick={onRequestClose} style={{borderRadius: '5px', minWidth:'100px', border: 'none',  backgroundColor: '#003F62', color: 'white', padding: '6px', cursor: 'pointer'}}>
                                      
                                    Cancel
                                  </button>
                                  <button 
                                      type="button" // Specify type="button" to prevent form submission
                                      className="btn btn-success" 
                                      style={{ borderRadius: '5px', minWidth: '100px', border: 'none', backgroundColor: '#003F62', color: 'white', padding: '8px', cursor: 'pointer' }}
                                      onClick={handleSubmit} // Call handleSubmit function on button click
                                  >
                                      {isSubmitting ? 'Updating...' : 'Update'}
                                  </button>
                              </div>
                        </form>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
