import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { API_URL } from "./constants";
 
export const createConnection = async (topic, username, level) => {
  const token = Cookies.get("token");
    const encodedTopic = encodeURIComponent(topic.replace(/[^a-zA-Z0-9]/g, '-'));
    let apiUrl =  `${API_URL}/peer/match/${encodedTopic}?username=${username}`
    if(level!='random'){
      apiUrl += `&level=${level}`;
    }
  try {
    const res = await fetch(
      apiUrl,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const resData = await res.json();
    if (resData?.status == "SUCCESS") {
      return resData?.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log("error message ", error);
  }
};
