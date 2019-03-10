import React from 'react';
import { Link } from 'react-router-dom';


class Navigation extends React.Component {
  render() {
    return(
      <nav className="navbar navbar-expand-md navbar-dark bg-dark static-top" style={{minWidth: '98vw', whiteSpace: 'nowrap'}}>
        <div className="container">
          <a className="navbar-brand" style={{display: 'block'}} href="#">
            <img className="d-inline-block align-top rounded" alt="mosaicfy" src="https://lh3.googleusercontent.com/--WOiUxe6Od4/AAAAAAAAAAI/AAAAAAAAASM/m15oT4wZg3U/s60-p-no-il/photo.jpg"/>
            <span style={{display: 'flex'}}>Mosaicfy</span>
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}
export {Navigation}
