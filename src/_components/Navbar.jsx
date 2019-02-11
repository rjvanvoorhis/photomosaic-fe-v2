import React from 'react';
import { Link } from 'react-router-dom';


class Navigation extends React.Component {
  render() {
    return(
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <img
            src="https://lh3.googleusercontent.com/--WOiUxe6Od4/AAAAAAAAAAI/AAAAAAAAASM/m15oT4wZg3U/s60-p-no-il/photo.jpg"
            width="25"
            height="25"
            className="d-inline-block align-top rounded"
            alt=""
          />
          Mosaicfy
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Logout</Link>
              </li>
            </ul>
          </div>
      </nav>
    )
  }
}
export {Navigation}
