import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../../utils/constant';
import Modal from 'react-modal';

// Create a new Modal instance
Modal.setAppElement('#root');

export const EditModal = ({product, onConfirm, isOpen, onRequestClose }) => {

    // const [image, setImage] = useState(product?.image || '');
    // const [newImage, setNewImage] = useState(null); // State to store the new image file
    const [title, setTitle] = useState(product?.title || '');
    const [color, setColor] = useState(product?.color || '');
    const [pricePHP, setPricePHP] = useState(product?.pricePHP || '');
    const [producer, setProducer] = useState(product?.producer || '');
    const [createdAt, setCreatedAt] = useState(product?.createdAt || '');
    const [inStock, setInStock] = useState(product?.inStock || false);
    // const [isChecked, setIsChecked] = useState(product?.inStock || false);
    const [showModal, setShowModal] = useState(false);
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

  //   // Function to handle image change
  //   const handleImageChange = (e) => {
  //     const file = e.target.files[0]; // Get the selected file
  //     if (file) {
  //         const reader = new FileReader();
  //         reader.onloadend = () => {
  //             setImage(reader.result); // Update the image state with the new image
  //             setNewImage(file); // Save the new image file
  //         };
  //         reader.readAsDataURL(file); // Read the file as data URL
  //     }
  // };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true); // Set isSubmitting to true when form is submitted
  
      try {
        const updatedProduct = {
          title,
          color,
          pricePHP,
          producer,
          createdAt: unformatDate(createdAt), // Unformat createdAt date before sending
          inStock,
        };
  
        const response = await axios.put(`${baseUrl}/api/updateProducts/${product._id}`, updatedProduct);
  
        console.log('Product updated successfully:', response.data);
        onConfirm(); // Call onConfirm to close the modal or perform additional actions
        window.location.reload();
      } catch (error) {
        console.error('Error updating Product by ID:', error);
        // Handle the error as needed
        // You can show an error message to the user or log specific details
      }finally {
        setIsSubmitting(false); // Reset isSubmitting to false after form submission
      }
    };

    useEffect(() => {
      // Update the state when the transaction prop changes
      // setImage(product?.newImage || product?.image);
      setTitle(product?.title || '');
      setColor(product?.color || '');
      setPricePHP(product?.pricePHP || '');
      setProducer(product?.producer || '');
      setCreatedAt(product?.createdAt ? formatDate(product.createdAt) : ''); // Format createdAt date
      setInStock(product?.inStock || '');
    }, [product]);
  
    if (!product) {
      // If transaction is null, you can choose to render an error message or return null
      return null;
    }

     // Function to handle checkbox change
    const handleCheckboxChange = (event) => {
      setInStock(!inStock); // Toggle inStock state
    };

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
                                  Update Product
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
                                      Title
                                    </label>
                                    <input 
                                      type="text" 
                                      placeholder= "Enter Title" 
                                      className="form-control"  
                                      style={{ borderRadius: '5px', border: '1px solid #ccc', width: '100%', padding: '8px'}} 
                                      value={title}  
                                      onChange={(e) => setTitle(e.target.value)} 
                                      required
                                    />
                                </div>
                                <div className="form-group"  style={{marginBottom:'10px'}}>
                                    <label style={{display: 'block', marginBottom:'3px', fontWeight:'bold'}}>
                                      Color
                                    </label>
                                    <input 
                                      type="text" 
                                      placeholder= "Enter Color" 
                                      className="form-control"  
                                      style={{ borderRadius: '5px', border: '1px solid #ccc', width: '100%', padding: '8px'}} 
                                      value={color} 
                                      onChange={(e) => setColor(e.target.value)} 
                                      required
                                    />
                                </div>
                                <div className="form-group"  style={{marginBottom:'10px'}}>
                                    <label style={{display: 'block', marginBottom:'3px', fontWeight:'bold'}}>
                                      Price
                                    </label>
                                    <input 
                                      type="number" 
                                      placeholder= "Enter Price" 
                                      className="form-control"  
                                      style={{ borderRadius: '5px', border: '1px solid #ccc', width: '100%', padding: '8px'}}  
                                      value={pricePHP} 
                                      onChange={(e) => setPricePHP(e.target.value)} 
                                      required
                                    />
                                </div>
                                <div className="form-group"  style={{marginBottom:'10px'}}>
                                    <label style={{display: 'block', marginBottom:'3px', fontWeight:'bold'}}>
                                      Producer
                                    </label>
                                    <input 
                                      type="text" 
                                      placeholder= "Enter Producer" 
                                      className="form-control"  
                                      style={{ borderRadius: '5px', border: '1px solid #ccc', width: '100%', padding: '8px'}} 
                                      value={producer}
                                      onChange={(e) => setProducer(e.target.value)} 
                                      required
                                    />
                                </div>
                                <div className="form-group"  style={{marginBottom:'10px'}}>
                                    <label style={{display: 'block', marginBottom:'3px', fontWeight:'bold'}}>
                                      CreatedAt
                                    </label>
                                    <input 
                                      type="Date" 
                                      placeholder= "Enter Date" 
                                      className="form-control"  
                                      style={{ borderRadius: '5px', border: '1px solid #ccc', width: '100%', padding: '8px'}}  
                                      value={createdAt} 
                                      onChange={(e) => setCreatedAt(e.target.value)} 
                                      required
                                    />
                                </div>
                                  <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
                                    Stock Availability
                                  </label>
                                  <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input
                                        type="checkbox"
                                        id="stockCheckbox"
                                        checked={inStock} // Reflect the value of inStock directly
                                        className="form-control"
                                        onChange={handleCheckboxChange} // Handle checkbox change
                                    />
                                    <label htmlFor="stockCheckbox" style={{ marginLeft: '5px' }}>In stock</label>
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
