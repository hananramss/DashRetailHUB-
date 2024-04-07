const Employee = require("../model/employeesModel")


const getAllEmployees = async (req, res) => {
    try {
        console.log("Handling getAllEmployees request");
        const employee = await Employee.find();
        res.json(employee);
    } catch (err) {
        console.error("Error in getAllEmployees:", err);
        res.status(500).json({
            err: "Internal Server Error",
            details: err.message 
        });
    }
};

const createEmployee = async (req, res) => {
    try { 
        console.log("Request Body:", req.body);
        const newEmployee = await Employee.create(req.body);
        res.status(201).json(newEmployee);
    } catch(err) {
        res.status(500).json ({
            err: "Internal Server Error",
            details: err.message 
        });
    }
};

const updateEmployeeById = async (req, res) => {
    try {
        const updateEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new : true}
        );
        res.json(updateEmployee);
    }catch (err) {
        res.status(500).json ({
            err: "Internal Server Error",
            details: err.message 
        });
    }
};

const deleteEmployeeById = async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
        res.json(deletedEmployee)
    } catch (err) {
        res.status(500).json ({
            err: "Internal Server Error",
            details: err.message 
        });
    } 
};

module.exports = {
    getAllEmployees,
    createEmployee,
    updateEmployeeById,
    deleteEmployeeById,
}