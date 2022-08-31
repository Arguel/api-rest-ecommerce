import { Link } from 'react-router-dom';
import SignupForm from '../../components/SignupForm/SignupForm';

const Signup = () => {
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
      <section className="container-xxl">
        <SignupForm />
      </section>
    </main>
  );
};

export default Signup;
