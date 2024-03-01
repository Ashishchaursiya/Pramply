import { sendOtp, verifyOtp } from '@/utils/authAction';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import OTPInput from 'react-otp-input';
import { toast } from 'react-toastify';

export default function EmailVerifyOtp({isOtpModalShow, setIsOtpModalShow,otp, setOtp,setVeriFiedEmails,setLoading,email,resendTimer, setResendTimer}) {
 
   const verifyOtpHandle = async () => {
    
    await verifyOtp(otp,email,setLoading,setVeriFiedEmails,setOtp)
    
   }
   const resendOtp = async () => {
    await sendOtp(email, setLoading,setIsOtpModalShow)
    setResendTimer(120)
   }
   
  return (
    <Modal
    show={isOtpModalShow}
    onHide={() => setIsOtpModalShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Email Verification
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="text-center">
                <h2>Enter Otp</h2>
                <h6> Check your email or Spam Folder for Otp</h6>
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderSeparator={<span style={{ width: "8px" }}>-</span>}
                  isInputNum={true}
                  shouldAutoFocus={true}
                  containerStyle={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding:"10px"
                  }}
                  inputStyle={{
                    border: "1px solid grey",
                    borderRadius: "8px",
                    width: "54px",
                    height: "54px",
                    fontSize: "20px",
                    color: "#000",
                    fontWeight: "700",
                    caretColor: "blue",
                  }}
                  focusStyle={{
                    border: "1px solid #CFD3DB",
                    outline: "none",
                  }}
                  renderInput={(props) => <input {...props} />}
                />
               <div>
               
               <button type="button" class="btn btn-link fw-bold" disabled={resendTimer>0 ? true : false} onClick={resendOtp}>Resend Otp {resendTimer> 0 ? `in ${resendTimer} seconds`:``}</button>
      
               </div>
              </div>
      </Modal.Body>
      <Modal.Footer>
        <Button  disabled={otp?.length<6} onClick={verifyOtpHandle}>Verify Otp</Button>
      </Modal.Footer>
    </Modal>
  );
}

 

 