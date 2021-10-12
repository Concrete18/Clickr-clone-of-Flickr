import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import PhotoPage from "./components/PhotoPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <LoginFormPage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/profile/:userId">
            <Profile/>
          </Route>
          <Route exact path="/profile/photo/:photoId">
            <PhotoPage/>
          </Route>
          <Route>
            <div className='not_found'>
              <h1>Page Not Found</h1>
            </div>
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
