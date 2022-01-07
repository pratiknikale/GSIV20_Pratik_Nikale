import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Container, Form, FormControl, Button} from "react-bootstrap";
import {getUpcommingMovies, SearchMovie} from "../services/api";
import MvList from "../mycomponents/List";

const MovieList = () => {
  const [movieList, setMovielist] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [search, setSearch] = useState("");
  const [searchState, setSearchState] = useState(false);
  const [Cancel, setCancel] = useState(true);

  useEffect(() => {
    upcommingMovies();
  }, [Cancel]);

  const upcommingMovies = async () => {
    const result = await getUpcommingMovies(page);
    setMovielist(result.data.results);
    setTotalPages(result.data.total_pages);
  };

  const fetchMoreData = async () => {
    setPage(page + 1);
    const res = await getUpcommingMovies(page);
    setMovielist(movieList.concat(res.data.results));
  };

  const onValueChange = (e) => {
    e.preventDefault();

    setSearch(e.target.value);
  };

  const Search = async (e) => {
    e.preventDefault();

    const searchResult = await SearchMovie(search);

    if (searchResult.data.total_results === 0) {
      alert("no results Found");
    } else {
      setMovielist([]);
      setSearchState(true);
      setMovielist(searchResult.data.results);
      setTotalPages(searchResult.data.total_pages);
    }
  };

  const cancelSearch = () => {
    setMovielist([]);
    setSearchState(false);
    setCancel((Cancel) => !Cancel);
  };

  return (
    <Container fluid>
      <Form
        className="my-4"
        style={{display: "flex", alignItems: "center"}}
        onSubmit={(e) => Search(e)}
        onChange={(e) => onValueChange(e)}
      >
        <Form.Control type="text" placeholder="Search" name="movie" />

        <Button variant="primary ml-4" type="submit">
          Search
        </Button>
      </Form>
      {searchState ? (
        <>
          <Button variant="primary" onClick={() => cancelSearch()}>
            Close Search
          </Button>
          <h3 className="my-5" style={{display: "flex", justifyContent: "center"}}>
            Search Results
          </h3>
        </>
      ) : (
        <h3 className="my-5" style={{display: "flex", justifyContent: "center"}}>
          Upcomming Movies
        </h3>
      )}

      <MvList
        searchState={searchState}
        movieList={movieList}
        fetchMoreData={fetchMoreData}
        page={page}
        totalPages={totalPages}
      ></MvList>
    </Container>
  );
};

export default MovieList;
