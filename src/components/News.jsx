import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from "prop-types";

export class News extends Component {
   capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  constructor(props) {
    super(props);  // it get property from parent class
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    }
    document.title = `NewsMonkey - ${this.capitalizeFirstLetter(this.props.category)}`;
  }
  static defaultProps = {
    country: 'in',
    pageSize: 6,
    category: "general",
    apiKey: "540e4b9ffcc943589eef215452d2650c"
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string
  }
   fetchNews = async (page) => {
    this.setState({
      loading: true
    })
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      page : page,
      loading: false,
      totalResults: parsedData.totalResults
    })
  }
 async componentDidMount() {
    this.fetchNews(this.state.page);
  }
  handlePreviousClick = () => {
    this.fetchNews(this.state.page - 1);
  }
  handleNextClick = () => {
    this.fetchNews(this.state.page + 1);
  }
  render() {
    return (
      <>
      <div className='container py-5'>
        <h2 className='text-center'>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h2>
        <div className="row">
          {this.state.loading && <Spinner/>}
          {!this.state.loading && this.state.articles.map((element) => {
        return <div className='col-lg-4 col-md-4 col-sm-2 my-3' key={element.url}>
         <NewsItem  title={element.title ? element.title.slice(0, 45) : "No Title Available"}
          description={element.description ? element.description.slice(0, 88) : "No Description Available"}
          author={element.author ? element.author : "Unknown"}  date={element.publishedAt}
           imageUrl={element.urlToImage ? element.urlToImage : "https://gizmodo.com/app/uploads/2025/02/NVS-02-launch.jpeg"}
           newsUrl={element.url} source={element.source.name}/>
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