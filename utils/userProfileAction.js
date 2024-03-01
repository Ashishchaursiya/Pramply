import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { API_URL } from "./constants";
 
export const getUserDetails = async (newtoken) => {
  const token = Cookies.get("token");
    try {
      const res = await fetch(`${API_URL}/user/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${newtoken || token}`,
        },
       
      });
      const resData = await res.json();
      if (resData?.status=='SUCCESS') {
        
       return resData?.data
        
       
       
      } else {
       return null
         
      }
    } catch (error) {
      
      toast.error("someting went wrong");
      console.log("error message ", error);
    }
  };
  export const getUseRating = async () => {
    const token = Cookies.get("token");
   
    try {
      const res = await fetch(`${API_URL}/user/rating`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
       
      });
      const resData = await res.json();
     return resData
    } catch (error) {
      
      toast.error("someting went wrong");
      console.log("error message ", error);
    }
  };
  export const getUseSkills = async () => {
    const token = Cookies.get("token");
   
    try {
      const res = await fetch(`${API_URL}/user/skills`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
       
      });
      // console.log('skill res json ', res)
     
      const resData = await res.json();
      return resData?.message ? []:resData
    } catch (error) {
      
      
      console.log("error message ", error);
    }
  };
  export const getUserEmployment = async () => {
    const token = Cookies.get("token");
   
    try {
      const res = await fetch(`${API_URL}/user/employment`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
       
      });
     
     
      const resData = await res.json();
      return resData;

      
    } catch (error) {
      
      
      console.log("error message ", error);
    }
  };
  export const getUserEducation = async () => {
    const token = Cookies.get("token");
   
    try {
      const res = await fetch(`${API_URL}/user/educations`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
       
      });
     
     
      const resData = await res.json();
      return resData;

      
    } catch (error) {
      
      
      console.log("error message ", error);
    }
  };

  export const getPreviousPractices = async (count,offset,setLoading = () => {}) => {
    const token = Cookies.get("token");
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/user/previous-practices?count=${count}&offset=${offset}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
       
      });
     
     
      const resData = await res.json();
      setLoading(false)
      return resData ;

      
    } catch (error) {
      setLoading(false)
      
      console.log("error message ", error);
    }
  };
  export const getPreviousPracticesCount = async () => {
    const token = Cookies.get("token");
   
    try {
      const res = await fetch(`${API_URL}/user/count/previous-practice`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
       
      });
     
     
      const resData = await res.json();
     
      return resData.data ;

      
    } catch (error) {
  
      
      console.log("error message ", error);
    }
  };
  export const getUserProfilePic = async (userName) => {
    const token = Cookies.get("token");
    try {
      const res = await fetch(`${API_URL}/user/profile-image?username=${userName}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
       
      });
     
     
      const resData = await res.json();
      return resData?.data

      
    } catch (error) {
      
      
      console.log("error message ", error);
    }
  };
  export const updateUserDetails = async (payload,setLoading) => {
    const token = Cookies.get("token");
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/user/update/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body:JSON.stringify(payload)
       
      });
     
     
      const resData = await res.json();
      setLoading(false)
      return resData

      
    } catch (error) {
      setLoading(false)
      
      console.log("error message ", error);
    }
  };
  export const updateSkills = async (payload,setLoading) => {
    const token = Cookies.get("token");
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/user/skill`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body:JSON.stringify(payload)
       
      });
     
     
      const resData = await res.json();
      setLoading(false)
      return resData

      
    } catch (error) {
      setLoading(false)
      
      console.log("error message ", error);
    }
  };
  export const addEmployment = async (payload,setLoading) => {
    const token = Cookies.get("token");
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/user/employment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body:JSON.stringify(payload)
       
      });
     
     
      const resData = await res.json();
      setLoading(false)
      return resData

      
    } catch (error) {
      setLoading(false)
      
      console.log("error message ", error);
    }
  };
  export const editEmployment = async (payload,setLoading,id) => {
    const token = Cookies.get("token");
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/user/employment/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body:JSON.stringify(payload)
       
      });
     
     
      const resData = await res.json();
      setLoading(false)
      return resData

      
    } catch (error) {
      setLoading(false)
      
      console.log("error message ", error);
    }
  };
  export const deleteEmployment = async (id,setLoading) => {
    const token = Cookies.get("token");
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/user/employment/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
     
       
      });
     
     
      const resData = await res.json();
      setLoading(false)
      return resData

      
    } catch (error) {
      setLoading(false)
      
      console.log("error message ", error);
    }
  };
  export const getDegreeNames = async () => {
    const token = Cookies.get("token");
   
    try {
      const res = await fetch(`${API_URL}/resources/degrees`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
       
      });
     
     
      const resData = await res.json();
      return resData

      
    } catch (error) {
      
      
      console.log("error message ", error);
    }
  };
  export const addEducation = async (payload,setLoading) => {
    const token = Cookies.get("token");
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/user/education`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body:JSON.stringify(payload)
       
      });
     
     
      const resData = await res.json();
      setLoading(false)
      return resData

      
    } catch (error) {
      setLoading(false)
      
      console.log("error message ", error);
    }
  };
  export const editEducation = async (payload,setLoading,id) => {
    const token = Cookies.get("token");
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/user/education/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body:JSON.stringify(payload)
       
      });
     
     
      const resData = await res.json();
      setLoading(false)
      return resData

      
    } catch (error) {
      setLoading(false)
      
      console.log("error message ", error);
    }
  };
  export const deleteEducation = async (id,setLoading) => {
    const token = Cookies.get("token");
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/user/education/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
     
       
      });
     
     
      const resData = await res.json();
      setLoading(false)
      return resData

      
    } catch (error) {
      setLoading(false)
      
      console.log("error message ", error);
    }
  };
  export const getSocialAccounts = async () => {
    const token = Cookies.get("token");
   
    try {
      const res = await fetch(`${API_URL}/user/social-accounts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
       
      });
      // console.log('skill res json ', res)
     
      const resData = await res.json();
      return resData
    } catch (error) {
      
      
      console.log("error message ", error);
    }
  };
  export const addSocialAccounts = async (payload,setLoading) => {
    const token = Cookies.get("token");
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/user/social-account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body:JSON.stringify(payload)
       
      });
     
     
      const resData = await res.json();
      setLoading(false)
      return resData

      
    } catch (error) {
      setLoading(false)
      
      console.log("error message ", error);
    }
  };
  export const deleteSocialAccounts = async (name,setLoading) => {
    const token = Cookies.get("token");
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/user/social-accounts/${name}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
     
       
      });
     
     
      const resData = await res.json();
      setLoading(false)
      return resData

      
    } catch (error) {
      setLoading(false)
      
      console.log("error message ", error);
    }
  };
  export const getTopicsNames = async () => {
    const token = Cookies.get("token");
   
    try {
      const res = await fetch(`${API_URL}/resources/topic-practices`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
       
      });
     
     
      const resData = await res.json();
     
      return resData;

      
    } catch (error) {
  return []
      
      console.log("error message ", error);
    }
  };