import logo from './logo.svg';
import './App.css';
import { Navbar,Container,Nav,NavLink } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React,{ useState, useEffect } from 'react';


function App() {
  const [display,setDisplay] = useState([{name:'Home'},{name:"Blank"}])
  useEffect(()=>{fetch("http://localhost:9292")
  .then((r) => r.json())
  .then((data) => setDisplay(data[2]))},[])
  function destClick(){
    fetch("http://localhost:9292/destinations")
  .then((r) => r.json())
  .then((data) => setDisplay(data));
  }
  function tripClick(){
    fetch("http://localhost:9292/trips")
    .then((r) => r.json())
    .then((data) => setDisplay(data));
  }

  return (
  <div>
    <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand href="/">
      <img
        alt=""
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Bike_Park_Bottom.JPG/250px-Bike_Park_Bottom.JPG"
        width="30"
        height="30"
        className="d-inline-block align-top"
      />{' '}
    Tachyon Travel iTinerarys
    </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto" >
          <NavLink onClick={()=>setDisplay([{name:'Home'},{name:'Blank'}])} >Home</NavLink>
          <NavLink onClick={destClick} to="/destrinations" >Destinations</NavLink>
          <NavLink onClick={tripClick} to="/trips" >Trips</NavLink>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  {display.map(element=>{
    return(
      <>
      <p>{element.name}</p>
      <p>{element.title}</p>
      <p>{element.arrival}</p>
      </>
    )
  })}
</div>
  );
}

export default App;
