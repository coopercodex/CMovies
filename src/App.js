import './App.css';
import { Rows } from './components/Rows';
import requests from './requests';
import { Featured } from './components/Featured';
import { Navbar } from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import { Favorite } from './components/Favorite';
import Login from './components/Login';
import { auth } from './firebase';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './components/redux/userSlice';
import { Profile } from './components/Profile';



function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // console.log(userAuth)
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
        }))
      } else {
        dispatch(logout())
      }
    })
    return unsubscribe;
  }, [dispatch])
  // derekcooper20@gmail.com
// 
  return (
    <>
      {!user ? (
        <Login />
      ) : (
        <>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path='/' element={
                <>
                  <Featured />
                  <Rows title="Trending Now" getUrl={requests.getTrending} isLargeRow={true} rID={1} />
                  <Rows title="Netflix Originals" getUrl={requests.getNetflixOriginals} rID={2} />
                  <Rows title="Top Rated" getUrl={requests.getTopRated} rID={3} />
                  <Rows title="Action" getUrl={requests.getActionMovies} rID={4} />
                  <Rows title="Comedy" getUrl={requests.getComedyMovies} rID={5} />
                  <Rows title="Horror" getUrl={requests.getHorrorMovies} rID={6} />
                  <Rows title="Romance" getUrl={requests.getRomanceMovies} rID={7} />
                  <Rows title="Documentaries" getUrl={requests.getDocumentaries} rID={8} />
                </>
              } />
            </Routes>
          </div>
          <Routes>
            <Route path='/favorite' element={<Favorite isLargeRow={true} />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
