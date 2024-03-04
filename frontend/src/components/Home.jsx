import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UilTrashAlt } from '@iconscout/react-unicons';
import { UilEditAlt } from '@iconscout/react-unicons';
import './home.css'

function Home() {
  const [employees, setEmployees] = useState([]);
  const [editableEmployee, setEditableEmployee] = useState(null);
  const [newEmployeeVisible, setNewEmployeeVisible] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    Employee_id: '',
    Employee_name: '',
    Employee_phone: '',
    Position: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`http://localhost:5000/employees/${_id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleEdit = (_id) => {
    const employeeToEdit = employees.find(employee => employee._id === _id);
    setEditableEmployee(employeeToEdit);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/employees/${editableEmployee._id}`, editableEmployee);
      setEditableEmployee(null);
      fetchData(); 
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableEmployee(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddNewEmployee = async () => {
    try {
      await axios.post('http://localhost:5000/employees', newEmployee);
      setNewEmployee({
        Employee_id: '',
        Employee_name: '',
        Employee_phone: '',
        Position: ''
      });
      fetchData(); 
    } catch (error) {
      console.error('Error adding new employee:', error);
    }
  };

  const handleNewEmployeeInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
<div className="table-wrap">      
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.Employee_id}</td>
              <td>{editableEmployee && editableEmployee._id === employee._id ? 
                <input className='input' type="text" name="Employee_name" value={editableEmployee.Employee_name} onChange={handleInputChange} /> : employee.Employee_name}</td>
              <td>{editableEmployee && editableEmployee._id === employee._id ? 
                <input className='input'type="text" name="Employee_phone" value={editableEmployee.Employee_phone} onChange={handleInputChange} /> : employee.Employee_phone}</td>
              <td>{editableEmployee && editableEmployee._id === employee._id ? 
                <input className='input' type="text" name="Position" value={editableEmployee.Position} onChange={handleInputChange} /> : employee.Position}</td>
              <td td className="icons">
                {editableEmployee && editableEmployee._id === employee._id ? 
                  <button className='button' onClick={handleSave}>Save</button> :
                  <>
                    <UilEditAlt
                      size="20"
                      onClick={() => handleEdit(employee._id)}
                      style={{ cursor: 'pointer' }}
                    />
                    <UilTrashAlt
                      size="20"
                      onClick={() => handleDelete(employee._id)}
                      style={{ cursor: 'pointer' }}
                    />
                  </>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div >
      <button className='button' onClick={() => setNewEmployeeVisible(!newEmployeeVisible)}>
        {newEmployeeVisible ? 'Hide Add Employee Form' : 'Add New Employee'}
      </button>
      {newEmployeeVisible && (
        <div className='employee'>
          <form onSubmit={handleAddNewEmployee}>
          <label>
            Emp ID:
            <input className='input' type="text" name="Employee_id" value={newEmployee.Employee_id} onChange={handleNewEmployeeInputChange} />
          </label>
          <label>
            Name:
            <input className='input' type="text" name="Employee_name" value={newEmployee.Employee_name} onChange={handleNewEmployeeInputChange} />
          </label>
          <label>
            Phone:
            <input className='input' type="text" name="Employee_phone" value={newEmployee.Employee_phone} onChange={handleNewEmployeeInputChange} />
          </label>
          <label>
            Position:
            <input className='input' type="text" name="Position" value={newEmployee.Position} onChange={handleNewEmployeeInputChange} />
          </label>
          <button className='button' type="submit">Add Employee</button>
        </form>
        </div>
      )}
      </div>
    </div>
  );
}

export default Home;
