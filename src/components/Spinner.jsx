import PropTypes from 'prop-types'
import React, { Component } from 'react'
import loading from './loader.gif'

const Spinner = () => {
    return (
      <div className='text-center'>
        <img src={loading} alt="Loading..." />
      </div>
    )
}
Spinner.propTypes = {};
export default Spinner