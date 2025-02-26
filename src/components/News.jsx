import React, { useEffect , useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
   const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    document.title = `NewsMonkey - ${capitalizeFirstLetter(props.category)}`;
    fetchNews(page);
  }, []);   

   const fetchNews = async (page) => {
    props.setProgress(20);
    setLoading(true)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    props.setProgress(40);
    console.log(parsedData);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    setPage(page);
    setHasMore(parsedData.articles.length > 0 && parsedData.articles.length < parsedData.totalResults)
    props.setProgress(100);
  }
 const fetchMoreData = async () => {
    if (!hasMore) return; 
    setLoading(true)
    setTimeout(async () => {
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
    setArticles((prevArticles) => prevArticles.concat(parsedData.articles));
    setPage((prevPage) => prevPage + 1);
    setLoading(false);
    setTotalResults(parsedData.totalResults);
    setHasMore(articles.length + parsedData.articles.length < parsedData.totalResults && parsedData.articles.length > 0);
    }, 1500); 
  };
    return (
      <>
        <h2 className='text-center' style={{ marginTop : '100px'}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines </h2>
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={hasMore ? <Spinner /> : null} 
        >
      <div className='container py-5'>
          <div className="row">
          {articles.map((element) => {
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

News.defaultProps = {
  country: 'in',
  pageSize: 6,
  category: "general",
  apiKey: "540e4b9ffcc943589eef215452d2650c"
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string,
  setProgress: PropTypes.func.isRequired
};
export default News