import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../utils/constant';
import { PlusCircleFilled, SearchOutlined, CheckCircleFilled, CloseCircleFilled, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ReactPaginate from 'react-paginate';
import { AddModal } from '../Modal/Employee/AddModal';
import { EditModal } from '../Modal/Employee/EditModal';
import { DeleteModal } from '../Modal/Employee/DeleteModal';


export const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); 
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/getAllEmployees`)
      .then((res) => {
        console.log('API Response:', res.data);
        setEmployees(res.data);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        // Handle errors accordingly
      });
  }, []);

// Function to handle searching
const handleSearch = (event) => {
  setSearchTerm(event.target.value);
};

 // Handle click on update button
 const handleUpdateButtonClick = (employee) => {
  // Pass the entire transaction object to ensure all properties are available
  setSelectedEmployee(employee);
};

// Handle confirmation after updating
const handleUpdateConfirm = () => {
  // After deletion is successful, you can reset the selectedTransactionId and close the modal
  setSelectedEmployeeId(null);
};


// Filter data based on the search term
const filteredData = data.filter((employee) => {
const HireDate = new Date(employee.HireDate);
const searchTermLowerCase = searchTerm.toLowerCase();

// Extracting the month name from the date
const monthName = HireDate.toLocaleString('en-US', { month: 'long' }).toLowerCase();

return (
  employee.FirstName.toLowerCase().includes(searchTermLowerCase) ||
  employee.LastName.toLowerCase().includes(searchTermLowerCase) ||
  employee.Position.toString().includes(searchTermLowerCase) || // Removed unnecessary toLowerCase() conversion
  employee.Department.toLowerCase().includes(searchTermLowerCase) ||
  employee.Salary.toLowerCase().includes(searchTermLowerCase) ||
  monthName.includes(searchTermLowerCase)
);
});

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentemployee = employees
    .filter((employee) => employee.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(indexOfFirstItem, indexOfLastItem);

  const pageCount = Math.ceil(employees.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  return (
    <div className="products">
      <div className="title">
        <span>Employees</span>
      </div>
      <div className="content">
        <div className="table-responsive">
          <div className="table-wrapper">
          <div className="AddSearch">
            <button  href="#addModal"className="btn" onClick={() => setShowAddModal(true)}><PlusCircleFilled className="plus-icon"/> Add Employee</button>
            <div className="search-bar">
              <input type="text" className="form-control" placeholder="Search" onChange={handleSearch}/>
              <SearchOutlined className="search-icon"/>
            </div>
          </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  {/* <th>Image</th> */}
                  <th>Name</th>
                  <th>Position</th>
                  <th>Department</th>
                  <th>Hire Date</th>
                  <th>Salary</th>
                  <th className="expand">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentemployee.map((employee, index) => (
                  <tr key={index}>
                    <td>{indexOfFirstItem + index + 1}</td>
                    {/* <td>
                      {employee.image ? (
                        <img src={employee.image} alt="Product" style={{ width: '50px', height: '50px' }} />
                      ) : null}
                    </td> */}
                    <td>{employee.FirstName} {employee.LastName}</td>
                    <td>{employee.Position}</td>
                    <td>{employee.Department}</td>
                    <td>{new Date(employee.HireDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</td>
                    <td>{employee.Salary}</td>                    <td>
                      <button href="#editModal" className="icon-btn" onClick={() => { setSelectedEmployee(employee); setShowEditModal(true); }}>
                        <EditOutlined className="icon" />
                      </button>
                      <button href="#deleteModal" className="icon-btn" onClick={() => { setSelectedEmployee(employee); setShowDeleteModal(true); }}>
                        <DeleteOutlined className="icon" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>  
          </div>
        </div>
      </div>

      {/* Pagination */}
      <ReactPaginate
        pageCount={Math.ceil(filteredData.length / itemsPerPage)}
        marginPagesDisplayed={1}
        previousLabel="Previous"
        nextLabel="Next"
        breakLabel="..."
        onPageChange={handlePageChange}
        containerClassName="pagination"
        activeClassName="active"
        pageClassName="page-item"
        previousClassName="page-item"
        nextClassName="page-item"
        pageLinkClassName="page-link"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
      />

      
      {/* Modals */}
      <AddModal 
        isOpen={showAddModal} 
        onRequestClose={() => setShowAddModal(false)} 
      />

      <EditModal 
        product={selectedProduct} 
        onConfirm={handleUpdateConfirm}  
        isOpen={showEditModal} 
        onRequestClose={() => setShowEditModal(false)} 
      />

      <DeleteModal 
        product={selectedProduct} 
        onConfirm={handleUpdateConfirm}  
        isOpen={showDeleteModal} 
        onRequestClose={() => setShowDeleteModal(false)} 
      />

    </div>
  );
};