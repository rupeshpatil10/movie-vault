import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Movies from "./components/Movies";
import WacthList from "./components/WacthList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Banner from "./components/Banner";
import WatchList from "./components/WacthList";

function App() {
  let [watchList, setWacthList] = useState([]);

  let AddtoWatchList = (movieObj) => {
    let newWatchList = [...watchList, movieObj];
    localStorage.setItem("movieKey", JSON.stringify(newWatchList));
    setWacthList(newWatchList);
    console.log(watchList);
  };

  let handleRemoveFromWatchList = (movieObj) => {
    let filteredWatchList = watchList.filter((movie) => {
      return movie.id !== movieObj.id;
    });
    setWacthList(filteredWatchList);
    localStorage.setItem("movieKey", JSON.stringify(filteredWatchList));
    console.log(filteredWatchList);
};

  useEffect(() => {
    let moviesFromLocalStorage = localStorage.getItem("movieKey");
    if (!moviesFromLocalStorage) {
      return;
    }
    setWacthList(JSON.parse(moviesFromLocalStorage));
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Movies
                  AddtoWatchList={AddtoWatchList}
                  handleRemoveFromWatchList={handleRemoveFromWatchList}
                  watchList={watchList}
                />
              </>
            }
          />
          <Route
            path="/watchlist"
            element={
              <WacthList
                watchList={watchList}
                setWacthList={setWacthList}
                handleRemoveFromWatchList={handleRemoveFromWatchList}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
