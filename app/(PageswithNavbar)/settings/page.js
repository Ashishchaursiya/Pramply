"use client";
import SuccessErrorAlert from "@/components/alert";
import Spinner from "@/components/spinner";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextInput from "@/components/textInput";
import { checkEmailExist, sendOtp, verifyOtp } from "@/utils/authAction";
import { updateUserEmail, updateUserPassword } from "@/utils/settingAction";
import { getUserDetails } from "@/utils/userProfileAction";
import { useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "@/redux/reducers/tokenSlice";
import Footer from "@/components/footer";
import { useMediaQuery } from "react-responsive";

const Setting = () => {
  const router = useRouter();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const dispatch = useDispatch();
  const storeToken = useSelector((state) => state.tokenInStore.authToken);
  const [userDetails, setUserDetails] = useState(null);
  const [isEmailUpdated, setIsEmailUpdated] = useState(0);
  const [showChangeEmailSection, setShowChangeEmailSection] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [showChangePasswordSection, setShowChangePasswordSection] =
    useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isAlertShow, setIsAlertShow] = useState(false);
  const [messageObj, setMessageObj] = useState({
    message: "",
    title: "",
    variantType: "",
  });
  const [loading, setLoading] = useState(false);
  const emailValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("email is required"),
    otp: Yup.string().required("Otp is required"),
  });
  const passwordValidationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Current Password is required"),
    password: Yup.string()
      .required("New Password is required")
      .min(8, "Password must be at least 8 characters")
      .test(
        "notSameAsOldPassword",
        "current and new password matching.",
        function (value) {
          return value !== this.parent.oldPassword;
        }
      ),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Confirm New Passwords must match")
      .required("Confirm New  Password is required"),
  });
  const emailFormik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    validationSchema: emailValidationSchema,
    onSubmit: async (values) => {},
  });
  const passwordFormik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
      oldPassword: "",
    },
    validationSchema: passwordValidationSchema,
    onSubmit: async (values) => {
      let finalPayload = {
        current_password: values.oldPassword?.trim(),
        new_password: values.password?.trim(),
      };

      if (
        passwordFormik.values.password?.trim() ==
        passwordFormik.values.oldPassword?.trim()
      ) {
        return passwordFormik.setFieldError(
          "oldPassword",
          "current and new password matching"
        );
      }
      let forgetRes = await updateUserPassword(finalPayload, setLoading);
      if (forgetRes.data) {
        dispatch(setToken(forgetRes.data));
        setIsEmailUpdated((prev) => prev + 1);

        setShowChangePasswordSection(false);
        setIsAlertShow(true);
        setMessageObj({
          message: "SuccessFully Password Has changed",
          title: "Message",
          variantType: "success",
        });
        passwordFormik.resetForm();
      } else {
        passwordFormik.setFieldError("oldPassword", forgetRes.message);
      }
    },
  });

  useEffect(() => {
    async function fetUserData() {
      let userData = await getUserDetails(storeToken);
      if (userData) {
        setUserDetails(userData.email);
      } else {
        router.push("/login", { scroll: false });
      }
    }
    fetUserData();
  }, [isEmailUpdated]);
  useEffect( () => {
if(emailFormik.values.email && !emailFormik.touched.email){
  emailFormik.setFieldTouched("email", true);
}
  },[emailFormik.values.email])
  useEffect( () => {
    if(emailFormik.values.otp && !emailFormik.touched.otp){
      emailFormik.setFieldTouched("otp", true);
    }
      },[emailFormik.values.otp])
  const getOtpHandle = async () => {
    if (emailFormik.values.email == "") {
      if(!emailFormik.touched.email){
        emailFormik.setFieldTouched("email", true);
      }
      
      return emailFormik.setFieldError("email", "email is required");
    }
    if (emailFormik.errors.email && emailFormik.errors.email?.includes('Invalid')) {
      return emailFormik.setFieldError("email", "Invalid email");
    }

    if (emailFormik.values.email?.trim() == userDetails) {
      //emailFormik.setFieldTouched("email", true);
      return emailFormik.setFieldError("email", "email already verified");
    }
    let emailExist = await checkEmailExist(emailFormik.values.email?.trim());
    if (emailExist) {
      return emailFormik.setFieldError(
        "email",
        "email already associated with other user."
      );
    }

    let issend = await sendOtp(emailFormik.values.email, setLoading);
    if (issend) {
      setIsOtpSent(true);
      setResendTimer(45);
    }
  };

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
  const resendOtp = async () => {
    await sendOtp(emailFormik.values.email, setLoading);
    setResendTimer(45);
  };
  const verifyOtpHandle = async () => {
    if (emailFormik.values.otp == "") {
      if(!emailFormik.touched.otp){
        emailFormik.setFieldTouched("otp", true);
      }
      return emailFormik.setFieldError("otp", "Otp is Required");
    }
    let isverified = await verifyOtp(
      emailFormik.values.otp,
      emailFormik.values.email,
      setLoading
    );
    if (isverified) {
     
      let newToken = await updateUserEmail(
        { email: emailFormik.values.email, otp: emailFormik.values.otp },
        setLoading
      );

      dispatch(setToken(newToken.data));
      setIsEmailUpdated((prev) => prev + 1);
      setIsOtpSent(false);
      setShowChangeEmailSection(false);
      setIsAlertShow(true);
      setMessageObj({
        message: "SuccessFully Email Has changed",
        title: "Message",
        variantType: "success",
      });
      emailFormik.resetForm();
    } else {
     
      emailFormik.setFieldError("otp", "Otp is wrong");
    }
  };
  return (
    <>
      {loading && <Spinner />}
      <div  className={ isMobile ? '':'expandContent'}>
      <div className="container shadow my-3 p-4 settingSec">
      
        <h5>Account Settings</h5>
        <p>Change your email or password.</p>
        <p className="fw-bold">Email Address</p>
        {userDetails ? (
          <p className="text-muted my-1">{userDetails}</p>
        ) : (
          <Skeleton count={1} />
        )}

        <span
          className="addHover text-primary fw-bold my-2"
          onClick={() => setShowChangeEmailSection(true)}
        >
          Change Email
        </span>
        {showChangeEmailSection && (
          <div className="changeEmailSection py-2">
            <form onSubmit={emailFormik.handleSubmit}>
              {isOtpSent ? (
                <>
                  <TextInput
                    label="Otp"
                    name="otp"
                    type="text"
                    value={emailFormik.values.otp}
                    onChange={emailFormik.handleChange}
                    // onBlur={emailFormik.handleBlur}
                    error={emailFormik.touched.otp && emailFormik.errors.otp}
                  />
                  <div className="d-flex flex-row-reverse py-2">
                    <div className="px-2">
                      <button
                        className="btn btn-primary"
                        type="button"
                        onClick={verifyOtpHandle}
                      >
                        Verify Otp
                      </button>
                    </div>
                    <div className="px-2">
                      <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={() => setShowChangeEmailSection(false)}
                      >
                        Cancel
                      </button>
                    </div>
                    {isOtpSent && (
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
                </>
              ) : (
                <>
                  <p>We will send you an OTP to this email ID</p>
                  <TextInput
                    label="Email Address"
                    name="email"
                    type="email"
                    value={emailFormik.values.email}
                    onChange={emailFormik.handleChange}
                    // onBlur={emailFormik.handleBlur}
                    error={
                      emailFormik.touched.email && emailFormik.errors.email
                    }
                  />
                  <div className="d-flex flex-row-reverse py-2">
                    <div className="px-2">
                      <button
                        className="btn btn-primary"
                        type="button"
                        onClick={getOtpHandle}
                      >
                        Get Otp
                      </button>
                    </div>
                    <div className="px-2">
                      <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={() => setShowChangeEmailSection(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </>
              )}
            </form>
          </div>
        )}
        <p className="fw-bold my-2">Password</p>
        <span
          className="addHover text-primary fw-bold"
          onClick={() => setShowChangePasswordSection(true)}
        >
          Change Password
        </span>

        {showChangePasswordSection && (
          <div className="changePasswordSection  py-2">
            <form onSubmit={passwordFormik.handleSubmit}>
              <TextInput
                label="Current Password"
                name="oldPassword"
                type="password"
                value={passwordFormik.values.oldPassword}
                onChange={passwordFormik.handleChange}
                // onBlur={passwordFormik.handleBlur}
                error={
                  passwordFormik.touched.oldPassword &&
                  passwordFormik.errors.oldPassword
                }
              />
              <TextInput
                label="New Password"
                name="password"
                type="password"
                value={passwordFormik.values.password}
                onChange={passwordFormik.handleChange}
                // onBlur={passwordFormik.handleBlur}
                error={
                  passwordFormik.touched.password &&
                  passwordFormik.errors.password
                }
              />
              <TextInput
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                value={passwordFormik.values.confirmPassword}
                onChange={passwordFormik.handleChange}
                // onBlur={passwordFormik.handleBlur}
                error={
                  passwordFormik.touched.confirmPassword &&
                  passwordFormik.errors.confirmPassword
                }
              />
              <div className="d-flex flex-row-reverse py-2">
                <div className="px-2">
                  <button className="btn btn-primary">Update</button>
                </div>
                <div className="px-2">
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={() => setShowChangePasswordSection(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
        <SuccessErrorAlert
          {...{ isAlertShow, setIsAlertShow }}
          {...messageObj}
        />
      </div>
      </div>
      <Footer bottom={true}   />
    </>
  );
};
export default Setting;
