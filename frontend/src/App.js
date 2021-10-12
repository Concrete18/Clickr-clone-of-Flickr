import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import LoginFormPage from "./components/LoginFormPage";
// import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
// components
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
// pages
import PhotoPage from "./pages/PhotoPage";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";

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
            <Home />
          </Route>
          {/* <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route> */}
          <Route exact path="/profile/:userId">
            <Profile/>
          </Route>
          <Route exact path="/profile/photo/:photoId">
            <PhotoPage/>
          </Route>
          <Route>
            <PageNotFound/>
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
