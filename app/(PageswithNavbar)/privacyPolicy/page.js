"use client"
import Footer from "@/components/footer";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";

const PrivacyPolicy = () => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    return <> 
    <div  className={ isMobile ? '':'expandContent'}>
    <header className="header">
        <h2>Pramply Privacy Policy</h2>
        <p> We Protect your privacy across app</p>
       
    </header>
 
    <section className="section">
        <h4>Effective Date: 01 Feb 2024</h4>

        <p>Thank you for using Pramply, a web application designed to facilitate one-to-one virtual discussions and networking opportunities. Your privacy is important to us, and we are committed to protecting the personal information you share with us. This Privacy Policy outlines how we collect, use, share, and protect your information when you use our website and services.</p>

        <h4>1. Information We Collect:</h4>
        <p>a. <strong>Information You Provide:</strong> When you create an account on Pramply, we may collect personal information such as your name, email address, and other relevant details. Additionally, we may collect information you provide when using our platform, including ratings, and feedback.</p>
        <p>b. <strong>Automatically Collected Information:</strong> We may automatically collect certain information when you visit our website or use our services, browser type, device identifiers, and other usage data. We may also use cookies and similar technologies to enhance your user experience and personalize content.</p>

        <h4>2. Use of Information:</h4>
        <p>a. We use the information collected to provide, maintain, and improve our services, including facilitating virtual discussions, connecting users with similar interests, and enabling peer ratings and feedback.</p>
        <p>b. We may use your information to communicate with you about our services, updates, and promotions, as well as respond to your inquiries and feedback.</p>
        <p>c. We may use aggregated and anonymized data for analytical purposes, including to understand user behavior, trends, and preferences.</p>

        <h4>3. Sharing of Information:</h4>
        <p>a. We do not share your personal information with third parties, except as described in this Privacy Policy or with your explicit consent.</p>
        <p>b. We may share your information with other users of Pramply solely for the purpose of facilitating virtual discussions and networking opportunities. However, we do not disclose personal information such as email addresses without your explicit consent.</p>

        <h4>4. Data Security:</h4>
        <p>We employ industry-standard security measures to protect your information from unauthorized access, disclosure, alteration, or destruction. However, please be aware that no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.</p>

        <h4>5. Your Choices:</h4>
        <p>a. You may update or correct your account information at any time by accessing your account settings on Pramply.</p>
        <p>b. You may opt-out of receiving promotional communications from us by following the unsubscribe instructions provided in such communications or by contacting us directly.</p>

        <h4>6. Children&lsquo;s Privacy:</h4>
        <p>Pramply is not intended for use by children under the age of 13, and we do not knowingly collect personal information from individuals under 13 years of age. If you believe that we have inadvertently collected information from a child under 13, please contact us immediately, and we will take appropriate steps to remove such information from our systems.</p>

        <h4>7. Changes to this Privacy Policy:</h4>
        <p>We reserve the right to update or modify this Privacy Policy at any time. If we make material changes to the policy, we will notify you by posting a revised version on our website or through other means as required by law. Your continued use of Pramply after the effective date of the revised Privacy Policy constitutes your acceptance of the changes.</p>

        <h4>8. Contact Us:</h4>
        <p>If you have any questions, concerns, or comments about this Privacy Policy or our privacy practices, please contact us at contact@pramply.com.</p>

        <p>Thank you for trusting Pramply with your information.</p>
    </section>
    </div>
       
 
    <Footer   />
    </>
}
export default PrivacyPolicy;