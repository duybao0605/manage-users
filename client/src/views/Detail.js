import React, { useContext, useEffect, useState } from 'react'
import { useParams,useHistory } from 'react-router-dom'
import { updatedata } from '../components/context/ContextProvider'
import {
    Button,
    Card,
    Form,
    Container,
    Row,
    Col
  } from "react-bootstrap";

const Detail = () => {
    const {setUPdata} = useContext(updatedata)
    const history = useHistory("");
    const [inpval, setINP] = useState({
        name: "",
        email: "",
        age: "",
        mobile: "",
        work: "",
        add: "",
        desc: ""
    })
    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }
    const { id } = useParams("");
    const getdata = async () => {
        const res = await fetch(`https://crudappreactjs.herokuapp.com/getuser/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
        console.log(data);
        if (res.status === 422 || !data) {
            console.log("error");
        } else {
            setINP(data)
            console.log("get data");
        }
    }
    useEffect(() => {
        getdata();
    }, []);
    const updateuser = async(e)=>{
        e.preventDefault();
        const {name,email,work,add,mobile,desc,age} = inpval;
        const res2 = await fetch(`https://crudappreactjs.herokuapp.com/updateuser/${id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                name,email,work,add,mobile,desc,age
            })
        });
        const data2 = await res2.json();
        // console.log(data2);
        if(res2.status === 422 || !data2){
            alert("fill the data");
        }else{
            history.push("/")
            setUPdata(data2);
        }
    }
    return (
        <>
        <Container fluid>
          <Row>
            <Col md="8">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">Welcome Harsh Pathak!</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Row>
                      <Col className="pr-1" md="5">
                        <Form.Group>
                          <label>Company (disabled)</label>
                          <Form.Control
                            name="work"
                            defaultValue={inpval.work}
                            disabled
                            placeholder="Company"
                            type="text"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col className="px-1" md="3">
                        <Form.Group>
                          <label>Name</label>
                          <Form.Control
                            name="name"
                            defaultValue={inpval.name}
                            placeholder="Username"
                            type="text"
                            onChange={setdata}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col className="pl-1" md="4">
                        <Form.Group>
                          <label htmlFor="exampleInputEmail1">
                            Email address
                          </label>
                          <Form.Control
                            name="email"
                            defaultValue={inpval.email}
                            placeholder="Email"
                            type="email"
                            onChange={setdata}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <Form.Group>
                          <label>Address</label>
                          <Form.Control
                            name="add"
                            defaultValue={inpval.add}
                            placeholder="Home Address"
                            type="text"
                            onChange={setdata}
                            ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="4">
                        <Form.Group>
                          <label>Age</label>
                          <Form.Control
                            name="age"
                            defaultValue={inpval.age}
                            placeholder="Age"
                            type="number"
                            onChange={setdata}
                            ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col className="pl-1" md="4">
                        <Form.Group>
                          <label>Mobile</label>
                          <Form.Control
                            name="mobile"
                            defaultValue={inpval.mobile}
                            placeholder="+91 123456"
                            type="text"
                            onChange={setdata}
                            ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <Form.Group>
                          <label>Description</label>
                          <Form.Control
                            name="desc"
                            cols="80"
                            defaultValue={inpval.desc}
                            placeholder="Here can be your description"
                            rows="4"
                            as="textarea"
                            onChange={setdata}
                            ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <Button
                                className="btn-fill pull-right"
                                type="submit"
                                variant="info"
                                onClick={updateuser}
                                >
                                Update Profile
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                className="btn-danger pull-right"
                                type="submit"
                                variant="info"
                                onClick={() => deleteuser(inpval._id)}
                                >
                                Delete Profile
                            </Button>
                        </Col>
                    </Row>
                        
                    <div className="clearfix"></div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            <Col md="4">
              <Card className="card-user">
                <div className="card-image">
                  <img
                    alt="..."
                    src={require("assets/img/photo-1431578500526-4d9613015464.jpeg")}
                  ></img>
                </div>
                <Card.Body>
                  <div className="author">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar border-gray"
                        src={require("assets/img/faces/face-3.jpg")}
                      ></img>
                      <h5 className="title">{inpval.name}</h5>
                    </a>
                    <p className="description">{'+91 ' + inpval.mobile}</p>
                  </div>
                  <p className="description text-center">
                    {inpval.desc}
                  </p>
                </Card.Body>
                <hr></hr>
                <div className="button-container mr-auto ml-auto">
                  <Button
                    className="btn-simple btn-icon"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    variant="link"
                  >
                    <i className="fab fa-facebook-square"></i>
                  </Button>
                  <Button
                    className="btn-simple btn-icon"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    variant="link"
                  >
                    <i className="fab fa-twitter"></i>
                  </Button>
                  <Button
                    className="btn-simple btn-icon"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    variant="link"
                  >
                    <i className="fab fa-google-plus-square"></i>
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    )
}

export default Detail