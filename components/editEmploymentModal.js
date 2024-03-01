import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TextInput from "./textInput";
import SelectInput from "./selectInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  addEmployment,
  deleteEmployment,
  editEmployment,
  updateUserDetails,
} from "@/utils/userProfileAction";
import { toast } from "react-toastify";
import Spinner from "./spinner";
import DeleteModal from "./deleteModal";

function EditEmployment({
  editEmploymentModal,
  setEditEmploymentModal,
  setIsEmploymentUpdated,
  editData,
  setShowDeleteModal
}) {
  const [loading, setLoading] = useState(false);
 
  const deleteHandler = async () => {
    setShowDeleteModal(true)
    setEditEmploymentModal(false)
  
  //   let confirmRes = confirm("Do you really want to delete?")
  //  if(confirmRes){
  //   setEditEmploymentModal(false)
  //   let deleteRes = await deleteEmployment(editData?.company_id, setLoading);
  //   if (deleteRes) {
  //    // toast.success("SuccessFully Deleted");
  //     setIsEmploymentUpdated((prev) => prev + 1);
  //   }
  //  }
  
   
  };
  const validationSchema = Yup.object().shape({
    company_name: Yup.string().required("Company name is required"),
    role: Yup.string().required("Role is required"),
    start_date: Yup.string().required("start Date is required"),
    end_date: Yup.string(),
    is_current_company: Yup.string().required("IsCurrentCompany is required"),
  });
  const formik = useFormik({
    initialValues: {
      company_name: editData?.company_name,
      role: editData?.role,
      start_date: editData?.start_date,
      end_date: editData?.end_date,
      is_current_company: editData?.is_current_company == 1 ? "YES" : "NO",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let finalPayload = { ...values };
      if(finalPayload.is_current_company=='NO' && !finalPayload.end_date){
        return formik.setFieldError('end_date','End Date is required')
      }
      finalPayload.is_current_company =
        finalPayload.is_current_company == "YES" ? 1 : 0;
      //   if((userDetails?.start_date==formik.values.start_date)){
      //     delete finalPayload?.start_date
      //   }

      setEditEmploymentModal(false);
      let updateRes = await editEmployment(
        finalPayload,
        setLoading,
        editData?.company_id
      );
      if (updateRes) {
       // toast.success("SuccessFully Updated");
        formik.resetForm();
        setIsEmploymentUpdated((prev) => prev + 1);
      } else {
        toast.error("something went wrong");
      }
    },
  });

  return (
    <>
      {loading && <Spinner />}
      
      {editData && (
        <>
          <Modal
            show={editEmploymentModal}
            onHide={() => setEditEmploymentModal(false)}
            scrollable
            
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit Employment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="d-flex flex-row-reverse py-0 my-0">
                <div
                  className="text-danger addHover fw-bold py-0 my-0"
                  onClick={() =>  deleteHandler()}
                >
                  Delete
                </div>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div className="row">
                  <TextInput
                    label="Company Name"
                    name="company_name"
                    type="text"
                    value={formik.values.company_name}
                    onChange={formik.handleChange}
                    // onBlur={formik.handleBlur}
                    error={
                      formik.touched.company_name && formik.errors.company_name
                    }
                  />
                  <TextInput
                    label="Role"
                    name="role"
                    type="text"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    // onBlur={formik.handleBlur}
                    error={formik.touched.role && formik.errors.role}
                  />
                  <TextInput
                    label="Start Date"
                    name="start_date"
                    type="date"
                    value={formik.values.start_date}
                    onChange={formik.handleChange}
                    // onBlur={formik.handleBlur}
                    error={
                      formik.touched.start_date && formik.errors.start_date
                    }
                  />
                  <TextInput
                    label="End Date"
                    name="end_date"
                    type="date"
                    value={formik.values.end_date}
                    onChange={formik.handleChange}
                    // onBlur={formik.handleBlur}
                    error={formik.touched.end_date && formik.errors.end_date}
                  />
                  <SelectInput
                    label="Current company?"
                    name="is_current_company"
                    value={formik.values.is_current_company}
                    onChange={formik.handleChange}
                    // onBlur={formik.handleBlur}
                    error={
                      formik.touched.is_current_company &&
                      formik.errors.is_current_company
                    }
                    options={["YES", "NO"]}
                  />
                </div>

                <div className="d-grid mt-2"></div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setEditEmploymentModal(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" onClick={formik.handleSubmit}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
}

export default EditEmployment;
