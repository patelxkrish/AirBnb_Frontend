import React from "react";
function Footer() {
  return (
    <div
      className="container-md text-center bg-body-secondary fs-5 "
      style={{ height: "15%" }}
    >
      <div className="mt-2">
        <i className="fa-brands fa-square-facebook"></i>&nbsp;&nbsp;&nbsp;
        <i className="fa-brands fa-square-instagram"></i>&nbsp;&nbsp;&nbsp;
        <i className="fa-brands fa-linkedin"></i>
      </div>
      <div className="f-info-brand mt-3">&copy;WanderLust Private Limited</div>
      <div className="f-info-links mt-3 ">
        <a href="/privacy" className="text-decoration-none">
          Privacy
        </a>{" "}
        &nbsp;&nbsp;&nbsp;
        <a href="/terms" className="text-decoration-none">
          Terms
        </a>
      </div>
    </div>
  );
}
export default Footer;
