// import './Navbar.css';
import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';

const Navbar = () => {
  // const cart = useSelector((state) => state.cart);
  // const { cartItems } = cart;

  // const getCartCount = () => {
  //   return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  // };

  return (
    // Start of nav-menu-container
    <div className="container-xxl navbar-min-h fixed-top bg-white">
      <nav className="navbar navbar-expand-lg navbar-light m-2">
        <div className="h-40px text-center">
          <Link className="navbar-brand" to="/">
            <img
              className="h-100 w-auto"
              src="/img/logo/white_background/medium_logo_side/svg/medium_logo_side.svg"
              alt="side-logo"
            />
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* nav */}
          <ul className="navbar-nav align-items-center justify-content-around mx-auto col-lg-8">
            {/* Home */}
            <li className="nav-item">
              <Link className="nav-link fs-5" to="/" aria-current="page">
                Home
              </Link>
            </li>
            {/* About */}
            <li className="nav-item dropdown text-center">
              <Link
                className="nav-link fs-5"
                to="#"
                id="navbarDropdownMenuLinkAbout"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                About
              </Link>
              <ul
                className="nav-color-list dropdown-menu text-center text-lg-start"
                aria-labelledby="navbarDropdownMenuLinkAbout"
              >
                <li>
                  <Link className="dropdown-item" to="../about/about-us">
                    About us
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="../about/locations">
                    Locations
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="../about/our-products">
                    Our products
                  </Link>
                </li>
              </ul>
            </li>
            {/* Shop */}
            <li className="nav-item dropdown text-center">
              <Link
                className="nav-link active fs-5"
                to="#"
                id="navbarDropdownMenuLinkShop"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Shop
              </Link>
              <ul
                className="nav-color-list dropdown-menu text-center text-lg-start"
                aria-labelledby="navbarDropdownMenuLinkDrop"
              >
                <li>
                  <Link className="dropdown-item" to="../shop/shop">
                    Catalogue
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="../shop/top-offers">
                    Top offers
                  </Link>
                </li>
              </ul>
            </li>
            {/* Recipes */}
            <li className="nav-item dropdown text-center">
              <Link
                className="nav-link fs-5"
                to="#"
                id="navbarDropdownMenuLinkRecipes"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Recipes
              </Link>
              <ul
                className="nav-color-list dropdown-menu text-center text-lg-start"
                aria-labelledby="navbarDropdownMenuLinkRecipes"
              >
                <li>
                  <Link className="dropdown-item" to="../recipes/classNameics">
                    Classics
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to="../recipes/healthy-recipes"
                  >
                    Healthy
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to="../recipes/wholemeal-recipes"
                  >
                    Wholemeal
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="../recipes/easy-recipes">
                    Easy
                  </Link>
                </li>
              </ul>
            </li>
            {/* Help */}
            <li className="nav-item dropdown text-center">
              <Link
                className="nav-link fs-5"
                to="#"
                id="navbarDropdownMenuLinkHelp"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Help
              </Link>
              <ul
                className="nav-color-list dropdown-menu text-center text-lg-start"
                aria-labelledby="navbarDropdownMenuLinkHelp"
              >
                <li>
                  <Link className="dropdown-item" to="../help/contact">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="../help/faq/faq">
                    FAQ
                  </Link>
                </li>
              </ul>
            </li>
            {/* Searchbar */}
            <li className="nav-item">
              <form>
                <div className="input-group">
                  <button
                    className="input-group-text nav-searchbar"
                    id="search-icon"
                    aria-label="searchbar icon"
                  >
                    <i className="fas fa-search"></i>
                  </button>
                  <input
                    type="text"
                    className="form-control nav-searchbar"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="search-icon"
                  />
                </div>
              </form>
            </li>
          </ul>
          <hr />
          {/* account-nav */}
          <ul className="navbar-nav align-items-center justify-content-evenly min-w-179px">
            <li className="nav-item d-block d-lg-flex text-center btn-login-container m-1">
              <Link
                className="nav-link btn-login rounded text-nowrap px-4 py-3 px-lg-2 py-lg-2"
                to="/login"
              >
                Log in
              </Link>
            </li>
            <li className="nav-item text-center btn-sign-up-container m-1">
              <Link
                className="nav-link btn-sign-up rounded text-nowrap px-4 py-3 px-lg-2 py-lg-2"
                to="/signup"
              >
                Sign up
              </Link>
            </li>
          </ul>
          {/* {/1* account-nav *1/} */}
          {/* <ul className="navbar-nav align-items-center justify-content-evenly min-w-179px"> */}
          {/*   <li className="m-1 d-none d-lg-block"> */}
          {/*     <i className="fas fa-user-circle fa-fw fs-4 h-pointer"></i> */}
          {/*     <span className="text-darker-4 h-pointer">Username</span> */}
          {/*     <span className="visually-hidden">account</span> */}
          {/*   </li> */}
          {/*   <li className="m-1 d-none d-lg-block position-relative"> */}
          {/*     <Link */}
          {/*       className="text-dark" */}
          {/*       id="cart-checkout" */}
          {/*       to="../cart/checkout" */}
          {/*     > */}
          {/*       <i className="fas fa-shopping-cart fa-fw fs-4 h-pointer"></i> */}
          {/*       <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary h-pointer"> */}
          {/*         <span>0</span> */}
          {/*         <span className="visually-hidden">cart</span> */}
          {/*       </span> */}
          {/*     </Link> */}
          {/*   </li> */}
          {/* </ul> */}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
