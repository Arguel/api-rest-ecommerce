const Banner = () => {
  return (
    <section className="container-xl my-5">
      <div
        id="banner-carousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner rounded">
          {/* banner-1 */}
          <div className="carousel-item active">
            <a className="h-opacity-1" href="top-offers.html">
              <figure className="m-0">
                <img
                  className="img-fluid"
                  src="/img/shop/shop/banner/pizza-banner.webp"
                  alt="pizza-banner"
                />
              </figure>
            </a>
          </div>
          {/* banner-1 */}

          {/* banner-2 */}
          <div className="carousel-item">
            <a className="h-opacity-1" href="top-offers.html">
              <figure className="m-0">
                <img
                  className="img-fluid"
                  src="/img/shop/shop/banner/fry-banner.webp"
                  alt="fry-banner"
                />
              </figure>
            </a>
          </div>
          {/* banner-2 */}

          {/* banner-3 */}
          <div className="carousel-item">
            <a className="h-opacity-1" href="top-offers.html">
              <figure className="m-0">
                <img
                  className="img-fluid"
                  src="/img/shop/shop/banner/chicken-banner.webp"
                  alt="chicken-banner"
                />
              </figure>
            </a>
          </div>
          {/* banner-3 */}
        </div>

        {/* controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#banner-carousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#banner-carousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
        {/* controls */}
      </div>
    </section>
  );
};

export default Banner;
