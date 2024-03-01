"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { useFormik } from "formik";
import Styles from "./signup.module.css";
import * as Yup from "yup";
import TextInput from "@/components/textInput";
import SelectInput from "@/components/selectInput";
import OtpInput from "react-otp-input";
import {
  checkEmailExist,
  checkUsernameExist,
  createUser,
  sendOtp,
} from "@/utils/authAction";
import Spinner from "@/components/spinner";
import EmailVerifyOtp from "@/components/emailVerify";
import SocialAuth from "@/components/socialAuth";
import { toast } from "react-toastify";
import { setToken } from "@/redux/reducers/tokenSlice";
import { useDispatch } from "react-redux";
import Footer from "@/components/footer";

const Signup = () => {
  const router = useRouter()
  const [isFirstStep, setIsFirstStep] = useState(true);
  const dispatch = useDispatch();
  const [isOtpModalShow, setIsOtpModalShow] = useState(false);
  const [isUsernameExist, setIsUsernameExist] = useState(null);
  const [isEmailExist, setIsEmailExist] = useState(null);
  const [otp, setOtp] = useState("");
  const [veriFiedEmails, setVeriFiedEmails] = useState([]);
  const [sentdEmails, setSentdEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [debounceTimerForEmail, setDebounceTimerForEmail] = useState(null);
 
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters")
      .matches(
        /^[a-zA-Z0-9_]+$/,
        "Only letters, numbers, and underscores are allowed"
      ),
    email: Yup.string().email("Email not found").required("Email is required"),
    gender: Yup.string().required("Gender is required"),
    experience: Yup.string().required("experience is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      gender: "male",
      password: "123456789",
      confirmPassword: "123456789",
      experience: "fresher",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if(!veriFiedEmails?.includes(values.email)){
        return formik.setFieldError('email','email is not verified')
      }
      if(isUsernameExist){
        return formik.setFieldError('username','username is not available')
              }
      if (isFirstStep) {
        formik.setFieldValue("password", "");
        formik.setFieldValue("confirmPassword", "");
        formik.setFieldValue("gender", "");
        formik.setFieldValue("experience", "");
        formik.setFieldTouched('experience', false);
        formik.setFieldTouched('password', false);
        formik.setFieldTouched('confirmPassword', false);
        formik.setFieldTouched('gender', false);
        setIsFirstStep(false);

        return;
      }
     let finalPayload = {
      first_name: values.firstName?.trim(),
      last_name: values.lastName?.trim(),
      user_name: values.username?.trim(),
      email: values.email?.trim(),
      gender: values.gender?.trim(),
      total_experience: values.experience?.trim(),
      password: values.password?.trim(),
      otp:otp,
    }
      let token = await createUser(finalPayload,setLoading)
      if(token){
        dispatch(setToken(token));
        router.push('/', { scroll: false })
        
      }
     
      
     

      
    },
  });
  // timer functionality 
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setInterval(() => {
        setResendTimer(prevTimer => prevTimer - 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    } 
  }, [resendTimer]);
  // sent otp
  const sendOtpHandle = async () => {
    if(veriFiedEmails?.includes(formik.values.email)){
      return formik.setFieldError('email','email already verified')
    }
    if(resendTimer<0 || !sentdEmails?.includes(formik.values.email)){
      await sendOtp(
        formik.values.email,
        setLoading,
        setIsOtpModalShow,
        setSentdEmails
        
      );
      setResendTimer(120)
      
          }else{
            setIsOtpModalShow(true)
          }
  
  };

  //debounce technique
  useEffect(() => {
    if (formik.values.username) {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      const newTimer = setTimeout(async () => {
        let userNameExist = await checkUsernameExist(formik.values.username);
        setIsUsernameExist(userNameExist);
        formik.setFieldTouched('username', true);
         
       
         
         
      }, 1000);
      setDebounceTimer(newTimer);
    }
  }, [formik.values.username]);

  // check email exist or not
  useEffect(() => {
    if (formik.values.email) {
      if (debounceTimerForEmail) {
        clearTimeout(debounceTimerForEmail);
      }

      const newTimer = setTimeout(async () => {
        let emailExist = await checkEmailExist(formik.values.email);
        setIsEmailExist(emailExist);
        formik.setFieldTouched('email', true);
       
      }, 1000);
      setDebounceTimerForEmail(newTimer);
    }
  }, [formik.values.email]);

  return (
    <>
      {loading && <Spinner />}

      {!veriFiedEmails?.includes(formik.values.email) && isOtpModalShow && (
        <EmailVerifyOtp
          {...{
            isOtpModalShow,
            setIsOtpModalShow,
            otp,
            setOtp,
            setLoading,
            setVeriFiedEmails,
            resendTimer, setResendTimer
          }}
          email={formik.values.email}
        />
      )}
      <div className="container">
        <div className="row">
          <div className="col-lg-6 my-auto">
            <div className={`${Styles.signupIntro} text-center`}>
              <h1>PRAMPLY</h1>
              <p className="text-muted my-0">Practice makes Perfect.</p>
              <p className="text-muted my-0">Join our community.</p>
              <p className="text-muted">Crack your dream company interview.</p>
            </div>
          </div>
          <div className="col-lg-6 py-2">
          
          <div className={`${Styles.signupForm}`}>
          <h5 className="text-center mb-3">Sign Up</h5>
                <SocialAuth label="Sign Up"/>
                  

                  <form onSubmit={formik.handleSubmit}>
                    <div className="row">
                      {isFirstStep ? (
                        <>
                          <TextInput
                            label="First Name"
                            name="firstName"
                            type="text"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            error={
                              formik.touched.firstName &&
                              formik.errors.firstName
                            }
                          />
                          <TextInput
                            label="Last Name"
                            name="lastName"
                            type="text"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            error={
                              formik.touched.lastName && formik.errors.lastName
                            }
                          />
                          <TextInput
                            label="Username"
                            name="username"
                            type="text"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            isExist={isUsernameExist}
                            // onBlur={formik.handleBlur}
                            error={
                              formik.touched.username && formik.errors.username
                            }
                          />
                          <TextInput
                            label="Email"
                            name="email"
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            isEmailVerified={veriFiedEmails?.includes(formik.values.email)}
                            isExist={isEmailExist}
                            // onBlur={formik.handleBlur}
                            sendOtpHandle={sendOtpHandle}
                            error={formik.touched.email && formik.errors.email}
                          />
                        
                        </>
                      ) : (
                        <>
                         
                            <SelectInput
                            label="Experience (In Year)"
                            name="experience"
                            value={formik.values.experience}
                            onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            error={
                              formik.touched.experience &&
                              formik.errors.experience
                            }
                            options={["Fresher", "0-3","3-5","5-10","10+"]}
                          />
                          <SelectInput
                            label="Gender"
                            name="gender"
                            value={formik.values.gender}
                            onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            error={
                              formik.touched.gender && formik.errors.gender
                            }
                            options={["Male", "Female","Other"]}
                          />
                          <TextInput
                            label="Password"
                            name="password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            error={
                              formik.touched.password && formik.errors.password
                            }
                          />
                          <TextInput
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            error={
                              formik.touched.confirmPassword &&
                              formik.errors.confirmPassword
                            }
                          />
                        </>
                      )}
                    </div>

                    <div className="d-grid mt-2">
                      <button className="btn btn-primary fw-bold" type="btn">
                        {isFirstStep ? "Next" : "Sign Up "}
                      </button>
                    </div>
                  </form>
                </div>
          </div>
        </div>
        {/* <h5 className="text-muted footertext">Pramply &copy; 2023</h5> */}
      </div>
      <Footer   />
    </>
  );
};

export default Signup;
