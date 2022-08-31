import { Link } from 'react-router-dom';

const LoginForm = () => {
  return (
    <form className="row needs-validation p-2 p-sm-3" noValidate>
      {/* f-email */}
      <div className="col-md-11 mx-auto mb-3">
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
      <div className="col-md-11 mx-auto mb-3">
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

      {/* f-login-btn */}
      <div className="col-12 mb-3">
        <button
          className="btn btn-success d-block mx-auto login-w-50"
          type="submit"
        >
          Log in
        </button>
        <span className="d-block mt-4 text-center">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </span>
      </div>
      {/* f-login-btn */}
    </form>
  );
};

export default LoginForm;
