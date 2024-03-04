const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const jwtSecret = 'secret123'
const Collection = require("./user");
const Employee = require("./employee")

mongoose.connect('mongodb+srv://sahil:sahil@flight.vdrclkj.mongodb.net/login', { useNewUrlParser: true })

app.use(cors())
app.use(express.json())

app.post('/register', async (req, res) => {
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10);
        const collection = await Collection.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword,
        })

        res.json({ status: 'ok' });
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'Duplicate email' });
    }
})

app.post('/login', async (req, res) => {
    const newPassword = bcrypt.hash(req.body.password, 10)

    const collection = await Collection.findOne({
        email: req.body.email,
    })
    if (!collection) {
        return res.json({ 
            status: 'error', 
            error: 'Invalid Email' 
        })
    }

    const isPasswordValid = await bcrypt.compare(
        req.body.password, 
        collection.password
    );

    if (isPasswordValid) {
        const token = jwt.sign({
            name: collection.name,
            email: collection.email,
        }, jwtSecret);

        return res.json({ status: 'ok', collection: token });
    } else {
        return res.json({ status: 'error', collection: false });
    }
})


app.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    console.error('Error getting employees:', err);
    res.send('Internal Server Error');
  }
});

  

  app.get('/employees/:id', async (req, res) => {
    try {
      const employee = await Employee.findById(req.params.id);
      if (!employee) {
        res.send('Employee not found');
        return;
      }
      res.json(employee);
    } catch (err) {
      console.error('Error getting employee:', err);
      res.send('Internal Server Error');
    }
  });
  

  app.post('/employees', async (req, res) => {
    try {
      const newEmployee = new Employee(req.body);
      const savedEmployee = await newEmployee.save();
      res.send(savedEmployee);
    } catch (err) {
      console.error('Error adding employee:', err);
      res.send('Internal Server Error');
    }
  });
  

  app.put('/employees/:id', async (req, res) => {
    try {
      const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedEmployee) {
        res.send('Employee not found');
        return;
      }
      res.send(updatedEmployee);
    } catch (err) {
      console.error('Error updating employee:', err);
      res.send('Internal Server Error');
    }
  });
  
  // Delete employee
  app.delete('/employees/:id', async (req, res) => {
    try {
      const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
      if (!deletedEmployee) {
        res.send('Employee not found');
        return;
      }
      res.send('Employee deleted successfully');
    } catch (err) {
      console.error('Error deleting employee:', err);
      res.send('Internal Server Error');
    }
  });


app.listen(5000, (req, res) => {
    console.log("Server started on port", 5000);
})


