import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { adddata } from '../components/context/ContextProvider';
import {
    Button,
    Card,
    Form,
    Container,
    Row,
    Col
  } from "react-bootstrap";
const Register = () => {
    const { udata, setUdata } = useContext(adddata);
    const history = useHistory();
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
    const addinpdata = async (e) => {
        e.preventDefault();
        const { name, email, work, add, mobile, desc, age } = inpval;
        const res = await fetch("https://crudappreactjs.herokuapp.com/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, work, add, mobile, desc, age
            })
        });
        const data = await res.json();
        console.log(data);
        if (res.status === 422 || !data) {
            console.log("error ");
            alert("error");
        } else {
            history.push("/")
            setUdata(data)
            console.log("data added");
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
                          <label>Company</label>
                          <Form.Control
                            name="work"
                            defaultValue={inpval.work}
                            placeholder="Company"
                            type="text"
                            onChange={setdata}
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
                                onClick={addinpdata}
                                >
                                Submit
                            </Button>
                        </Col>
                    </Row>
                    <div className="clearfix"></div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        </>
    )
}
export default Register;
