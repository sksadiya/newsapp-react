import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  constructor() {
    super();  // it get property from parent class
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    }
  }
 async componentDidMount() {
    let url = `https://newsapi.org/v2/everything?q=india&apiKey=dc3de8fb334947a4a071b2b2e1e26f24&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults : parsedData.totalResults
    })
  }
  handlePreviousClick = async () => {
    let url = `https://newsapi.org/v2/everything?q=india&apiKey=dc3de8fb334947a4a071b2b2e1e26f24&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      page : this.state.page - 1,
    })
  }
  handleNextClick = async () => {
    let url = `https://newsapi.org/v2/everything?q=india&apiKey=dc3de8fb334947a4a071b2b2e1e26f24&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      page : this.state.page + 1,
    })
  }
  render() {
    return (
      <>
      <div className='container py-5'>
        <h2>NewsMonkey - Top Headlines</h2>
        <div className="row">
          {this.state.articles.map((element) => {
        return <div className='col-lg-4 col-md-4 col-sm-2 my-3' key={element.url}>
         <NewsItem  title={element.title ? element.title.slice(0, 45) : "No Title Available"}
          description={element.description ? element.description.slice(0, 88) : "No Description Available"}
           imageUrl={element.urlToImage ? element.urlToImage : "https://gizmodo.com/app/uploads/2025/02/NVS-02-launch.jpeg"}
           newsUrl={element.url}/>
           </div>
          })}
        </div>
      </div>
      <div className="container d-flex justify-content-between my-3">
        <button disabled={this.state.page<=1} className="btn btn-dark m-2" onClick={this.handlePreviousClick}>&larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark m-2" onClick={this.handleNextClick}>Next &rarr;</button>
      </div>
      </>
    )
  }
}

export default News