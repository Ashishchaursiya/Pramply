import Link from "next/link";
function Footer({bottom}) {

  return (
    <div className={'webBottomFooter footer'}>
      <div className="">
        <footer className="text-center text-lg-start text-light footerMain">
          <section className="">
            <div className="container text-center text-md-start">
              <div className="row pt-5">
                <div className="col-md-6 col-lg-8 col-xl-8 mx-auto mb-4">
                  {/* <h6 className="text-uppercase fw-bold">Company name</h6> */}
                  <img
                    className="footerLogo"
                    src="/logo-footer-pramply.png"
                    alt="logo"
                  />
                  {/* <hr
                    className="mb-4 mt-0 d-inline-block mx-auto footerHr"
                    /> */}
                  <p>Elevate Conversations, Connect Skillfully</p>
                  <section className="d-flex py-4  footerMainSectionOne">
                    <div className="me-5">
                      <span>Follow Us</span>
                    </div>

                    <div>
                      <Link
                        href="https://www.linkedin.com/company/pramply/"
                        target="_blank"
                        className="text-black me-4"
                      >
                        <img
                          className="SocialLogo"
                          src="/img/linkden.png"
                          alt=""
                        />
                      </Link>
                      <Link
                        href="https://www.instagram.com/pramply_/"
                        target="_blank"
                        className="text-black me-4"
                      >
                        <img
                          className="SocialLogo"
                          src="/img/instagram.png"
                          alt=""
                        />
                      </Link>
                      <Link
                        href="https://www.youtube.com/@Pramply"
                        target="_blank"
                        className="text-black me-4"
                      >
                        <img
                          className="YoutubeLogo"
                          src="/img/youtube.png"
                          alt=""
                        />
                      </Link>
                    </div>
                  </section>
                </div>

                <div className="col-md-4 linksfooter col-lg-3 col-xl-2 mx-auto mb-md-0 mb-4">
                  <Link
                    href="/about"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    {" "}
                    <p> About Us</p>
                  </Link>
                  <Link
                    href="/contact"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    {" "}
                    <p> Contact Us</p>
                  </Link>
                  <Link
                    href="/howItWork"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    {" "}
                    <p> How It Works</p>
                  </Link>
                  <Link
                    href="/joinUs"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    {" "}
                    <p> Join Us</p>
                  </Link>
                  <Link
                    href="/privacyPolicy"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    {" "}
                    <p> Privacy policy</p>
                  </Link>
                </div>
              </div>
            </div>
            <hr className="footerLasthr" />
            <section>
              <div className="text-center">
                Copyright
                <img
                  className="mx-2 mb-1 copyrightFooter"
                  src="/img/icon-copyright.png"
                  alt=""
                />
                2024 Pramply
              </div>
            </section>
          </section>
        </footer>
      </div>
    </div>
  );
}

export default Footer;
