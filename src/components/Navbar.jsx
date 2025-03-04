import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
 
   const [categories] = useState([
      {name: 'Business' , slug: 'business' },
      {name: 'Entertainment' , slug: 'entertainment'},
      {name: 'General' , slug: '/'},
      {name: 'Health' , slug: 'health'},
      {name: 'Science' , slug: 'science' },
      {name: 'Sports' , slug: 'sports' },
      {name: 'Technology' , slug: 'technology' },
    ]);
    return (
      <div>
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark p-3">
          <div className="container-fluid">
            <Link className="navbar-brand" to={`/`}>NewsMonkey</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {categories.map((element)=> {
                  return (
                    <li key={element.slug} className="nav-item">
                      <Link className="nav-link" to={`${element.slug}`}>{element.name}</Link>
                    </li>
                  )
                })}
              </ul>
              <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
            </div>
          </div>
        </nav>
      </div>
    )
}
Navbar.propTypes = {};
export default Navbar