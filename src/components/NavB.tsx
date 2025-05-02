import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router'
import { useAuth } from './auth/AuthProvider';
import { useNavigate } from 'react-router'

function NavB() {

  const { isAuthenticated } = useAuth();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleOnClck = () =>{
    logout();
    navigate("/signin")
  }
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Nav className="me-auto">
            {isAuthenticated ? (
              <>
            <Nav.Link as ={NavLink} to="/book">Book</Nav.Link>
            <Nav.Link as ={NavLink} to="/lending">Lendings</Nav.Link>
            <Nav.Link as ={NavLink} to="/staff">Staff</Nav.Link>
            <Nav.Link as ={NavLink} to="/member">Members</Nav.Link>
            <Button variant="warning" onClick={handleOnClck}>Logout</Button>
              </>
            ) : (
              <>
            <Nav.Link as ={NavLink} to="/signin">SignIn</Nav.Link>
            <Nav.Link as ={NavLink} to="/signup">SignUp</Nav.Link>
              </>
            )}
            
      
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavB;