import React from "react";

export const ExploreTopBooks = () => {
  return (
    <div className="p-5 mb-4 bg-dark header">
      <div className="container-fluid py-5 text-white d-flex justify-content-center align-items-center">
        <div>
          <h1 className="display-5 fw-bold">Find Your next adventure</h1>
          <p className="col-md-8 fs-4">Where would you like to go next?</p>
          <a
            type="button"
            href="#"
            className="btn main-color btn-lg text-white"
          >
            Exlore top books
          </a>
        </div>
      </div>
    </div>
  );
};
