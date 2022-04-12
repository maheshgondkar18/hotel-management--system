import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'

import authHeader from "../../services/auth-header";
const config = require("../../common/config.json")

export default function StaffService() {
    const baseUrl = 'https://6172515561ed900017c40752.mockapi.io/Employee'

    const url = config.StaffUrl
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm()

    // Hook To get Emp Data From API
    const [EmpData, setEmpData] = useState([])

    // Hook To Check in which from needs to display
    // if isEdit === True => send data to onEditFormSubmit() [ Put Method ]
    // if isEdit === False => send data to onFormSubmit() [ Post Method ]
    const [isEdit, setIsEdit] = useState([false])


    // Get Method to Fetch Data From API
    const getEmployees = () => {
        axios.get(`${url}/get`)
            .then(response => {
                console.log(response.data)
                setEmpData(response.data)
            })
    }

    // Method to Upload data on server
    const onFormSubmit = (emp) => {
        axios.post(`${url}/add`, emp, { headers: authHeader() })
            .then(response => {
                console.log(emp)
                getEmployees()
                reset()
            })
    }

    // Method to Edit Data On Server
    const onEditFormSubmit = (emp) => {
        axios.patch(`${url}/update/${localStorage.getItem("id")}`, emp)
            .then(response => {
                getEmployees()
                reset()
            })

        setIsEdit(false)
    }

    // Method to set isEdit = True and fetch specific emp w.r.t id and add values fetch from api to form
    const editForm = (id) => {
        setIsEdit(true)

        localStorage.setItem("id", id)
        axios.get(`${url}/get/${id}`)
            .then(response => {
                console.log(response.data)
                setValue("employeeName", response.data.employeeName)
                setValue("employeeSalary", response.data.employeeSalary)
                setValue("employeeAge", response.data.employeeAge)
                setValue("employeeNIC", response.data.employeeNIC)
                setValue("employeeCode", response.data.employeeCode)

                setValue("employeeAddress", response.data.employeeAddress)
                setValue("employeeEmail", response.data.employeeEmail)
                setValue("employeeOccupation", response.data.employeeOccupation)
            })
    }

    // Method to Delete Employee on Server
    const deleteForm = (id) => {
        axios.delete(`${url}/delete/${id}`)
            .then(response => {
                alert(`Employee ${id} Successfully Deleted...`)
                getEmployees()
            })
    }

    // Method to Filter By Name
    const search = (event) => {
        // Data is converted into lower case and check with given input
        setEmpData(EmpData.filter(emp => emp.employeeName.toLowerCase().search(event.target.value.toLowerCase()) > -1))
        
        // Search query length = 0 then reset filtered data
        if (event.target.value.length === 0)
            resetFilter()
    }


    const resetFilter = () => {
        getEmployees()
    }

    useEffect(() => {
        getEmployees()
    }, [])


    return (
        <>
            <div className="row" style={{ marginTop: "10px" }}>
                <div className="col col-md-4">
                    <div className="card shadow bg-warning-50" style={{ width: "98%", margin: "2%",  backgroundColor:"rgba(255,255,255,0.8)" }}>
                        <div className="card-header text-center">
                            Add Staff
                        </div>
                        <div className="card-body">
                            <blockquote className="blockquote mb-0">
                                <form onSubmit={handleSubmit(isEdit === true ? onEditFormSubmit : onFormSubmit)}>
                                    <div className="mb-3">
                                        <label htmlFor="staffName" className="form-label">Employee Name</label>
                                        <input {...register("employeeName", { required: true, pattern: /[a-zA-Z]+/ })} type="text" className="form-control" id="staffName" placeholder="Employee Name" />
                                        {errors.employeeName?.type === 'required' && <span className='badge bg-danger'>Employee Name is Required</span>}
                                        {errors.employeeName?.type === 'pattern' && <span className='badge bg-danger'>Invalid Employee Name</span>}
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="mb-3">
                                                <label htmlFor="EmpSalInp" className="form-label">Salary</label>
                                                <input {...register("employeeSalary", { required: true, pattern: /^[0-9]+$/ })} type="number" className="form-control" id="EmpSalInp" placeholder="Employee Salary" />
                                                {errors.employeeSalary?.type === 'required' && <span className='badge bg-danger'>Employee Salary is Required</span>}
                                                {errors.employeeSalary?.type === 'pattern' && <span className='badge bg-danger'>Only Numeric characters are allowed</span>}
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-3">
                                                <label htmlFor="EmpAgeInp" className="form-label">Age</label>
                                                <input {...register("employeeAge", { required: true, pattern: /^[0-9]+$/ })} type="number" className="form-control" id="EmpAgeInp" placeholder="Employee Age" />
                                                {errors.employeeAge?.type === 'required' && <span className='badge bg-danger'>Employee Age is Required</span>}
                                                {errors.employeeAge?.type === 'pattern' && <span className='badge bg-danger'>Only Numeric characters are allowed</span>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className="col">
                                            <div className="mb-3">
                                                <label htmlFor="employeeNIC" className="form-label">NIC</label>
                                                <input {...register("employeeNIC", { required: true, pattern: /[a-zA-Z]+/ })} type="text" className="form-control" id="employeeNIC" placeholder="Employee NIC" />
                                                {errors.employeeNIC?.type === 'required' && <span className='badge bg-danger'>Employee NIC is Required</span>}
                                                {errors.employeeNIC?.type === 'pattern' && <span className='badge bg-danger'>Only Numeric characters are allowed</span>}
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-3">
                                                <label htmlFor="employeeCode" className="form-label">Code</label>
                                                <input {...register("employeeCode", { required: true, pattern: /^[0-9]+$/ })} type="number" className="form-control" id="employeeCode" placeholder="Employee Code" />
                                                {errors.employeeCode?.type === 'required' && <span className='badge bg-danger'>Employee NIC is Required</span>}
                                                {errors.employeeCode?.type === 'pattern' && <span className='badge bg-danger'>Only Numeric characters are allowed</span>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className="col">
                                            <div className="mb-3">
                                                <label htmlFor="employeeOccupation" className="form-label">Occupation</label>
                                                <input {...register("employeeOccupation", { required: true, pattern: /[a-zA-Z]+/ })} type="text" className="form-control" id="employeeOccupation" placeholder="Employee Occupation" />
                                                {errors.employeeOccupation?.type === 'required' && <span className='badge bg-danger'>Employee Occupation is Required</span>}
                                                {errors.employeeOccupation?.type === 'pattern' && <span className='badge bg-danger'>Only Numeric characters are allowed</span>}
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-3">
                                                <label htmlFor="employeeEmail" className="form-label">Email</label>
                                                <input {...register("employeeEmail", { required: true })} type="text" className="form-control" id="employeeEmail" placeholder="Employee Email" />
                                                {errors.employeeEmail?.type === 'required' && <span className='badge bg-danger'>Employee Email is Required</span>}
                                            </div>
                                        </div>

                                    </div>
                                    <div className='row'>
                                        <div className="mb-3">
                                            <label htmlFor="employeeAddress" className="form-label">Address</label>
                                            <textarea {...register("employeeAddress", { required: true })} className="form-control" id="employeeAddress" placeholder="Employee Address" />
                                            {errors.employeeAddress?.type === 'required' && <span className='badge bg-danger'>Employee Address is Required</span>}
                                        </div>
                                    </div>
                                    <div>
                                        {isEdit === true ? <button type='submit' className='btn btn-info'>Edit</button> : <button type='submit' className='btn btn-success'>Submit</button>}
                                    </div>
                                </form>
                            </blockquote>
                        </div>
                    </div>
                </div>

                <div className="col">

                    <div className="row" style={{ margin: "2%" }}>
                        <div className="col col-md-9 g-6" >
                            <div className="form-floating">
                                <input type="email" className="form-control shadow" id="floatingInput" placeholder="Search By Employee Name" onChange={search} />
                                <label htmlFor="floatingInput">Search By Employee Name</label>
                            </div>
                        </div>
                        <div className="col col-md-3 p-6">
                            <button className="btn btn-danger p-3 shadow" onClick={resetFilter} style={{ width: "80%" }}>Reset Filter</button>
                        </div>
                    </div>

                    <div className="card shadow" style={{ width: "93%", margin: "2%",  backgroundColor:"rgba(255,255,255,0.8)" }}>
                        <div className="card-header text-center">
                            Employee Table
                        </div>
                        <div className="card-body">
                            <blockquote className="blockquote mb-0">
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col col-md-1">Code</th>
                                            <th scope="col col-md-3">Name</th>
                                            <th scope="col col-md-3">Email</th>
                                            <th scope="col col-md-1">Salary</th>
                                            <th scope="col col-md-1">Age</th>
                                            <th scope="col col-md-2">NIC</th>
                                            <th scope="col col-md-2">Occupation</th>
                                            <th scope="col col-md-2">Address</th>
                                            <th scope="col col-md-2">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            EmpData.map(emp => (
                                                <tr key={emp.id}>
                                                    <td>{emp.employeeCode}</td>
                                                    <td>{emp.employeeName}</td>
                                                    <td>{emp.employeeEmail}</td>
                                                    <td>{emp.employeeSalary}</td>
                                                    <td>{emp.employeeAge}</td>
                                                    <td>{emp.employeeNIC}</td>
                                                    <td>{emp.employeeOccupation}</td>
                                                    <td>{emp.employeeAddress}</td>
                                                    <td>
                                                        <button className='btn btn-sm btn-success' onClick={() => editForm(emp.employeeCode)} >Edit</button>&nbsp;
                                                        <button className='btn btn-sm btn-danger' onClick={() => window.confirm("Are you Sure?") && deleteForm(emp.employeeCode)}>Delete</button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

