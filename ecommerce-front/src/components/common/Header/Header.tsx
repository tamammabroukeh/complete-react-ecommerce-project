import { Badge, Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import classes from "./styles.module.css";
import { NavLink } from "react-router-dom";
import { HeaderLeftBar } from "..";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { authLogout } from "@/store/auth/authSlice";
import { useEffect } from "react";
import actGetWishlist from "@/store/wishlistSlice/actions/actGetWishlist";
const { headerContainer, headerLogo } = classes;
const Header = () => {
  const { user, accessToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (accessToken) dispatch(actGetWishlist("productsIds"));
  }, [dispatch, accessToken]);

  return (
    <header>
      <div className={headerContainer}>
        <h1 className={headerLogo}>
          <span>
            Our <Badge bg="info">eCom</Badge>
          </span>
        </h1>
        <HeaderLeftBar />
      </div>
      <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/categories">
                Categories
              </Nav.Link>
              <Nav.Link as={NavLink} to="/about-us">
                About
              </Nav.Link>
            </Nav>
            <Nav>
              {accessToken ? (
                <>
                  <NavDropdown
                    title={`Welcome ${user?.firstname} ${user?.lastname}`}
                    id="basic-nav-dropdown"
                  >
                    <NavDropdown.Item as={NavLink} to="profile" end>
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/profile/orders">
                      Orders
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      as={NavLink}
                      to="/"
                      onClick={() => dispatch(authLogout())}
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Nav.Link as={NavLink} to="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/register">
                    Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
