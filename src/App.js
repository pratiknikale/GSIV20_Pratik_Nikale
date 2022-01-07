// import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import Mlist from "./pages/MovieList";
import Details from "./pages/Detail";
import Header from "./mycomponents/Header";
import {BrowserRouter, Routes, Route} from "react-router-dom";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route exact path="/" element={<Mlist />} />
          <Route exact path="/detail/:id" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
