import './App.css';
import { Rows } from './components/Rows';
import requests from './requests';
import { Featured } from './components/Featured';
import {Navbar} from './components/Navbar'

function App() {
  
  return (
    <div className="App">
      <Navbar />
      <Featured  />
      <Rows title="Trending Now" getUrl={requests.getTrending} isLargeRow={true} rID={1}/>
      <Rows title="Netflix Originals" getUrl={requests.getNetflixOriginals} />
      <Rows title="Top Rated" getUrl={requests.getTopRated} rID={2} />
      <Rows title="Action" getUrl={requests.getActionMovies} rID={3} />
      <Rows title="Comedy" getUrl={requests.getComedyMovies} rID={4} />
      <Rows title="Horror" getUrl={requests.getHorrorMovies} rID={5} />
      <Rows title="Romance" getUrl={requests.getRomanceMovies} rID={6} />
      <Rows title="Documentaries" getUrl={requests.getDocumentaries} rID={7} />
    </div>
  );
}

export default App;
