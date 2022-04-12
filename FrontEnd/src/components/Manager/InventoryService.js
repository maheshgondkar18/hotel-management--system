import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'

import authHeader from "../../services/auth-header";
const config = require("../../common/config.json")

export const InventoryService = () => {

    const url = config.InventoryUrl
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm()

    // Hook To get Emp Data From API
    const [inventoryData, setinventoryData] = useState([])

    // Hook To Check in which from needs to display
    // if isEdit === True => send data to onEditFormSubmit() [ Put Method ]
    // if isEdit === False => send data to onFormSubmit() [ Post Method ]
    const [isEdit, setIsEdit] = useState([false])


    // Get Method to Fetch Data From API
    const getInventory = () => {
        axios.get(`${url}/get`,{ headers: authHeader() })
            .then(response => {
                console.log(response.data)
                setinventoryData(response.data)
            })
    }

    // Method to Upload data on server
    const onFormSubmit = (inventory) => {
        axios.post(`${url}/add`, inventory, { headers: authHeader() })
            .then(response => {
                console.log(inventory)
                getInventory()
                reset()
            })
    }

    // Method to Edit Data On Server
    const onEditFormSubmit = (inventory) => {
        axios.patch(`${url}/update/${localStorage.getItem("pid")}`, inventory)
            .then(response => {
                getInventory()
                reset()
            })

        setIsEdit(false)
    }

    // Method to set isEdit = True and fetch specific emp w.r.t id and add values fetch from api to form
    const editForm = (pid) => {
        setIsEdit(true)

        localStorage.setItem("pid", pid)
        axios.get(`${url}/get/${pid}`)
            .then(response => {
                console.log(response.data)
                setValue("pid", response.data.pid)
                setValue("pname", response.data.pname)
                setValue("pquantity", response.data.pquantity)
            })
    }

    // Method to Delete Employee on Server
    const deleteForm = (pid) => {
        axios.delete(`${url}/delete/${pid}`)
            .then(response => {
                alert(`Product from Inventory ${pid} Successfully Deleted...`)
                getInventory()
            })
    }

    // Method to Filter By Name
    const search = (event) => {
        // Data is converted into lower case and check with given input
        setinventoryData(inventoryData.filter(inventory => inventory.pid.search(event.target.value) > -1))
        
        // Search query length = 0 then reset filtered data
        if (event.target.value.length === 0)
            resetFilter()
    }


    const resetFilter = () => {
        getInventory()
    }

    useEffect(() => {
        getInventory()
    }, [])


    return (
        <>
            <div className="row" style={{ marginTop: "10px" }}>
                <div className="col col-md-4">
                    <div className="card shadow bg-warning-50" style={{ width: "98%", margin: "2%" }}>
                        <div className="card-header text-center">
                            Add Product
                        </div>
                        <div className="card-body">
                            <blockquote className="blockquote mb-0">
                                <form onSubmit={handleSubmit(isEdit === true ? onEditFormSubmit : onFormSubmit)}>
                                    <div className="mb-3">
                                        <label htmlFor="productId" className="form-label">Product Id</label>
                                        <input {...register("pid", { required: true, pattern:  /^[0-9]+$/ })} type="text" className="form-control" id="productid" placeholder="Product Id" />
                                        {errors.pid?.type === 'required' && <span className='badge bg-danger'>Product id is Required</span>}
                                        {errors.pid?.type === 'pattern' && <span className='badge bg-danger'>Invalid product id</span>}
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="mb-3">
                                                <label htmlFor="pquantity" className="form-label">Quantity of product</label>
                                                <input {...register("pquantity", { required: true, pattern: /^[0-9]+$/ })} type="number" className="form-control" id="productQuantity" placeholder="Product Quantity" />
                                                {errors.pquantity?.type === 'required' && <span className='badge bg-danger'>Product Quantity is Required</span>}
                                                {errors.pquantity?.type === 'pattern' && <span className='badge bg-danger'>Only Numeric characters are allowed</span>}
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-3">
                                            <label htmlFor="pname" className="form-label">Product Name</label>
                                        <input {...register("pname", { required: true, pattern: /[a-zA-Z]+/ })} type="text" className="form-control" id="productName" placeholder="Product Name" />
                                        {errors.pname?.type === 'required' && <span className='badge bg-danger'>Product Name is Required</span>}
                                        {errors.pname?.type === 'pattern' && <span className='badge bg-danger'>Invalid Employee Name</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        {isEdit === true ? <button type='submit' className='btn btn-info'>Edit</button> : <button type='submit' className='btn btn-success'>Add Product</button>}
                                    </div>
                                </form>
                            </blockquote>
                        </div>
                    </div>
                </div>

                <div className="col">

                    <div className="row" style={{ margin: "2%" }}>
                        <div className="col col-md-9 g-6" >
                            <div class="form-floating">
                                <input type="productId" class="form-control shadow" id="floatingInput" placeholder="Search By Product Name" onChange={search} />
                                <label for="floatingInput">Search By Product Name</label>
                            </div>
                        </div>
                        <div className="col col-md-3 p-6">
                            <button className="btn btn-danger p-3 shadow" onClick={resetFilter} style={{ width: "80%" }}>Reset Filter</button>
                        </div>
                    </div>

                    <div className="card shadow" style={{ width: "93%", margin: "2%" }}>
                        <div className="card-header text-center">
                            Product's
                        </div>
                        <div className="card-body">
                            <blockquote className="blockquote mb-0">
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col col-md-1">Product Id</th>
                                            <th scope="col col-md-3">Product Quantity</th>
                                            <th scope="col col-md-3">Product Name</th>
                                            {/* <th scope="col col-md-3">Number of Bookings</th> */}
                                            {/* <th scope="col col-md-1">Salary</th>
                                            <th scope="col col-md-1">Age</th>
                                            <th scope="col col-md-2">NIC</th>
                                            <th scope="col col-md-2">Occupation</th>
                                            <th scope="col col-md-2">Address</th> */}
                                            <th scope="col col-md-2">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            inventoryData.map(inventory => (
                                                <tr key={inventory.pid}>
                                                    <td>{inventory.pid}</td>
                                                    <td>{inventory.pquantity}</td>
                                                    <td>{inventory.pname}</td>
                                                    {/* <td>{ room.reservation.length }</td> */}
                                                    {/* <td>{emp.employeeSalary}</td>
                                                    <td>{emp.employeeAge}</td>
                                                    <td>{emp.employeeNIC}</td>
                                                    <td>{emp.employeeOccupation}</td>
                                                    <td>{emp.employeeAddress}</td> */}
                                                    <td>
                                                        <button className='btn btn-sm btn-success' onClick={() => editForm(inventory.pid)} >Edit</button>&nbsp;
                                                        <button className='btn btn-sm btn-danger' onClick={() => window.confirm("Are you Sure?") && deleteForm(inventory.pid)}>Delete</button>
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
            </div>
        </>
    )
}