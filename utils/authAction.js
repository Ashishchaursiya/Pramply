import { toast } from "react-toastify";
import Cookies from "js-cookie";
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";
import { API_URL } from "./constants";

export const logoutUser = () => {
  Cookies.remove("token");

  //router.push('/login', { scroll: false })
};

export const loginUser = async (payload, setLoading) => {
  setLoading(true);

  try {
    const res = await fetch(`${API_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const resData = await res.json();

    if (resData?.status=='SUCCESS') {
      //toast.success("SuccessFully Login");
       Cookies.set("token", resData?.data,{ expires: 30 });
      setLoading(false);
      return {token:resData?.data};
    } else {
      //toast.error(resData.message);
      setLoading(false);
      return {errMessage:resData.message};
    }
  } catch (error) {
    setLoading(false);
    //toast.error("someting went wrong");
    console.log("error message ", error);
  }
};
export const sendOtp = async (email, setLoading, setIsOtpModalShow = () => {},setSentdEmails = () => {}) => {
  setLoading(true);
  try {
    const res = await fetch(`${API_URL}/send/otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const resData = await res.json();
    if (resData?.data) {
      setSentdEmails( prev => [...prev,email])
      //toast.success("Otp SuccessFully Sent");
      setLoading(false);
      setIsOtpModalShow(true);
      return true
    } else {
      
      //toast.error("someting went wrong");
      setLoading(false);
      return false
    }
  } catch (error) {
    setLoading(false);
    //toast.error("someting went wrong");
    console.log("error message ", error);
  }
};
export const checkUsernameExist = async (username) => {
  try {
    const res = await fetch(
      `${API_URL}/user/username/exist?username=${username}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const userData = await res.json();
    return userData?.data;
  } catch (error) {
    console.log("error message ", error);
  }
};
export const checkEmailExist = async (email) => {
  try {
    const res = await fetch(
      `${API_URL}/user/email/exist?email=${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const userData = await res.json();
    return userData?.data;
  } catch (error) {
    console.log("error message ", error);
  }
};
export const verifyOtp = async (
  otp,
  email,
  setLoading,
  setVeriFiedEmails = () => {},
  setOtp
) => {
  setLoading(true);
  try {
    const res = await fetch(`${API_URL}/verify/otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token_id: otp,
        email: email,
      }),
    });
    let otpRes = await res.json();

    if (otpRes.data) {
      
      setLoading(false);
      //setOtp("");
      setVeriFiedEmails((prev) => [...prev, email]);
      return true
    } else {
      //toast.error("Otp is wrong");
      setLoading(false);
      return false
    }
  } catch (error) {
    setLoading(false);
    //toast.error("someting went wrong");
    console.log("error message ", error);
  }
};
export const createUser = async (payload, setLoading) => {
  
  setLoading(true);
  try {
    const res = await fetch(`${API_URL}/user/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    let userRes = await res.json();

    if (userRes.data) {
       Cookies.set("token", userRes?.data);
      //toast.success("Account SuccesFully Created");
      setLoading(false);
      return userRes?.data;
    } else {
      setLoading(false);
     // toast.error(userRes.message);
      return  false
    }
  } catch (error) {
    setLoading(false);
    //toast.error("someting went wrong");
    console.log("error message ", error);
  }
};
export const forgetPassword = async (payload,setLoading) => {
  setLoading(true);
  try {
    const res = await fetch(`${API_URL}/user/forgot/password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const resData = await res.json();
    if (resData?.data) {
      
      //toast.success(resData?.message);
      setLoading(false);
      return true
     
    } else {
     // toast.error(resData?.message);
      setLoading(false);
      return false
    }
  } catch (error) {
    setLoading(false);
   // toast.error("someting went wrong");
    console.log("error message ", error);
  }
};
