"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ChatUI from "@/components/chat";
import FullPageLoader from "@/components/fullPageLoader";
import Styles from "./video.module.css";
import { WEB_SOCKET_URL } from "@/utils/constants";
import AlertModal from "@/components/alertModal";
const TestCall = ( ) => {
   
  var topicObj =  typeof window !== "undefined" && JSON.parse(sessionStorage.getItem("topic") || "");
  var questionTimeObj =  typeof window !== "undefined" && JSON.parse(sessionStorage.getItem("QUESTIONTIME") ?? JSON.stringify({}));
  var matchingObj =  typeof window !== "undefined" && JSON.parse(sessionStorage.getItem("matchObj") || "");
  var questionLink =  typeof window !== "undefined" && JSON.parse(sessionStorage.getItem("questionObj") || "");
  var initialRole = matchingObj?.offer=='True' ? 'interviewer':'interviewee'
  const isPageReloaded =
  typeof window !== "undefined" &&
  (!window.performance.navigation || window.performance.navigation.type === 1);
  

  const router = useRouter();
  const senders = useRef([]);
  const [resendTimer, setResendTimer] = useState(-1);
  const [redirectTimer, setRedirectTimer] = useState(120);
  const [showAlertModal,setShowAlertModal] = useState(false)
  const [showChat, setShowChat] = useState(false);
  const [showChatAlert, setShowChatAlert] = useState(false);
  const [stompClient, setStompClient] = useState(null);
  const [myVideoInfo, setMyVideoInfo] = useState({
    audio: true,
    video: true,
    screen: false,
  });
  const [remoteVideoInfo, setRemoteVideoInfo] = useState({
    audio: true,
    video: true,
    screen: false,
  });
  const [localStream, setLocalStream] = useState(null);
  const [userRole, setRole] = useState(initialRole);
  const [isOnline, setIsOnline] = useState(true);
  const [loading,setLoading] = useState(true)
  const [remoteStream, setRemoteStream] = useState(null);
  const userVideoRef = useRef(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const dataChannel = useRef(null);
  const remoteUserVideoRef = useRef(null);
  const sharedScreenVideoRef = useRef(null);
  const localStramRef = useRef(null);
  const peerConnectionRef = useRef(null); // Use useRef for peerConnection
  const token = Cookies.get("token");
  const servers = {
    iceServers: [
      {
        urls: [
          "stun:stun1.1.google.com:19302",
          "stun:stun2.1.google.com:19302",
        ],
      },
    ],
  };

  useEffect(() => {
    // Function to set up local media stream
    const setupLocalStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: {
            echoCancellation: true,
            autoGainControl: true,
            noiseSuppression: true,
          },
        });
        localStramRef.current = stream;
        setLocalStream(stream);
        const videoElement = userVideoRef.current;
        videoElement.srcObject = stream;
        let jwtToken = `${token}&username=${matchingObj?.user}`;
        let url1 = `${WEB_SOCKET_URL}=${jwtToken}`;
        const socket = new SockJS(url1);
        const stomp = over(socket);

        const headers = {
          Authorization: `Bearer ${jwtToken}`,
        };
        stomp.connect(headers, async (frame) => {
          let privatemessSub = stomp.subscribe(
            "/user/" + matchingObj?.user + "/private",
            (payload) => {
              onPrivateMessage(payload, stomp);
            }
          );
          setStompClient(stomp);
        });

        //videoElement.play();
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };

    setupLocalStream();
    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    return () => {
      // Clean up the local media stream when the component unmounts
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
      localStream?.getTracks().forEach(function (track) {
        track.stop();
      });
    };
  }, []); // Run once on component mount
  const handleOnlineStatusChange = async () => {
    if (navigator.onLine) {
      setIsOnline(navigator.onLine);
    }
  };
  const onPrivateMessage = async (payload, stomp) => {
    let receivedMesssage = JSON.parse(payload.body);
    let receivedAnswer = JSON.parse(receivedMesssage.offer);
    if (
      receivedAnswer?.type == "answer" &&
      (matchingObj?.offer == "True" || isPageReloaded)
    ) {
      addAnswer(receivedAnswer);
    }

    if (
      (matchingObj?.offer == "False" || isPageReloaded) &&
      receivedAnswer?.type == "offer"
    ) {
      let answer = await createAnswer(receivedAnswer, stomp);
    }
  };

  const createPeerConnection = async (sdpType, memberId, stomp) => {
    peerConnectionRef.current = new RTCPeerConnection(servers);

    const remoteMediaStream = new MediaStream();

    const videoElement = remoteUserVideoRef.current;
    videoElement.srcObject = remoteMediaStream;

    localStramRef?.current?.getTracks().forEach((track) => {
      senders.current.push(
        peerConnectionRef.current.addTrack(track, localStramRef.current)
      );
    });
 
    peerConnectionRef.current.oniceconnectionstatechange = () => {
      if (
        peerConnectionRef.current.iceConnectionState === 'connected' ||
        peerConnectionRef.current.iceConnectionState === 'completed'
      ) {
         setLoading(false)
        if (stompClient) {
         
          // stompClient.unsubscribe();
          // stompClient.disconnect();
         // dataChannel.current.send(JSON.stringify({type:"connection",message:'connected'}));
        }
      }
    };
    peerConnectionRef.current.ontrack = async (event) => {
    
      setRemoteStream(event.streams[0]);
      event.streams[0].getTracks().forEach((track) => {
        remoteMediaStream.addTrack(track);
      });
    };
  
   

    peerConnectionRef.current.onicecandidate = async (event) => {
      if (event.candidate === null) {
        let chatMessage = {
          senderName: matchingObj.user,
          receiverName: matchingObj.peer,
          message: `message from ${matchingObj.user}`,
          offer: JSON.stringify(peerConnectionRef.current.localDescription),
        };
        (stompClient || stomp)?.send(
          "/app/private-message",
          {},
          JSON.stringify(chatMessage)
        );
      }
    };
  
  };

  const createOffer = async (memberId) => {
    await createPeerConnection("offer-sdp", memberId);

    dataChannel.current = peerConnectionRef.current.createDataChannel("chat");

    dataChannel.current.onmessage = receivedMessageHandle;

    dataChannel.current.onopen = () => {
      
    };

    dataChannel.current.onclose = () => {
      
    };
    const offer = await peerConnectionRef.current.createOffer();
    await peerConnectionRef.current.setLocalDescription(offer);

    return offer;
    // setOfferSDP(JSON.stringify(offer));
  };
  const receivedMessageHandle = (event) => {
    const receivedMessage = JSON.parse(event.data);

    // Handle incoming chat messages
    if (receivedMessage?.type === "chat" && receivedMessage?.message) {
      setShowChatAlert(true)
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { sender: matchingObj.peer, message: receivedMessage.message },
      ]);
    }
    if(receivedMessage?.type == 'questionChat' && receivedMessage?.message){
      setShowChatAlert(true)
      const questionnUrl =  receivedMessage?.message?.split('@')[0]
      const question =  receivedMessage?.message?.split('@')[1]
      const questionWithUrl = <a target="_blank" href={questionnUrl}> {question} </a>
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { sender: matchingObj.peer, message: questionWithUrl },
      ]);
    }
    if (receivedMessage?.type === "info" && receivedMessage?.message) {
      setRemoteVideoInfo(receivedMessage?.message);
    }
    if (receivedMessage?.type === "roleChange" && receivedMessage?.message) {
     
      setRole(receivedMessage?.message);
      setResendTimer(-1)
    }
    if (receivedMessage?.type === "endCall" && receivedMessage?.message) {
      peerConnectionRef.current.close();
      router.push(`/feedback`, { scroll: false });
    }
    if (receivedMessage?.type === "timer" && receivedMessage?.message) {
      setResendTimer(receivedMessage?.message)
    }
     
     
  };
  const createAnswer = async (offer, stomp) => {
    await createPeerConnection("answer-sdp", "fff", stomp);
    peerConnectionRef.current.ondatachannel = (event) => {
      dataChannel.current = event.channel;
      dataChannel.current.onmessage = receivedMessageHandle;
    };
    // const offer = offerSDP ? JSON.parse(offerSDP) : null;
    // if (!offer) return alert('Retrieve offer from peer first...');

    await peerConnectionRef.current.setRemoteDescription(offer);

    const answer = await peerConnectionRef.current.createAnswer();

    await peerConnectionRef.current.setLocalDescription(answer);

    //setAnswerSDP(JSON.stringify(answer));
    return answer;
  };

  const addAnswer = async (answer) => {
    // stompClient?.unsubscribe()
    // stompClient?.disconnect();
    // let answer = answerSDP ? JSON.parse(answerSDP) : null;
    // console.log('answer',answer)
    if (!answer) return alert("Retrieve answer from peer first...");

    try {
      if (!peerConnectionRef.current.currentRemoteDescription) {
        peerConnectionRef.current.setRemoteDescription(answer);
      }
    } catch (error) {
      console.error("Error setting remote description:", error);
    }
  };
  useEffect(() => {
    if(loading==false && redirectTimer>0){
      setRedirectTimer(-1)
    }
    if(loading==true && redirectTimer==0){
      window?.location?.reload()
     // router.push(`/`, { scroll: false });
    }
    if ( redirectTimer > 0) {
      const timer = setInterval(() => {
        setRedirectTimer(prevTimer => prevTimer - 1);
      }, 1000);
  
      return () => {
        clearInterval(timer);
      };
    } 
  }, [redirectTimer]);
  useEffect(() => {
    async function sendOffer() {
      if (
        (stompClient?.connect && matchingObj.offer == "True") ||
        isPageReloaded
      ) {
        let offer = await createOffer();

       
      }
    }

    sendOffer();
  }, [stompClient]);
  const endScreenSharing = () => {
    const infoObj = { ...myVideoInfo, screen: false };
    setMyVideoInfo(infoObj);
    let chatMessage = {
      type: "info",
      message: infoObj,
    };
    dataChannel.current.send(JSON.stringify(chatMessage));
    // Replace track back to the original local stream for each sender
    senders.current
      .filter((sender) => sender.track.kind == "video")
      .forEach((sender) => {
        const localVideoTrack = localStramRef.current.getVideoTracks()[0];
        sender.replaceTrack(localVideoTrack);
      });

    // Update userVideoRef to display local stream
    // userVideoRef.current.srcObject = localStramRef.current;
  };
  const toggleScreenSharing = async () => {
    try {
      if (remoteVideoInfo?.screen) {
        return toast.error("Screen Sharing Already Enabled by Peer");
      }

      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        cursor: true,
      });

      // Get the kind of the original track
      const originalTrackKind = localStramRef.current.getVideoTracks()[0].kind;

      // Replace video track in all senders with the same kind

      senders.current
        .filter((sender) => sender.track.kind == "video")
        .forEach((sender) => {
          const videoTrack = screenStream
            .getTracks()
            .find((track) => track.kind === originalTrackKind);

          if (videoTrack) {
            sender.replaceTrack(videoTrack);
          }
        });

      // Update userVideoRef to display shared screen
     
      const sharedScreenVideoElement = sharedScreenVideoRef.current;
      sharedScreenVideoElement.srcObject = screenStream;
      const infoObj = { ...myVideoInfo, screen: true };
      setMyVideoInfo(infoObj);
      let chatMessage = {
        type: "info",
        message: infoObj,
      };
      dataChannel.current.send(JSON.stringify(chatMessage));
      // Handle onended event
      screenStream.getVideoTracks()[0].onended = endScreenSharing;
    } catch (error) {
      console.error("Error accessing screen sharing:", error);
    }
  };

  const toggleVideo = () => {
    const infoObj = { ...myVideoInfo, video: !myVideoInfo?.video };
    setMyVideoInfo(infoObj);
    let chatMessage = {
      type: "info",
      message: infoObj,
    };
    dataChannel.current.send(JSON.stringify(chatMessage));
    const videoTracks = localStramRef.current.getVideoTracks();

    if (videoTracks.length > 0) {
      videoTracks.forEach((track) => {
        track.enabled = !track.enabled;
      });
    }
  };
  const toggleAudio = () => {
    const infoObj = { ...myVideoInfo, audio: !myVideoInfo?.audio };
    setMyVideoInfo(infoObj);
    let chatMessage = {
      type: "info",
      message: infoObj,
    };
    dataChannel.current.send(JSON.stringify(chatMessage));
    const audioTracks = localStramRef.current.getAudioTracks();

    if (audioTracks.length > 0) {
      audioTracks.forEach((track) => {
        track.enabled = !track.enabled;
      });
    }
  };
  const endCall = () => {
    
    let chatMessage = {
      type: "endCall",
      message: "endCall",
    };
    dataChannel.current.send(JSON.stringify(chatMessage));
    localStream.getTracks().forEach(function (track) {
      track.stop();
    });
    peerConnectionRef.current.close();
    router.push(`/feedback`, { scroll: false });
  };

  const sendChatMessage = (message,isQuestionUrl) => {

    if (message) {
      let questionChatMessage = {
        type:"questionChat",
        message:`${questionLink?.questionUrl}@${questionTimeObj?.question}`
      }
      let chatMessage = {
        type: "chat",
        message: message,
      };

      setChatMessages((prevMessages) => [
        ...prevMessages,
        { sender: matchingObj.user, message: message },
      ]);
      // Send chat messages through the data channel
      dataChannel.current.send(JSON.stringify(isQuestionUrl ? questionChatMessage:chatMessage));
    }
  };
