import { Link, useLocation } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setCredentials } from 'features/auth/authSlice';
import { useLoginMutation } from 'features/auth/authApiSlice';

import jwtDecode, { JwtPayload } from 'jwt-decode';
import { IUser } from 'common/types/user.interface';

const LoginForm = () => {
  const emailRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  // @ts-ignore
  const from = location.state?.from?.pathname || '/';

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    //@ts-ignore
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = await login({ email, password }).unwrap();
      // @ts-ignore
      const decodedUser: IUser = jwtDecode<JwtPayload>(payload?.accessToken);
      const user: IUser = {
        email: decodedUser.email,
        firstName: decodedUser.firstName,
        permissionLevel: decodedUser.permissionLevel,
      };
      dispatch(setCredentials({ ...payload, user }));
      setEmail('');
      setPassword('');
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.originalStatus) {
        // isLoading: true until timeout occurs
        setErrMsg('No Server Response');
      } else if (err.originalStatus === 400) {
        setErrMsg('Missing Email or Password');
      } else if (err.originalStatus === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      //@ts-ignore
      errRef.current.focus();
    }
  };

  const handleEmailInput = (e): void => setEmail(e.target.value);

  const handlePasswordInput = (e) => setPassword(e.target.value);

  const content = isLoading ? (
    <div className="spinner-border text-center" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  ) : (
    <form className="row needs-validation p-2 p-sm-3" onSubmit={handleSubmit}>
      <div className={errMsg ? 'col-md-11 mx-auto mb-3' : 'd-none'}>
        <p
          ref={errRef}
          className="bg-warning text-dark fw-bold p-2 rounded m-0 text-center"
          aria-live="assertive"
        >
          {errMsg}
        </p>
      </div>
      {/* f-email */}
      <div className="col-md-11 mx-auto mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          placeholder="email@domain.com"
          id="email"
          ref={emailRef}
          value={email}
          onChange={handleEmailInput}
          autoComplete="email"
          required
        />
      </div>
      {/* f-email */}

      {/* f-password */}
      <div className="col-md-11 mx-auto mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          placeholder="password"
          id="password"
          onChange={handlePasswordInput}
          value={password}
          autoComplete="current-password"
          required
        />
      </div>
      {/* f-password */}

      {/* f-login-btn */}
      <div className="col-12 mb-3">
        <button className="btn btn-success d-block mx-auto login-w-50">
          Log in
        </button>
        <span className="d-block mt-4 text-center">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </span>
      </div>
      {/* f-login-btn */}
    </form>
  );

  return content;
};

export default LoginForm;
