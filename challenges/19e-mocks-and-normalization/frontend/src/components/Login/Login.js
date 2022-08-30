import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <main>
      <section className="container-xxl my-4">
        <Link to="/">
          <figure className="text-center h-100px">
            <img
              className="h-100 w-auto"
              src="/img/logo/white_background/full_logo/svg/full_logo.svg"
              alt="TheMorfi"
            />
          </figure>
        </Link>
      </section>
      <section className="container-xxl bg-dark rounded">
        <div className="row align-items-center justify-content-evenly">
          <div className="col-md-5 d-none d-lg-block rounded my-5 min-h-400px overflow-hidden">
            <figure className="m-0 h-400px overflow-hidden rounded">
              <img
                className="img-fluid img-rez rounded"
                src="img/account/fastFood.jpg"
                alt="banner"
              />
            </figure>
          </div>
          <div className="col-11 col-sm-10 col-lg-5 bg-white rounded my-5 min-h-400px">
            <div className="d-flex align-items-center min-h-400px">
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
                    required
                  />
                  <div id="password-i-feedback" className="invalid-feedback">
                    Please provide a valid password
                  </div>
                  <span className="d-block mt-2">
                    <Link className="text-dark" to="#">
                      Forgot your password?
                    </Link>
                  </span>
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
                    Don't have an account? <Link to="/register">Sign up</Link>
                  </span>
                </div>
                {/* f-login-btn */}
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
