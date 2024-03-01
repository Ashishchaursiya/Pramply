"use client";
import Image from "next/image";
import Styles from "./page.module.css";
import Practice from "@/components/practices";
import { useEffect, useState } from "react";
import Dropdown from "@/components/Dropdown";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setCountry } from "@/redux/reducers/countryLocation";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer";
import { API_URL } from "@/utils/constants";
export default function Home() {
  const token = Cookies.get("token");
  const dispatch = useDispatch();

  const [userCountry, setUserCountry] = useState("India");
  const router = useRouter();
  const subscriptionData = useSelector(
    (state) => state.subscriptionInStore.subscriptionData
  );
  async function getCountry(latitude, longitude) {
    const apiUrl = `${API_URL}/user/location?longitude=${longitude}&latitude=${latitude}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data?.status == "SUCCESS") {
        const country = data.data;

        return country?.replace(/ /g, "");
      } else {
        return null;
      }
    } catch (error) {
     
      return null;
    }
  }

  const startPracticehandle = () => {
    if (!token) {
      return router.push(`/login`, { scroll: false });
    }

    if (subscriptionData?.days_left > 0) {
      router.push(`/startPractice/chooseTopicLevel`, { scroll: false });
    } else if (
      subscriptionData?.is_premium == 0 ||
      subscriptionData?.days_left <= 0
    ) {
      console.log('country',userCountry)
      router.push(`/${userCountry}/subscription`, { scroll: false });
    }
  };

  // useEffect(() => {
  //   const askForLocation = async () => {
  //     try {
  //       // Check if the browser supports Geolocation
  //       if ("geolocation" in navigator) {
  //         // Prompt the user for permission
  //         navigator.geolocation.getCurrentPosition(
  //           async (position) => {
  //             const { latitude, longitude } = position.coords;

  //             //setUserLocation({ latitude, longitude });
  //             let country = await getCountry(latitude, longitude);
  //             setUserCountry(country);
  //             dispatch(setCountry(country));
  //           },
  //           (error) => {
  //             dispatch(setCountry("Other"));
  //             setUserCountry("Other");
  //           }
  //         );
  //       } else {
  //         dispatch(setCountry("Other"));
  //         setUserCountry("Other");
  //       }
  //     } catch (error) {
  //       dispatch(setCountry("Other"));
  //       setUserCountry("Other");
  //     }
  //   };

  //   askForLocation();
  // }, []);
  return (
    <>
      <div className={`${Styles.padleft} container-fluid`}>
        <div className="row skewDivMain">
          <div className={`${Styles.skewCol} col`}>
            <div className={`${Styles.skewDiv}`}>
              <div className={`${Styles.hometext}`}>
                <h2 className={`${Styles.homeintro} text-dark`}>Welcome to</h2>
                <h5 className="text-dark">
                  Succeed in your career and clear interviews
                </h5>
                <p className={`${Styles.homepara} text-muted`}>
                  Join our learning community for career growth and interview
                  preparation
                </p>
                <button
                  className={`${Styles.practicebtn} btn btn-primary`}
                  onClick={startPracticehandle}
                >
                  Start Practice
                </button>
              </div>
            </div>
          </div>
          <div className={`${Styles.companyLogoDiv} col`}>
            <img
              src="/img/group-icon.png"
              alt="compinies logo"
              className={`${Styles.homeImg}`}
              width="550px"
              height="550px"
            />
          </div>
        </div>
      </div>
      <Practice />
      <Footer />
    </>
  );
}
