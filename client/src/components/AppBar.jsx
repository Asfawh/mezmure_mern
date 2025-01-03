/* react */
import { useContext } from 'react';
// import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

/* React Bootstrap  */
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

/* React Router Bootstrap */
import { LinkContainer } from 'react-router-bootstrap';


/* local */
import { AuthContext } from '../context/AuthContext';
import Search from './Search';

const { SearchBar } = Search;

function AppBar() {
  const { state } = useContext(AuthContext);

  return (
    <Navbar variant="dark" bg="primary" expand="lg">
      <Container>
        <LinkContainer to="/songs">
          <Navbar.Brand>EOTC MEZMURE </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="nav-menu" />
        <Navbar.Collapse id="nav-menu">
          <Nav className="me-auto">
            {state.user && (
              <LinkContainer to="/songs/new">
                <Nav.Link>Create / View</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
        <Search />
      </Container>
    </Navbar>
  );
}

export default AppBar;
