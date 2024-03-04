const mongoose = require('mongoose')

const Employee = new mongoose.Schema({
    Employee_id: {type: String, required: true, unique: true},
    Employee_name: {type: String, required: true}, 
    Employee_phone: {type: String, required: true},
    Position: {type: String, required: true}
},
{collection: 'employee-data'}
)

module.exports = mongoose.model('EmployeeData', Employee); 