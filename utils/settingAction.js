import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { API_URL } from "./constants";
export const updateUserEmail = async (payload,setLoading) => {
  const token = Cookies.get("token");
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/user/update/email`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body:JSON.stringify(payload)
       
      });
     
     
      const resData = await res.json();
      Cookies.remove("token");
      Cookies.set("token", resData?.data);
      setLoading(false)
      return resData

      
    } catch (error) {
      setLoading(false)
      
      console.log("error message ", error);
    }
  };
  export const updateUserPassword = async (payload,setLoading) => {
    const token = Cookies.get("token");
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/user/update/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body:JSON.stringify(payload)
       
      });
     
     
      const resData = await res.json();
      
      setLoading(false)
      if(resData?.data){
        Cookies.remove("token");
        Cookies.set("token", resData?.data);
      } 
      return resData

      
    } catch (error) {
      setLoading(false)
      
      console.log("error message ", error);
    }
  };