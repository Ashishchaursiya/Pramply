import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TextInput from "./textInput";
import SelectInput from "./selectInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { addEmployment, addSocialAccounts, updateUserDetails } from "@/utils/userProfileAction";
import { toast } from "react-toastify";
import Spinner from "./spinner";

function AddSocialAccounts({
  addSocialAccountsModal,
  setAddSocialAccountsModal,
  setIsSocialAccountsUpdated,
  socialAccountNames
}) {
  const [loading, setLoading] = useState(false);
  const validationSchema = Yup.object().shape({
    account_url: Yup.string().required("Account Url is required").url('Invalid URL format. Please enter a valid URL.'),
    account_name: Yup.string().required("Account Name is required"),
  });
  const formik = useFormik({
    initialValues: {
      account_url: "",
      account_name: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let finalPayload = { ...values };
      

      setAddSocialAccountsModal(false);
      let updateRes = await addSocialAccounts(finalPayload, setLoading);
      if (updateRes) {
        formik.resetForm();
        setIsSocialAccountsUpdated((prev) => prev + 1);
      } else {
        toast.error("something went wrong");
      }
    },
  });

  return (
    <>
      {loading && <Spinner />}

      <Modal
        show={addSocialAccountsModal}
        onHide={() => setAddSocialAccountsModal(false)}
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Social Accounts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              <SelectInput
                label="Account Name"
                name="account_name"
                value={formik.values.account_name}
                onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                error={
                  formik.touched.account_name && formik.errors.account_name
                }
                options={["LinkedIn", "GitHub", "Twitter"]?.filter( acc => !socialAccountNames?.includes(acc?.toLowerCase()))}
              />
              <TextInput
                label="Account Url"
                name="account_url"
                type="text"
                value={formik.values.account_url}
                onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                error={formik.touched.account_url && formik.errors.account_url}
              />
            </div>

            <div className="d-grid mt-2"></div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setAddSocialAccountsModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddSocialAccounts;
