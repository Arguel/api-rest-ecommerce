import { Link } from 'react-router-dom';

const SignupForm = () => {
  return (
    <form
      className="row g-3 needs-validation p-3 register-w-50 m-auto bg-white border border-2 rounded"
      noValidate
    >
      {/* f-fname */}
      <div className="col-sm-6">
        <label htmlFor="fname-i" className="form-label">
          First name
        </label>
        <input
          type="text"
          className="form-control"
          id="fname-i"
          placeholder="first name"
          aria-describedby="fname-i-feedback"
          required
        />
        <div id="fname-i-feedback" className="invalid-feedback">
          Please complete your first name
        </div>
      </div>
      {/* f-fname */}

      {/* f-lname */}
      <div className="col-sm-6">
        <label htmlFor="lname-i" className="form-label">
          Last name
        </label>
        <input
          type="text"
          className="form-control"
          id="lname-i"
          placeholder="last name"
          aria-describedby="lname-i-feedback"
          required
        />
        <div id="lname-i-feedback" className="invalid-feedback">
          Please complete your last name
        </div>
      </div>
      {/* f-lname */}

      {/* f-email */}
      <div className="col-sm-12">
        <label htmlFor="email-i" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email-i"
          placeholder="email@domain.com"
          aria-describedby="email-i-feedback"
          autoComplete="email"
          required
        />
        <div id="email-i-feedback" className="invalid-feedback">
          Please choose a valid email.
        </div>
      </div>
      {/* f-email */}

      {/* f-password */}
      <div className="col-sm-12">
        <label htmlFor="password-i" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password-i"
          placeholder="password"
          aria-describedby="password-i-feedback"
          autoComplete="current-password"
          required
        />
        <div id="password-i-feedback" className="invalid-feedback">
          Please provide a valid password
        </div>
      </div>
      {/* f-password */}

      {/* f-birthday */}
      <div className="col-12">
        <div className="row">
          <label htmlFor="d-month" className="form-label">
            Date of birth
          </label>
          <div className="col-12 col-sm-6">
            <select
              className="form-select"
              name="d-month"
              id="d-month"
              aria-describedby="d-month-feedback"
              required
              defaultValue="January"
            >
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
            <div id="d-month-feedback" className="invalid-feedback">
              Please select a valid month.
            </div>
          </div>
          <div className="col-12 col-sm-3">
            <label className="visually-hidden" htmlFor="d-day">
              birthday
            </label>
            <input
              type="number"
              className="form-control"
              id="d-day"
              placeholder="day"
              aria-describedby="d-day-feedback"
              required
            />
            <div id="d-day-feedback" className="invalid-feedback">
              Please provide a valid day
            </div>
          </div>
          <div className="col-12 col-sm-3">
            <label className="visually-hidden" htmlFor="d-year">
              birth-month
            </label>
            <input
              type="number"
              className="form-control"
              id="d-year"
              placeholder="year"
              aria-describedby="d-year-feedback"
              required
            />
            <div id="d-year-feedback" className="invalid-feedback">
              Please provide a valid year
            </div>
          </div>
        </div>
      </div>
      {/* f-birthday */}

      {/* f-newsletter */}
      <div className="col-md-12">
        <div className="form-check form-switch mt-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="s-newsletter"
          />
          <label className="form-check-label" htmlFor="s-newsletter">
            Suscribe to newsletter
            <i className="far fa-question-circle ms-1"></i>
          </label>
        </div>
      </div>
      {/* f-newsletter */}

      {/* f-terms */}
      <div className="col-md-12">
        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="terms-c"
            aria-describedby="terms-c-feedback"
            required
          />
          <label className="form-check-label" htmlFor="terms-c">
            I have read and agree with the <Link to="#">Terms of Service</Link>
            and <Link to="#">Privacy Notice</Link>
          </label>
          <div id="terms-c-feedback" className="invalid-feedback">
            Please agree the terms to continue
          </div>
        </div>
      </div>
      {/* f-terms */}

      {/* f-sign-up-btn */}
      <div className="col-12">
        <button className="btn btn-primary d-block mx-auto w-50">
          Sign up
        </button>
        <span className="d-block mt-4 text-center">
          Have an account? <Link to="/login">Log in</Link>
        </span>
      </div>
      {/* f-sign-up-btn */}
    </form>
  );
};

export default SignupForm;
