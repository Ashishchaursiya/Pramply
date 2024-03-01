import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TextInput from './textInput';
import SelectInput from './selectInput';
import * as Yup from "yup";
import { useFormik } from "formik";
import { updateUserDetails } from '@/utils/userProfileAction';
import { toast } from 'react-toastify';
import Spinner from './spinner';

function ProfileDetailsModal({showProfileDetails,setShowProfileDetails,userDetails,setIsProfileUpdated}) {
  const [loading,setLoading] = useState(false)
    const validationSchema = Yup.object().shape({
      first_name: Yup.string().required("First Name is required"),
      last_name: Yup.string().required(" Last Name is required"),
        user_name: Yup.string().required("UserName is required"),
        gender: Yup.string().required("gender is required"),
        total_experience: Yup.string().required("Experience is required"),
       
      });
      const formik = useFormik({
        initialValues: {
          first_name: userDetails?.first_name,
          last_name:userDetails?.last_name,
          user_name: userDetails?.user_name,
          gender: userDetails?.gender,
          total_experience:userDetails?.total_experience
        
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
          let finalPayload = {...values}
          if((userDetails?.user_name==formik.values.user_name)){
            delete finalPayload?.user_name
          } 
          
          
           let updateRes = await updateUserDetails(finalPayload,setLoading)
           if(updateRes?.data){
            setShowProfileDetails(false)
           
           setIsProfileUpdated(prev => prev+1)
           }else{
            formik.setFieldError('user_name','Username is already exist')
            
           }
       
         
          
         
    
          
        },
      });
  

  return (
    <>
       {loading && <Spinner />}

      <Modal show={showProfileDetails} onHide={ () => setShowProfileDetails(false)} scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
                    <div className="row">
                    <TextInput
                            label="First Name"
                            name="first_name"
                            type="text"
                            value={formik.values.first_name}
                            onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            error={
                              formik.touched.first_name &&
                              formik.errors.first_name
                            }
                          />
                            <TextInput
                            label="Last Name"
                            name="last_name"
                            type="text"
                            value={formik.values.last_name}
                            onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            error={
                              formik.touched.last_name &&
                              formik.errors.last_name
                            }
                          />
                            <TextInput
                            label="UserName"
                            name="user_name"
                            type="text"
                            value={formik.values.user_name}
                            onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            error={
                              formik.touched.user_name &&
                              formik.errors.user_name
                            }
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
                            <SelectInput
                            label="Experience (In Year)"
                            name="total_experience"
                            value={formik.values.total_experience}
                            onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            error={
                              formik.touched.total_experience &&
                              formik.errors.total_experience
                            }
                            options={["Fresher", "0-3","3-5","5-10","10+"]}
                          />
                    
                    </div>

                    <div className="d-grid mt-2">
                       
                    </div>
                  </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowProfileDetails(false)}>
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

export default ProfileDetailsModal;