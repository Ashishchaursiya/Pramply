"use client";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Styles from "../app/(PageswithNavbar)/page.module.css";
import Cookies from "js-cookie";
import { logoutUser } from "@/utils/authAction";
import { useEffect, useState } from "react";
import { Cookie } from "next/font/google";
import { useSelector } from "react-redux";
import AfterLogin from "./afterLogin";
import Skeleton from "react-loading-skeleton";
import { usePathname } from "next/navigation";
function NavBar() {
  const pathname = usePathname();

  const [token, setToken] = useState(null);
  const storeToken = useSelector((state) => state.tokenInStore.authToken);
  useEffect(() => {
    let userToken = Cookies.get("token");
    setToken(userToken);
  }, [storeToken,Cookies.get("token")]);
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary pb-0 shadow-sm">
        <Container>
          <Navbar.Brand>
            <Link href="/">
              <img src="/img/navlogo.png" width="55px" height="55px" />
            </Link>{" "}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            <Form className=" navbarContent justify-content-center">
              {token === null && !storeToken ? (
                <Skeleton count={1} width="150px" height="40px" />
              ) : token || storeToken ? (
                <AfterLogin />
              ) : (
                <>
                  <Link href="/login" className={`${Styles.homeLink} mx-2 `}>
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className={`${Styles.fw10} btn btn-primary mx-2 `}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* <div className="navwidth"></div> */}
    </>
  );
}

export default NavBar;
