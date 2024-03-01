import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function SuccessErrorAlert({isAlertShow,setIsAlertShow,title,message,variantType}) {
  

  if (isAlertShow) {
    return (
      <Alert variant={variantType} onClose={() => setIsAlertShow(false)} dismissible>
        <Alert.Heading>{title}</Alert.Heading>
        <p>
         {message}
        </p>
      </Alert>
    );
  }
   
}

export default SuccessErrorAlert;