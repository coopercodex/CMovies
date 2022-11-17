import './App.css';
import { Rows } from './components/Rows';
import requests from './requests';
import { Featured } from './components/Featured';

function App() {
  
  return (
    <div className="App">
      <h1>View Party</h1>
      <Featured  />
      <Rows title="Trending Now" getUrl={requests.getTrending} isLargeRow={true} />
      <Rows title="Netflix Originals" getUrl={requests.getNetflixOriginals} />
      <Rows title="Top Rated" getUrl={requests.getTopRated} />
      <Rows title="Action" getUrl={requests.getActionMovies} />
      <Rows title="Comedy" getUrl={requests.getComedyMovies} />
      <Rows title="Horror" getUrl={requests.getHorrorMovies} />
      <Rows title="Romance" getUrl={requests.getRomanceMovies} />
      <Rows title="Documentaries" getUrl={requests.getDocumentaries} />
    </div>
  );
}

export default App;
