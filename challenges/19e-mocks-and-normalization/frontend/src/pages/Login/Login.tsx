import { Link } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';

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
            <div className="d-flex align-items-center justify-content-center min-h-400px">
              <LoginForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
