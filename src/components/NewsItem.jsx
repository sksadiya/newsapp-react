import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let {title , description , imageUrl ,newsUrl , author , date ,source } = this.props;
    return (
        <div className="card" style={{width: "100%"}}>
          <img src={imageUrl} className="card-img-top" alt={title} />
          <div className="card-body">
            <h5 className="card-title">{title}... <span className=" top-0 start-50 position-absolute translate-middle badge rounded-pill bg-success">{source}</span></h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">By {author} on {new Date(date).toGMTString()}</p>
            <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
    )
  }
}

export default NewsItem
