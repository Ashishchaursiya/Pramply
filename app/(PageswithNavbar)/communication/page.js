"use client"
import Link from "next/link";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setCountry } from "@/redux/reducers/countryLocation";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer";
const Communication = () => {
    const token = Cookies.get("token");
    const router = useRouter()
    const subscriptionData  = useSelector((state) => state.subscriptionInStore.subscriptionData);
    const country = useSelector((state) => state.location.country) || 'Other'
    const startPracticehandle = () => {
        if(!token){
          return  router.push(`/login`, { scroll: false })
        }
        if(subscriptionData?.days_left > 0){
          router.push(`/startPractice/chooseTopicLevel`, { scroll: false })
        }else if(subscriptionData?.is_premium==0 || subscriptionData?.days_left <= 0){
          router.push(`/${country}/subscription`, { scroll: false })
        }
      }
    return <> 
      
    <header className="header">
        <h4>Enhance Your English Communication</h4>
        <p>Practice and Refine Your Speaking Skills</p>
    </header>
    <section  className="section">
        <h4>Why Communication Matters:</h4>
        <p>Communication is a vital skill in personal and professional life. Here&lsquo;s why it&lsquo;s so important:</p>
        <ul>
            <li><strong>Building Relationships:</strong> Effective communication fosters positive connections with others.</li>
            <li><strong>Workplace Success:</strong> Clear communication is crucial for productivity and collaboration at work.</li>
            <li><strong>Conflict Resolution:</strong> Good communication skills help in resolving conflicts and misunderstandings.</li>
            <li><strong>Personal Development:</strong> Expressing ideas and thoughts contributes to personal growth and self-confidence.</li>
            <li><strong>Networking:</strong> Networking relies heavily on the ability to communicate and build rapport.</li>
        </ul>
        <h4>Essential Communication Skills:</h4>
        <p>Master the following skills to become a proficient communicator:</p>
        <ul>
            <li><strong>Active Listening:</strong> Paying full attention and responding thoughtfully to others.</li>
            <li><strong>Clarity in Expression:</strong> Articulating thoughts clearly and concisely.</li>
            <li><strong>Empathy:</strong> Understanding and acknowledging the feelings of others.</li>
            <li><strong>Non-Verbal Communication:</strong> Being aware of body language, facial expressions, and gestures.</li>
            <li><strong>Adaptability:</strong> Adjusting communication style based on the audience and context.</li>
        </ul>
        <h4>1. Sign Up</h4>
        <p>Create your pramply account.</p>
        <h4>2. Start Practice</h4>
        <p>Choose a communication topic. Click the  &quot;Start Practice&quot; button to find a conversation partner.</p>
        <button className="btn btn-primary mb-3" id="startPracticeBtn" onClick={startPracticehandle}>Start Practice</button>
        <h4>3. Speaking Session</h4>
        <p>Once matched, engage in a conversation. Take turns discussing the topic and practicing your English speaking skills.</p>
        <h4>4. Session Feedback</h4>
        <p>Provide constructive feedback to each other at the end of the session. Help each other improve language proficiency and communication skills.</p>
    </section>
    <Footer   />
    </>
}
export default Communication;