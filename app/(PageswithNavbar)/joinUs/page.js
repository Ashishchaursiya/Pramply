"use client"
import Footer from "@/components/footer";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";

const JoinUs = () => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    return <> 
    <div  className={ isMobile ? '':'expandContent'}>
    <header className="header">
        <h2>Join Pramply</h2>
        <p>Unlock Opportunities and Build Your Career</p>
    </header>

    <section className="section">
        <h4>Join Us</h4>
        <p>Interested in joining Pramply? Follow the instructions below:</p>
        <ol>
            <li>Send your resume to: <strong>join@pramply.com</strong></li>
            <li>Use the following subject line format: <strong>Name | ROLE | Year of Experience</strong></li>
        </ol>
    </section>
    </div>
       
 
    <Footer   />
    </>
}
export default JoinUs;