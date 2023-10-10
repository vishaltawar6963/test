import React, { useEffect, useState } from 'react'
import useDynamicForm from '../hooks/useDynamicForm'
import { useDispatch, useSelector } from "react-redux"
import { addUser, deleteUser, getUsers, updateUser } from '../redux/adminActions'
import { toast } from 'react-toastify'
import { invalidate } from '../redux/adminSlice'
import useSerialize from '../hooks/useSerialize'
const Dashboard = () => {
    const [selectedUser, setSelectedUser] = useState({})
    const dispatch = useDispatch()
    const handleAdd = () => {
        dispatch(addUser(STATE))
    }
    const CONFIG = [
        { fieldName: "name", type: "text" },
        { fieldName: "email", type: "email" },
        { fieldName: "gender", type: "radio", options: ["male", "female"] },
        { fieldName: "mobile", type: "number" },
        { fieldName: "date", type: "date" },
        { fieldName: "time", type: "time" },
        { fieldName: "age", type: "number" },
        { fieldName: "Add User", type: "submit", click: handleAdd },
    ]
    const [STATE, UI, PRE] = useDynamicForm(CONFIG)

    const { userAdded, userDeleted, userUpdated, error, loading, users } = useSelector(state => state.admin)
    const handleChange = e => {
        const { name, value } = e.target
        setSelectedUser({ ...selectedUser, [name]: value })
    }
    useEffect(() => {
        dispatch(getUsers())
    }, [])
    useEffect(() => {
        if (userAdded) {
            toast.success("User Create Success")
            dispatch(getUsers())
            dispatch(invalidate())
        }
    }, [userAdded])
    useEffect(() => {
        if (userDeleted) {
            toast.success("User Delete Success")
            dispatch(getUsers())
            dispatch(invalidate())
        }
    }, [userDeleted])
    useEffect(() => {
        if (userUpdated) {
            toast.success("User Update Success")
            dispatch(getUsers())
            dispatch(invalidate())
        }
    }, [userUpdated])
    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(invalidate())
        }
    }, [error])
    if (loading) return <div class="spinner-border text-primary"></div>

    return <>
        <div className="container">
            <div className='text-end mt-5'>
                <button
                    data-bs-toggle="modal"
                    data-bs-target="#add"
                    type="button"
                    className="btn btn-primary">+Add</button>
            </div>


            {/* add  */}

            <div class="modal fade" id="add" >
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">

                            {UI}
                        </div>
                    </div>
                </div>

            </div>


            <table class="table table-dark table-striped table-hover mt-5">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>email</th>
                        <th>Gender</th>
                        <th>Mobile</th>
                        <th>Age</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        users && users.map(item => <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.gender}</td>
                            <td>{item.mobile}</td>
                            <td>{item.age}</td>
                            <td>{item.date} : {item.time} </td>
                            <td>
                                <button
                                    data-bs-toggle="modal"
                                    data-bs-target="#edit"
                                    onClick={e => setSelectedUser(item)}
                                    type="button" class="btn btn-warning">Edit</button>
                                <button
                                    onClick={e => dispatch(deleteUser(item))}
                                    type="button"
                                    class="btn btn-danger">Delete</button>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>

            {/* edit  */}

            <div class="modal fade" id="edit">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <br /><input value={selectedUser.name} onChange={handleChange} name="name" type="text" />
                            <br /><input value={selectedUser.email} onChange={handleChange} name="email" type="email" />


                            <br />
                            <input
                                value="male"
                                id='m'
                                checked={selectedUser.gender === "male"}
                                onChange={handleChange} name="gender" type="radio" />
                            <label htmlFor="m">Male</label>
                            <br />
                            <input
                                value="female"
                                id='f'
                                checked={selectedUser.gender === "female"}
                                onChange={handleChange} name="gender" type="radio" />
                            <label htmlFor="f">Female</label>

                            <br /><input value={selectedUser.mobile} onChange={handleChange} name="mobile" type="number" />
                            <br /><input value={selectedUser.date} onChange={handleChange} name="date" type="date" />
                            <br /><input value={selectedUser.time} onChange={handleChange} name="time" type="time" />
                            <br /><input value={selectedUser.age} onChange={handleChange} name="age" type="number" />

                            <button
                                data-bs-dismiss="modal"
                                onClick={e => dispatch(updateUser(selectedUser))}
                                type="button"
                                class="btn btn-primary">Update user</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </>
}


export default Dashboard