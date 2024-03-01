import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TextInput from "./textInput";
import SelectInput from "./selectInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  addEmployment,
  deleteEducation,
  deleteEmployment,
  editEducation,
  editEmployment,
  getDegreeNames,
  updateUserDetails,
} from "@/utils/userProfileAction";
import { toast } from "react-toastify";
import Spinner from "./spinner";
import DeleteModal from "./deleteModal";

function EditEducation({
  editEducationModal,
  setEditEducationModal,
  setIIsEducationUpdated,
  editData,
}) {
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [degreeData,setDegreeData] = useState([])
  useEffect ( () => {
async function fetchDegreeData(){
let degrees = await getDegreeNames()

setDegreeData(degrees)
}
fetchDegreeData()
  },[])
  const deleteHandler = async () => {
    let confirmRes = confirm("Do you really want to delete?")
   if(confirmRes){
    setEditEducationModal(false)
    let deleteRes = await deleteEducation(editData?.education_id, setLoading);
    if (deleteRes) {
      //toast.success("SuccessFully Deleted");
      setIIsEducationUpdated((prev) => prev + 1);
    }
   }
  
   
  };
  const validationSchema = Yup.object().shape({
    institution_name: Yup.string().required("Institution name is required"),
    specialization: Yup.string().required("Specialization is required"),
      start_date: Yup.string().required("start Date is required"),
      end_date: Yup.string().required("End Date is required"),
      degree_id: Yup.string().required("Degree is required"),
  });
  const formik = useFormik({
    initialValues: {
      institution_name:  editData?.institution_name,
      specialization: editData?.specialization,
      start_date:  editData?.start_date,
      end_date:  editData?.end_date,
      degree_id: editData?.degree_name,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let finalPayload = { ...values };
      finalPayload.is_current_company =
      finalPayload.degree_id = degreeData?.find( deg => deg.degree_name==finalPayload?.degree_id)?.degree_id
      //   if((userDetails?.start_date==formik.values.start_date)){
      //     delete finalPayload?.start_date
      //   }

      setEditEducationModal(false);
      let updateRes = await editEducation(
        finalPayload,
        setLoading,
        editData?.education_id
      );
      if (updateRes) {
        //toast.success("SuccessFully Updated");
        formik.resetForm();
        setIIsEducationUpdated((prev) => prev + 1);
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
            show={editEducationModal}
            onHide={() => setEditEducationModal(false)}
            scrollable
            
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit Education</Modal.Title>
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
                            label="Institution"
                            name="institution_name"
                            type="text"
                            value={formik.values.institution_name}
                            onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            error={
                              formik.touched.institution_name &&
                              formik.errors.institution_name
                            }
                          />
                            <TextInput
                            label="Specialization"
                            name="specialization"
                            type="text"
                            value={formik.values.specialization}
                            onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            error={
                              formik.touched.specialization &&
                              formik.errors.specialization
                            }
                          />
                          {
                            degreeData?.length> 0 && 
                            <SelectInput
                            label="Degree"
                            name="degree_id"
                            value={formik.values.degree_id}
                            onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            error={
                              formik.touched.degree_id &&
                              formik.errors.degree_id
                            }
                            options={degreeData?.map( deg => deg.degree_name)}
                          />
                          }
                            
                            <TextInput
                            label="Start Date"
                            name="start_date"
                            type="date"
                            value={formik.values.start_date}
                            onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            error={
                              formik.touched.start_date &&
                              formik.errors.start_date
                            }
                          />
                            <TextInput
                        
                            label="End Date"
                            name="end_date"
                            type="date"
                            value={formik.values.end_date}
                            onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            error={
                              formik.touched.end_date && formik.errors.end_date
                            }
                           
                          />
                           
                    
                    </div>

                    <div className="d-grid mt-2">
                       
                    </div>
                  </form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setEditEducationModal(false)}
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

export default EditEducation;
