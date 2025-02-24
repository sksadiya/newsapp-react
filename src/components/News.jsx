import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
   capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  constructor(props) {
    super(props);  // it get property from parent class
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
      hasMore: true
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
    this.props.setProgress(20);
    this.setState({
      loading: true
    })
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.props.setProgress(40);
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      page : page,
      loading: false,
      totalResults: parsedData.totalResults,
      hasMore: parsedData.articles.length > 0 && parsedData.articles.length < parsedData.totalResults
    })
    this.props.setProgress(100);
  }
  fetchMoreData = async () => {
    if (!this.state.hasMore) return; 
    this.setState({ loading: true });
    setTimeout(async () => {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState((prevState) => ({
        articles: this.state.articles.concat(parsedData.articles),
        page: this.state.page + 1,
        loading: false,
        totalResults: parsedData.totalResults,
        hasMore: prevState.articles.length + parsedData.articles.length < parsedData.totalResults && parsedData.articles.length > 0 
      }));
    }, 1500); 
  };
 async componentDidMount() {
    this.fetchNews(this.state.page);
  }
  
  render() {
    return (
      <>
        <h2 className='text-center my-3'>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h2>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={this.state.hasMore ? <Spinner /> : null} 
        >
      <div className='container py-5'>
          <div className="row">
          {this.state.articles.map((element) => {
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
          </InfiniteScroll>
      </>
    )
  }
}

export default News