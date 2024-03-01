 
 
import React, { useState } from 'react';

const TextInput = ({ label, name, value, onChange ,onBlur, error,type,isExist,isEmailVerified,sendOtpHandle  }) => {
 
  
 
 
  
  return (
    <>
      <div className= {`${name=='firstName' || name=='lastName' ? 'col-lg-6 my-2':'col-lg-12 my-2' }`}>
      <label className='my-1'>
        {label} <b className="text-danger">*</b>
      </label>
      <input
        type={type}
        placeholder={label}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        className={`form-control ${(error || isExist) ? 'is-invalid' : isExist==false ? 'is-valid':''}`}
      />
      {error && <div className="text-left invalid-feedback">{error}</div>}
 
      {isExist==true ?  <div className="text-left invalid-feedback"> {`${name} is not  available`}</div> : isExist==false ? <div className="text-left valid-feedback"> {`${name} is   available`}</div>:""}
      { isEmailVerified && <div className="text-left valid-feedback"> {`email is Verified`}</div>}
      {name=='email' && !error && !isEmailVerified && isExist==false  && <div className="text-left">  <button type="button" class="btn btn-primary btn-sm" onClick={sendOtpHandle }>Please Verify Email</button> </div>}
    </div>
   
    </>
   
  );
};

export default TextInput;
