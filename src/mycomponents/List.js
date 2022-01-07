import {Link} from "react-router-dom";
import {Card} from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";

const List = (props) => {
  return (
    <>
      <InfiniteScroll
        dataLength={props.movieList.length}
        next={() => props.fetchMoreData()}
        hasMore={props.page !== props.totalPages}
        loader={<h4 style={{textAlign: "center", margin: "80px"}}>Loading...</h4>}
      >
        <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
          {props.movieList.map((list, i) => {
            return (
              <Card
                key={i}
                style={{
                  width: "18rem",
                  margin: "20px",
                  textDecoration: "none",
                  color: "black",
                  boxShadow: "0px 0px 8px 2px #999999",
                }}
                as={Link}
                to={`/detail/${list.id}`}
              >
                <Card.Img
                  variant="top"
                  src={
                    list.poster_path
                      ? `https://image.tmdb.org/t/p/original/${list.poster_path}`
                      : "https://ih1.redbubble.net/image.512138487.5983/fposter,small,wall_texture,product,750x1000.u3.jpg"
                  }
                />
                <Card.Body>
                  <Card.Title>
                    <p>{list.title.substring(0, 25)}</p>
                    <p>
                      ({list.vote_average}
                      <i className="fas fa-star ml-1" style={{color: "#d39e00"}}></i>)
                    </p>
                  </Card.Title>
                  <Card.Text>{list.overview.substring(0, 140)}...</Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default List;
