import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { API_URL } from "./constants";
 
export const initiatePayment = async (payload,setLoading,storeToken) => {
  const token = Cookies.get("token");
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/paytm/initiate-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token || storeToken}`,
        },
        body:JSON.stringify(payload)
       
      });
     
     
      const resData = await res.json();
      
      return resData

      
    } catch (error) {
      setLoading(false)
      
      console.log("error message ", error);
    }
  };
  export const PaymentSuccess = async (payload,setLoading) => {
    const token = Cookies.get("token");
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/paytm/response`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body:JSON.stringify(payload)
       
      });
     
     
      const resData = await res.json();
      
      return resData

      
    } catch (error) {
      setLoading(false)
      
      console.log("error message ", error);
    }
  };
  export const getPaymentDetails = async (finalToken) => {
    const token = Cookies.get("token");
  
    try {
      const res = await fetch(`${API_URL}/user/premium/detail`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${finalToken || token}`,
        },
        
       
      });
     
     
      const resData = await res.json();
      
      return resData?.data

      
    } catch (error) {
      
      
      console.log("error message ", error);
    }
  };