const changeRoleHandle  = () => {
  const changeRole=  userRole=='interviewer' ?  'interviewee':'interviewer'
  let chatMessage = {
    type: "roleChange",
    message: userRole,
  };
  setRole(changeRole)
  dataChannel.current.send(JSON.stringify(chatMessage));
  if(resendTimer>0){
    setResendTimer(-1)
  }
}
const startTimer = () => {
  dataChannel.current.send(JSON.stringify( {
    type: "timer",
    message: questionTimeObj?.time*60,
  }));
  setResendTimer(questionTimeObj?.time*60)
   
}
useEffect(() => {
  if (resendTimer > 0) {
    const timer = setInterval(() => {
      setResendTimer(prevTimer => prevTimer - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  } 
}, [resendTimer]);
function convertSecondsToTime(seconds) {
  if (typeof seconds !== 'number' || seconds < 0) {
     return
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return {
    min: minutes,
    sec: remainingSeconds<10 ? `0${remainingSeconds}`:remainingSeconds,
  };
}
 const timerUi = () => {
  if(userRole=='interviewer' && resendTimer<0){
return <div className="my-1 bg-primary text-white fw-bold px-1 addHover"   style={{
        
  borderRadius: "3px",
  height: "28px",
}} onClick={startTimer}> start timer </div>
  }
  if(resendTimer>0){
    return <div className="my-1 bg-primary text-white fw-bold px-1"   style={{
            
      borderRadius: "3px",
      height: "28px",
    }}> {`Time Left : ${convertSecondsToTime(resendTimer)?.min}:${convertSecondsToTime(resendTimer)?.sec}`} </div>
      }
      if(resendTimer==0){
        return <div className="my-1  bg-danger text-white fw-bold px-1"   style={{
                
          borderRadius: "3px",
          height: "28px",
        }}> Time up </div>
          }
          return <div className="my-1 px-1"> </div>
 }
  return (
    <>
 {loading &&  <FullPageLoader label={'Trying to match peer'} />}
 <AlertModal  message="Are you sure want to end session"  title="Warning" actionHandle={endCall} show={showAlertModal} setShow={setShowAlertModal} />
    <div style={{display:loading ? 'none':'block'}}>
      
      <ChatUI {...{ chatMessages, showChat, setShowChat, sendChatMessage,userRole}} question={questionTimeObj?.question} questionLink={questionLink?.questionUrl}/>
      <div className={`${Styles.vidoeTopHeaderWeb} justify-content-around shadow my-2`} style={{maxHeight:"46px", height: '46px'}}>
        <div className="my-1">
          {topicObj?.topic!=='Communication' &&  <img
            src="/img/SWITCH.png"
            width="120px"
            height="32px"
            className="addHover"
            onClick={changeRoleHandle}
          />}
          
        </div>
        <div className="my-1">
           <h5 className={`${Styles.youAreText}`}>  {topicObj?.topic=='Communication' ? 'Dicuss on any topic': `You are ${userRole}` } </h5>
          
        </div>
        {topicObj?.topic!=='Communication' ? timerUi():<div className="my-1 px-1"> </div>  }
        
      </div>
      <div className={`${Styles.vidoeTopHeaderMob} justify-content-center shadow`} style={{maxHeight:"38px"}}>
        <div className="my-1">
          <img
            src="/img/navlogo.png"
            width="41px"
            height="41px"
            className="addHover"
          />
        </div>
        <div className="my-1">
          <img
            src="/img/introtextc.png"
            width="169px"
            height="33px"
            className="addHover"
          />
        </div>
        
      </div>
      <div  className={`${myVideoInfo?.screen ? Styles.sharingContainer : "block"} mt-4 container justify-content-center`}>

      <div
        className={`${myVideoInfo?.screen ? Styles.SharedSc : Styles.IfNotSharedSc} video-container ` }
        style={{width: "95%",
          margin: "0 auto"}}
      >
        <video
          className="video-element"
          ref={sharedScreenVideoRef}
          id="screenshare"
          style={{ objectFit: 'fill',
          width: '82vw',
          height: '76vh', }}
          // style={{ height: "100%", width: "100%" }}
          autoPlay
          playsInline
        ></video>
      </div>

      <div id="videos" className={`${myVideoInfo?.screen ? Styles.twoVideoMain : Styles.IfNottwoVideoMain } container justify-content-center`}>
        <div className={`${remoteVideoInfo?.screen ?  Styles.remoteShareVideo:`${Styles.not} not`} w-100`}>
          <video
            ref={userVideoRef}
            id="videos"
            autoPlay
            playsInline
            muted
            style={{display:myVideoInfo.video ? 'inline':'none'}}
            className={`${
              myVideoInfo?.screen ? "screenaftersharing" : "videos"
            }`}
          ></video>
      <div
      className={`${myVideoInfo?.screen ? Styles.twoVideoOffMain : Styles.IfNottwoVideoOffMain } `}
      style={{
        
        display: myVideoInfo.video ? 'none':'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // width: '100%',
        // height: '70vh',
        // width: '100%',
        // height: '100%',
        backgroundColor: '#000', // Set a background color if needed
        color: '#fff', // Set text color
        fontSize: '18px', // Adjust the font size
      }}
    >
      {matchingObj && matchingObj.user}
    </div>
        </div>
   
        <div className={`${myVideoInfo?.screen ? '' : 'mx2'} ${remoteVideoInfo?.screen ?  Styles.remoteShareScreen:`${Styles.not} not`} w-100 `} >
          <video
            ref={remoteUserVideoRef}
            style={{display:remoteVideoInfo.video ? 'inline':'none'}}
            id="videos"
            autoPlay
            playsInline
            className={`${
              myVideoInfo?.screen ? "screenaftersharing" : "videos"
            }`}
          ></video>
             <div
             className={`${Styles.offVideoName} ${myVideoInfo?.screen ? Styles.twoVideoOffMain : Styles.IfNottwoVideoOffMain }` }
            //  className={`${myVideoInfo?.screen ? Styles.twoVideoOffMain : Styles.IfNottwoVideoOffMain } `}
      style={{

        display: remoteVideoInfo.video ? 'none':'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // width: '100%',
        // height: '70vh',
        // width: '100%',
        // height: '100%',
        backgroundColor: '#000', // Set a background color if needed
        color: '#fff', // Set text color
        fontSize: '18px', // Adjust the font size
      }}
    >
      {matchingObj && matchingObj.peer}
    </div>
        </div>
      </div>
      </div>
       
      {
  !loading &&  <div
  className={`d-flex ${Styles.featureBar} bg-primary pt-1 text-white mx-auto text-center fixed-bottom`}
  style={{
    borderRadius: "5px",
    justifyContent: "space-between",
    padding: "6px"
  }}
>
  <div className="">
    {" "}
    <img
      src={
        myVideoInfo?.audio
          ? "/img/icon-mic-on.png"
          : "/img/icon-mic-off.png"
      }
      width="30px"
      height="30px"
      className="addHover"
      onClick={toggleAudio}
    />
    <b className="d-block">{myVideoInfo?.audio ? "Mute" : "Unmute"}</b>
  </div>
  <div className="mx-2">
    {" "}
    <img
      src={
        myVideoInfo?.video
          ? "/img/icon-camera-on.png"
          : "/img/icon-camera-off.png"
      }
      width="30px"
      height="30px"
      className="addHover"
      onClick={toggleVideo}
    />
    <b className="d-block">
      {myVideoInfo?.video ? "stop video" : "start video"}
    </b>
  </div>
  {topicObj?.topic!=='Communication' &&  <div className={`mx-2 ${Styles.startSharingBtn}`}>
    {" "}
    <img
      src={
        myVideoInfo?.screen
          ? "/img/icon-share-screen-off.png"
          : "/img/icon-share-screen-on.png"
      }
      width="30px"
      height="30px"
      className="addHover"
      onClick={
        myVideoInfo?.screen ? endScreenSharing : toggleScreenSharing
      }
    />
    <b className="d-block">
      {myVideoInfo?.screen ? "stop sharing" : "start sharing"}
    </b>
  </div>}
  
  <div className="mx-2">
    {" "}
    <img
      src={"/img/icon-chat.png"}
      width="30px"
      height="30px"
      className="addHover"
      onClick={() =>
        {
          setShowChat(true)
          setShowChatAlert(false)
        }
        
      }
    />
    {showChatAlert &&
    <span style={{
      bottom: '70%',
 [topicObj?.topic === 'Communication' ? 'left' : 'left']: topicObj?.topic === 'Communication' ? 'communicationChatIcon' : 'nonCommunicationChatIcon'
    }} className="alertB position-absolute top-1 translate-middle p-1 bg-danger border border-light rounded-circle">
    <span class="visually-hidden">New alerts</span>
  </span> 
    } 
    <b className="d-block">{"chat"}</b>
  </div>
  <div className="mx-2">
    {" "}
    <img
      src={"img/icon-end-session.png"}
      width="30px"
      height="30px"
      className="addHover"
      onClick={ () => setShowAlertModal(true)}
    />
    <b className="d-block">{"End"}</b>
  </div>
</div>
}
      
    </div>
    </>
    
  );
};

export default TestCall;
