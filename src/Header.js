import { Navbar,Container,Nav,NavLink } from 'react-bootstrap';

function Header(){

    return (
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
            Tachyon Travel
            </Navbar.Brand>
                <Nav className="me-auto" >
                <NavLink href="/">Home</NavLink>
                <NavLink href="/destinations">Destinations</NavLink>
                <NavLink href="/trips">Trips</NavLink>
                <NavLink href="/stops">Stops</NavLink>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header;