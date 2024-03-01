import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { API_URL } from "./constants";
export const getQuestions = async ({
  topic,
  searchtext,
  level,
  fieldName,
  orderBy,
  offset,
}) => {
  let apiUrl = `${API_URL}/resources/${topic}?`;

  if (searchtext) {
    apiUrl += `name=${searchtext}&`;
  }

  if (level) {
    apiUrl += `level=${level}&`;
  }

  if (fieldName) {
    apiUrl += `field=${fieldName}&`;
  }

  if (orderBy) {
    apiUrl += `sortBy=${orderBy}&`;
  }

  apiUrl += `count=10&offset=${offset}`;
  try {
    const res = await fetch(`${apiUrl}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resData = await res.json();
    return resData;
  } catch (error) {
    console.log("error message ", error);
  }
};
export const getNotifications = async () => {
  const token = Cookies.get("token");
  let apiUrl = `${API_URL}/user/notification`;

  try {
    const res = await fetch(`${apiUrl}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const resData = await res.json();
    return Array.isArray(resData) ? resData : [];
  } catch (error) {
    console.log("error message ", error);
  }
};
export const deleteNotifications = async (id) => {
  const token = Cookies.get("token");
  let apiUrl = `${API_URL}/user/notification?notificationId=${id}`;

  try {
    const res = await fetch(`${apiUrl}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const resData = await res.json();
    return resData;
  } catch (error) {
    console.log("error message ", error);
  }
};
export const getPeerDetails = async (url) => {
  const token = Cookies.get("token");
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const resData = await res.json();
    return resData;
  } catch (error) {
    console.log("error message ", error);
  }
};
export const addRating = async (payload, userName) => {
  const token = Cookies.get("token");
  try {
    const res = await fetch(
      `${API_URL}/peer/rating?username=${userName}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );
    const resData = await res.json();
    return resData;
  } catch (error) {
    console.log("error message ", error);
  }
};
export const reportPeerUser = async (username) => {
  const token = Cookies.get("token");
  try {
    const res = await fetch(
      `${API_URL}/peer/report?username=${username}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: {},
      }
    );

    const resData = await res.json();
    return resData;
  } catch (error) {
    console.log("error message ", error);
  }
};
export const SendContactDetails = async (payload) => {
  const token = Cookies.get("token");
  try {
    const res = await fetch(
      `${API_URL}/contact/us`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );
    const resData = await res.json();
    return resData;
  } catch (error) {
    console.log("error message ", error);
  }
};
export const addPreviousPractice = async (payload) => {
  const token = Cookies.get("token");
  try {
    const res = await fetch(
      `${API_URL}/user/previous-practice`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );
    const resData = await res.json();
    return resData;
  } catch (error) {
    console.log("error message ", error);
  }
};
