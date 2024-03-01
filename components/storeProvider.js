"use client";
import { Provider } from "react-redux";
import CustomLayout from "./customLayout";
import reduxStore from "../redux/store";
 
 
import 'react-toastify/dist/ReactToastify.css';
import NavBar from "./navbar";
import { ToasterDiv } from "./toaster";
 
const StoreProvider = ({ customChildren }) => {
  return (
    <Provider store={reduxStore}>
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
          {customChildren}
          
        </body>
       
      </html>
    </>
    </Provider>
  );
};

export default StoreProvider;
