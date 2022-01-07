import {useEffect, useState} from "react";
import {Link, useParams, useLocation} from "react-router-dom";
import {Container, Card, Button, Col, Row} from "react-bootstrap";
import {getMovieDetails, getSimilarMovie} from "../services/api";

import MvList from "../mycomponents/List";

// import InfiniteScroll from "react-infinite-scroll-component";

const initialValue = {
  id: "",
  title: "",
  vote_average: "",
  runtime: "",
  release_date: "",
  overview: "",
  poster_path: "",
};

const Detail = () => {
  const {id} = useParams();
  const [page, setPage] = useState(1);
  const [movieList, setMovielist] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [movieData, setMovieData] = useState(initialValue);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    setMovielist([]);
    setMovieData(initialValue);
    Mdetails();
    similarMovie();
  }, [location]);

  const Mdetails = async () => {
    const result = await getMovieDetails(id);
    setMovieData(result.data);
  };

  const similarMovie = async () => {
    const res = await getSimilarMovie(id, page);
    setMovielist(res.data.results);
    setTotalPages(res.data.total_pages);
  };

  const fetchMoreData = async () => {
    setPage(page + 1);
    const res = await getSimilarMovie(id, page);
    setMovielist(movieList.concat(res.data.results));
  };

  return (
    <Container fluid>
      <h3 className="my-5">Details</h3>
      <Row
        style={{
          background: `linear-gradient(rgba(255,255,255,.7), rgba(255,255,255,.7)), url(https://image.tmdb.org/t/p/original/${movieData.poster_path})`,
        }}
      >
        <Col md={3} style={{padding: "30px"}}>
          <img
            src={`https://image.tmdb.org/t/p/original/${movieData.poster_path}`}
            style={{maxWidth: "70%", height: "auto", display: "block", marginRight: "auto", marginLeft: "auto"}}
            alt="Responsive image"
          ></img>
        </Col>
        <Col md={9} style={{padding: "30px"}}>
          <h3>
            {movieData.title} ({movieData.vote_average}
            <i className="fas fa-star ml-1" style={{color: "#d39e00"}}></i>)
          </h3>
          <p>
            <b>Year </b>
            {movieData.release_date} <b>|</b> <b>Runtime </b>
            {movieData.runtime} min
          </p>
          <p>
            <b>Description:</b> {movieData.overview}
          </p>
        </Col>
      </Row>
      <h3 className="my-5">Similar Movies</h3>
      <MvList movieList={movieList} fetchMoreData={fetchMoreData} page={page} totalPages={totalPages}></MvList>
    </Container>
  );
};

export default Detail;
