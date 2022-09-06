const Items = () => {
  return (
    <section className="col-md-12 col-lg-8 col-xl-9">
      <div className="d-flex justify-content-center">
        <div className="spinner-grow text-secondary my-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      <ul className="list-unstyled" id="shop-items-display"></ul>
    </section>
  );
};

export default Items;
