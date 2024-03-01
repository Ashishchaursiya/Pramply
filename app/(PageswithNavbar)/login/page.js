"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import Styles from "./login.module.css";
import TextInput from "@/components/textInput";
import Link from "next/link";
import { toast } from "react-toastify";
import { useState } from "react";
import Spinner from "@/components/spinner";
import SocialAuth from "@/components/socialAuth";
import { loginUser } from "@/utils/authAction";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setToken } from "@/redux/reducers/tokenSlice";
import Footer from "@/components/footer";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email not found").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let finalPayload = {
        email: values.email?.trim(),
        password: values.password?.trim(),
      };
      let res = await loginUser(finalPayload, setLoading);
      if (res?.token) {
        dispatch(setToken(res?.token));
        router.push("/", { scroll: false });
      } else {
        formik.setFieldError(
          res?.errMessage?.includes("@") ? "email" : "password",
          res?.errMessage
        );
      }
    },
  });
  return (
    <>
      {loading && <Spinner />}

      <div className="container">
        <div className="row">
          <div className="col-lg-12 mx-auto mt-4">
            <div className={`${Styles.loginForm} my-4`}>
              <h5 className="text-center">Log in to Pramply</h5>
              <SocialAuth label="Login" />
              <form onSubmit={formik.handleSubmit}>
                <div className="row">
                  <TextInput
                    label="Email address"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    // onBlur={formik.handleBlur}
                    error={formik.touched.email && formik.errors.email}
                  />

                  <div className="col-lg-12 my-2">
                    <label className="my-1">
                      Password <b className="text-danger">*</b>
                    </label>
                    <div className="input-group">
                      <input
                        type={passwordType}
                        placeholder="Password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        className="form-control passwordField"
                        style={{borderRight:"1px solid white"}}
                      />

                      <span style={{backgroundColor:"white"}} className="input-group-text" onClick={ () => setPasswordType(passwordType=='text' ? 'password':'text')}>
                        {" "}
                        <i className={`bi bi-${passwordType=='text' ? 'eye-slash-fill':'eye-fill'}`} ></i>
                      </span>
                    </div>

                    {formik.errors.password && formik.touched.password && (
                      <div
                        className="text-danger"
                        style={{ fontSize: ".875em" }}
                      >
                        {formik.errors.password}
                      </div>
                    )}
                  </div>
                </div>

                <div className="d-grid mt-2">
                  <button className="btn btn-primary fw-bold" type="submit">
                    Login
                  </button>
                </div>
              </form>
              <div className={`${Styles.loginFooter} text-center py-2`}>
                <span>
                  Don&apos;t have an account?{" "}
                  <Link href="/signup">Signup here</Link> <br></br>
                </span>
                <span>
                  Forget your password?{" "}
                  <Link href="/forgetPassword">Reset it here</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
export default Login;
