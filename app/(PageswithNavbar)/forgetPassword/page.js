"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import Styles from "./forgetPassword.module.css";
import TextInput from "@/components/textInput";
import Link from "next/link";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Spinner from "@/components/spinner";

import {
  forgetPassword,
  loginUser,
  sendOtp,
  verifyOtp,
} from "@/utils/authAction";
import { useRouter } from "next/navigation";

import MessageModal from "@/components/messageModal";
import Footer from "@/components/footer";

const ForgetPassword = () => {
  const [resendTimer, setResendTimer] = useState(0);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(true);
  const [isOtpSent, setIsOtpSent] = useState(false);

  const [show, setShow] = useState(false);
  
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email not found").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    otp: Yup.string().required("Otp is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      otp: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let finalPayload = {
        email: values.email?.trim(),
        new_password: values.password?.trim(),
        otp: values.otp,
      };

      let forgetRes = await forgetPassword(finalPayload, setLoading);
      if (forgetRes) {
        router.push("/login", { scroll: false });
      }
    },
  });
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [resendTimer]);
  const getOtpHandle = async () => {
    if (formik.errors.email || formik.values.email == "") {
      formik.setFieldTouched('email',true)
      return  formik.setFieldError('email','Invalid email')
    }
    let issend = await sendOtp(formik.values.email, setLoading, setShow);
    if (issend) {
      setIsOtpSent(true);
      setResendTimer(45);
    }
  };
  const verifyOtpHandle = async () => {
    if (formik.values.otp == "") {
      formik.setFieldTouched('otp',true)
      return  formik.setFieldError('otp','Otp is Required')
    }
    let isverified = await verifyOtp(
      formik.values.otp,
      formik.values.email,
      setLoading
    );
    if (isverified) {
      setIsFirstStep(false);
    }else{
      
      formik.setFieldError('otp','Otp is wrong')
      
    }
  };
  const resendOtp = async () => {
    await sendOtp(formik.values.email, setLoading);
    setResendTimer(45);
  };
  return (
    <>
      {loading && <Spinner />}
      {/* <MessageModal title="Message" message={otpMessage} show={show} setShow ={setShow}/> */}
      <div className="d-flex justify-content-center pt-3">
        <div>
        <img src="/img/navlogo.png" width="55px" height="55px"/> 
        </div>
        <div>
        <h1 className="paymentIntro"></h1>
      
        </div>
    </div>
      <div className="container mb-4">
        <div className="row">
          <div className="col-lg-12 mx-auto mt-4">
            <div className={`${Styles.ForgetForm} mt-4`}>
              <h5 className="text-center">Forget Password</h5>

              <form onSubmit={formik.handleSubmit}>
                <div className="row">
                  {isFirstStep ? (
                    <>
                      {isOtpSent ? (
                        <>
                          <TextInput
                            label="Otp"
                            name="otp"
                            type="text"
                            value={formik.values.otp}
                            onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            error={formik.touched.otp && formik.errors.otp}
                          />
                          <div className={` text-center py-2 fs-6 text-muted`}>
                            <small>Please Check your Email (Inbox/Spam) Folder. </small>
                          </div>
                        </>
                      ) : (
                        <TextInput
                          label="Email address"
                          name="email"
                          type="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          // onBlur={formik.handleBlur}
                          error={formik.touched.email && formik.errors.email}
                        />
                      )}
                    </>
                  ) : (
                    <>
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
                  {isFirstStep ? (
                    <button
                      className="btn btn-primary fw-bold"
                      type="button"
                      onClick={isOtpSent ? verifyOtpHandle : getOtpHandle}
                    >
                      {isOtpSent ? "VERIFY OTP" : "GET OTP"}
                    </button>
                  ) : (
                    <button className="btn btn-primary fw-bold" type="submit">
                      Reset Password
                    </button>
                  )}
                </div>
              </form>
              <div className={`${Styles.loginFooter} text-center py-2`}>
                <span>
                  Already have an account? <Link href="/login">Login here</Link>{" "}
                  <br></br>
                </span>
                {isFirstStep && isOtpSent && (
                  <button
                    type="button"
                    class="btn btn-link fw-bold"
                    disabled={resendTimer > 0 ? true : false}
                    onClick={resendOtp}
                  >
                    Resend Otp{" "}
                    {resendTimer > 0 ? `in ${resendTimer} seconds` : ``}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default ForgetPassword;
