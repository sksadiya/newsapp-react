import PropTypes from 'prop-types'
import React, { Component } from 'react'
import loading from './loader.gif'

export class Spinner extends Component {
  static propTypes = {}

  render() {
    return (
      <div className='text-center'>
        <img src={loading} alt="Loading..." />
      </div>
    )
  }
}

export default Spinner