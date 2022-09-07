import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faTwitter,
  faYoutube,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      {/* footer-container-fluid-start */}
      <div className="container-fluid bg-darker-2">
        {/* footer-container-xxl-start */}
        <div className="container-xxl my-0">
          {/* footer-top-left-start */}
          <div className="p-3">
            <div className="text-center">
              <div className="h-100px mb-2 mx-auto">
                <img
                  className="w-100 h-100px"
                  src="/img/logo/white_background/full_logo/svg/full_logo.svg"
                  alt="logo"
                />
              </div>
              <p className="mb-0 pt-1 ff-lato-4 fw-bold">
                © 2022 Morfi. All Rights Reserved.
              </p>
            </div>
          </div>
          {/* footer-top-left-end */}
        </div>
        {/* footer-container-xxl-end */}
      </div>
      {/* footer-container-fluid-end */}

      {/* footer-container-fluid-start */}
      <div className="container-fluid bg-dark">
        {/* footer-container-xxl-start */}
        <div className="container-xxl my-0 py-3">
          {/* footer-bottom-start */}
          <ul className="list-unstyled m-2 pt-3 m-lg-0 d-flex align-items-center justify-content-center">
            <li className="p-2">
              <a
                className="p-2 bg-white text-dark rounded-circle"
                href="https://www.facebook.com/"
                aria-label="facebook icon"
              >
                <FontAwesomeIcon icon={faFacebookF} className="fa-fw fs-6" />
              </a>
            </li>
            <li className="p-2">
              <a
                className="p-2 bg-white text-dark rounded-circle"
                href="https://twitter.com/"
                aria-label="twitter icon"
              >
                <FontAwesomeIcon icon={faTwitter} className="fa-fw fs-6" />
              </a>
            </li>
            <li className="p-2">
              <a
                className="p-2 bg-white text-dark rounded-circle"
                href="https://www.youtube.com/"
                aria-label="youtube icon"
              >
                <FontAwesomeIcon icon={faYoutube} className="fa-fw fs-6" />
              </a>
            </li>
            <li className="p-2">
              <a
                className="p-2 bg-white text-dark rounded-circle"
                href="https://www.instagram.com/"
                aria-label="instagram icon"
              >
                <FontAwesomeIcon icon={faInstagram} className="fa-fw fs-6" />
              </a>
            </li>
          </ul>
          <div className="row d-flex align-items-center justify-content-around my-0 mx-auto p-3 footer-bottom">
            <div className="col-12 col-lg-8 m-2 m-lg-0">
              <ul className="list-unstyled d-flex flex-column flex-md-row m-0 justify-content-center align-items-center">
                <li className="text-center mb-4 mb-lg-0 px-3 border-end-md">
                  <Link className="footer-link text-white" to="/">
                    Terms of Use
                  </Link>
                </li>
                <li className="text-center mb-4 mb-lg-0 px-3 border-end-md">
                  <Link className="footer-link text-white" to="/">
                    Terms and Conditions
                  </Link>
                </li>
                <li className="text-center mb-4 mb-lg-0 px-3 border-end-md">
                  <Link className="footer-link text-white" to="/">
                    Privacy Policy
                  </Link>
                </li>
                <li className="text-center mb-4 mb-lg-0 px-3">
                  <FontAwesomeIcon icon={faGlobe} className="text-white pe-1" />
                  <label
                    className="visually-hidden"
                    htmlFor="change-language-bottom"
                  >
                    Language
                  </label>
                  <select
                    className="col text-center p-2 rounded bg-dark text-white"
                    name="change-language-bottom"
                    id="change-language-bottom"
                    defaultValue="English"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                  </select>
                </li>
              </ul>
            </div>
          </div>
          {/* footer-bottom-end */}
        </div>
        {/* footer-container-xxl-end */}
      </div>
      {/* footer-container-fluid-end */}
    </footer>
  );
};

export default Footer;
