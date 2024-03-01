"use client";
 
import 'react-toastify/dist/ReactToastify.css';
import NavBar from "./navbar";
import { ToasterDiv } from "./toaster";
import Cookies from "js-cookie";
import Footer from "./footer";
 
const CustomLayout = ({ children }) => {
  
  return (
    <>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
            rel="stylesheet"
          ></link>
        </head>
        <body>
          <NavBar/>
          <ToasterDiv />
          {children}
          
        </body>
       
      </html>
    </>
  );
};
export default CustomLayout;
