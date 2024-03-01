 
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function ChatUI({chatMessages,showChat,setShowChat,sendChatMessage,userRole,question,questionLink}) {
  const [textMessage, setTextMessage] = useState('');
const sendHandle= () => {
  sendChatMessage(textMessage)
  setTextMessage('')
}
 
const sendQuestion = () => {
  const questionWithUrl = <a target="_blank" href={questionLink}> {question} </a>
  sendChatMessage(questionWithUrl,true)
}
  return (
    <>
      
      <Offcanvas show={showChat} onHide={() => setShowChat(false)} placement="end">
  <Offcanvas.Header closeButton>
    <Offcanvas.Title>Chat</Offcanvas.Title>
  </Offcanvas.Header>
  <Offcanvas.Body>
    
    <div className="d-flex flex-column justify-content-between">
      <div className='messageContainer'>
      
      {chatMessages.map((message, index) => (
            <div key={index}>
              <strong>{message.sender}:</strong> {message.message}
            </div>
          ))}
      </div>
      {userRole=='interviewer' && question &&  <button className='btn btn-primary mb-1 w-50 mx-auto' onClick={sendQuestion}>Send Question</button>}
          
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Message"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={textMessage}
          onChange={ (e) => setTextMessage(e.target.value)}
        />
        <span className="input-group-text addHover" id="basic-addon2" onClick={sendHandle}>
          Send
        </span>
      </div>
    </div>
  </Offcanvas.Body>
</Offcanvas>

    </>
  );
}

 
 

 