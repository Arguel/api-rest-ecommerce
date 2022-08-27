import './Navbar.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = ({ click }) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  return (
    // Start of nav-menu-container
    <div class="container-xxl navbar-min-h fixed-top bg-white">
      <nav className="navbar">
        <div className="navbar__logo">
          <h2>MERN Shopping Cart</h2>
        </div>
        <ul className="navbar__links">
          <li>
            <Link to="/cart" className="cart__link">
              <i className="fas fa-shopping-cart"></i>
              <span>
                Cart <span className="cartlogo__badge">{getCartCount()}</span>
              </span>
            </Link>
          </li>
          <li>
            <Link to="/">Shop</Link>
          </li>
        </ul>
      </nav>
      {/* ####################### */}
      <nav class="navbar navbar-expand-lg navbar-light m-2">
        <div class="h-40px text-center">
          <a class="navbar-brand" href="/">
            <img
              class="h-100 w-auto"
              src="../../public/img/logo/white_background/medium_logo_side/svg/medium_logo_side.svg"
              alt="side-logo"
            />
          </a>
        </div>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          {/* nav */}
          <ul class="navbar-nav align-items-center justify-content-around mx-auto col-lg-8">
            {/* Home */}
            <li class="nav-item">
              <a class="nav-link fs-5" href="/" aria-current="page">
                Home
              </a>
            </li>
            {/* About */}
            <li class="nav-item dropdown text-center">
              <a
                class="nav-link fs-5"
                href="#"
                id="navbarDropdownMenuLinkAbout"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                About
              </a>
              <ul
                class="nav-color-list dropdown-menu text-center text-lg-start"
                aria-labelledby="navbarDropdownMenuLinkAbout"
              >
                <li>
                  <a class="dropdown-item" href="../about/about-us.html">
                    About us
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="../about/locations.html">
                    Locations
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="../about/our-products.html">
                    Our products
                  </a>
                </li>
              </ul>
            </li>
            {/* Shop */}
            <li class="nav-item dropdown text-center">
              <a
                class="nav-link active fs-5"
                href="#"
                id="navbarDropdownMenuLinkShop"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Shop
              </a>
              <ul
                class="nav-color-list dropdown-menu text-center text-lg-start"
                aria-labelledby="navbarDropdownMenuLinkDrop"
              >
                <li>
                  <a class="dropdown-item" href="../shop/shop.html">
                    Catalogue
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="../shop/top-offers.html">
                    Top offers
                  </a>
                </li>
              </ul>
            </li>
            {/* Recipes */}
            <li class="nav-item dropdown text-center">
              <a
                class="nav-link fs-5"
                href="#"
                id="navbarDropdownMenuLinkRecipes"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Recipes
              </a>
              <ul
                class="nav-color-list dropdown-menu text-center text-lg-start"
                aria-labelledby="navbarDropdownMenuLinkRecipes"
              >
                <li>
                  <a class="dropdown-item" href="../recipes/classics.html">
                    Classics
                  </a>
                </li>
                <li>
                  <a
                    class="dropdown-item"
                    href="../recipes/healthy-recipes.html"
                  >
                    Healthy
                  </a>
                </li>
                <li>
                  <a
                    class="dropdown-item"
                    href="../recipes/wholemeal-recipes.html"
                  >
                    Wholemeal
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="../recipes/easy-recipes.html">
                    Easy
                  </a>
                </li>
              </ul>
            </li>
            {/* Help */}
            <li class="nav-item dropdown text-center">
              <a
                class="nav-link fs-5"
                href="#"
                id="navbarDropdownMenuLinkHelp"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Help
              </a>
              <ul
                class="nav-color-list dropdown-menu text-center text-lg-start"
                aria-labelledby="navbarDropdownMenuLinkHelp"
              >
                <li>
                  <a class="dropdown-item" href="../help/contact.html">
                    Contact
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="../help/faq/faq.html">
                    FAQ
                  </a>
                </li>
              </ul>
            </li>
            {/* Searchbar */}
            <li class="nav-item">
              <form>
                <div class="input-group">
                  <button
                    class="input-group-text nav-searchbar"
                    id="search-icon"
                    aria-label="searchbar icon"
                  >
                    <i class="fas fa-search"></i>
                  </button>
                  <input
                    type="text"
                    class="form-control nav-searchbar"
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
          <ul class="navbar-nav align-items-center justify-content-evenly min-w-179px">
            <li class="m-1 d-none d-lg-block">
              <i class="fas fa-user-circle fa-fw fs-4 h-pointer"></i>
              <span class="text-darker-4 h-pointer">Username</span>
              <span class="visually-hidden">account</span>
            </li>
            <li class="m-1 d-none d-lg-block position-relative">
              <a
                class="text-dark"
                id="cart-checkout"
                href="../cart/checkout.html"
              >
                <i class="fas fa-shopping-cart fa-fw fs-4 h-pointer"></i>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary h-pointer">
                  <span>0</span>
                  <span class="visually-hidden">cart</span>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
