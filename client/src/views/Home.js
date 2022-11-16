import React, { useState, useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { adddata, deldata } from '../components/context/ContextProvider';
import { updatedata } from '../components/context/ContextProvider'
import {
    Container,
    Row,
    Col
  } from "react-bootstrap";
const Home = () => {
    const [getuserdata, setUserdata] = useState([]);
    const { udata, setUdata } = useContext(adddata);
    const {updata, setUPdata} = useContext(updatedata);
    const {dltdata, setDLTdata} = useContext(deldata);
    const getdata = async () => {
        const res = await fetch("https://crudappreactjs.herokuapp.com/getdata", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
        if (res.status === 422 || !data) {
            console.log("error ");
        } else {
            setUserdata(data)
            console.log("get data");
        }
    }

    useEffect(() => {
        getdata();
    }, [])
    const deleteuser = async (id) => {
        const res2 = await fetch(`https://crudappreactjs.herokuapp.com/deleteuser/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const deletedata = await res2.json();
        console.log(deletedata);
        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            console.log("user deleted");
            setDLTdata(deletedata)
            getdata();
        }
    }
    return (
        <>
        {
            udata ?
                <>
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>{udata.name}</strong>  added succesfully!
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </> : ""
        }
        {
            updata ?
                <>
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>{updata.name}</strong>  updated succesfully!
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </> : ""
        }
        {
            dltdata ?
                <>
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>{dltdata.name}</strong>  deleted succesfully!
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </> : ""
        }
        <Container>
            <Row>
                <Col>
                    <div className="add_btn mt-2 mb-2">
                        <NavLink to="user/register" className="btn btn-sm">Add data</NavLink>
                    </div>
                    <table class="table" striped hover>
                        <thead>
                            <tr>
                                <th scope="col">id</th>
                                <th scope="col">Username</th>
                                <th scope="col">email</th>
                                <th scope="col">Job</th>
                                <th scope="col">Number</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                getuserdata.map((element, id) => {
                                    return (
                                        <>
                                            <tr>
                                                <th scope="row">{id + 1}</th>
                                                <td>{element.name}</td>
                                                <td>{element.email}</td>
                                                <td>{element.work}</td>
                                                <td>{element.mobile}</td>
                                                <td className="d-flex justify-content-between">
                                                    <NavLink to={`user/detail/${element._id}`}><button className="btn btn-sm">view</button></NavLink>
                                                    <NavLink to={`user/detail/${element._id}`}><button className="btn btn-sm">edit</button></NavLink>
                                                    <NavLink to={`/`} onClick={() => deleteuser(element._id)}>
                                                        <button className="btn-danger btn-sm text-white" size="sm">delete</button>
                                                    </NavLink>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default Home