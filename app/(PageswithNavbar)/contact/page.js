"use client";

import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextInput from "@/components/textInput";
import { useState } from "react";
import { SendContactDetails } from "@/utils/otherUserAction";
import Spinner from "@/components/spinner";
import Footer from "@/components/footer";
import MessageModal from "@/components/messageModal";

const ContactUs = () => {
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState('')
  const [loading,setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email not found").required("Email is required"),
    name: Yup.string().required("name is required"),
    message: Yup.string(),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      let finalPayload = {
        email: values.email?.trim(),
        name: values.name?.trim(),
        message: values.message?.trim(),
      };

      await SendContactDetails(finalPayload);
      setLoading(false);
      setShow(true)
      formik.resetForm()
      setTitle("Message")
      setMessage("Thanks for contacting")
      setTimeout( () => {
        setShow(false)
      },3000)
    },
  });
  return (
    <>
      {loading && <Spinner />}
      <MessageModal  {...{message, title, show, setShow}} actionHandle={() => {}}/>
      <header className="header">
        <h2>Contact Pramply</h2>
        <p>We&lsquo;d love to hear from you!</p>
      </header>
      <section className="section">
        <h4>Contact Form</h4>
        <p>
          Have a question or feedback? Fill out the form below, and we&lsquo;ll get
          back to you as soon as possible.
        </p>

        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <TextInput
              label="Name"
              name="name"
              type="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
              error={formik.touched.name && formik.errors.name}
            />
            <TextInput
              label="Email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
              error={formik.touched.email && formik.errors.email}
            />

            <TextInput
              label="Message"
              name="message"
              type="text"
              value={formik.values.message}
              onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
              error={formik.touched.message && formik.errors.message}
            />
          </div>

          <div className="d-grid mt-2">
            <button className="btn btn-primary fw-bold" type="submit">
              Submit
            </button>
          </div>
        </form>
      </section>
      <section className="section">
        <h4>Contact Details</h4>
        <p>Address: Dharam Colony Geeta Apartment D6, Palam Vihar Extension,gurugram, Haryana, 122017</p>
        <p>Email Address: contact@pramply.com</p>
      </section>
      <Footer />
    </>
  );
};
export default ContactUs;
