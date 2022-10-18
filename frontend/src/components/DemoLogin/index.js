import React from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

function LoginFormPage() {
  const dispatch = useDispatch();

  const demoLogin = async () => {
    const username = "Demo User";
    const password = "sjn<>ghfbfd34#^23";
    return dispatch(
      sessionActions.login({ credential: username, password: password })
    );
  };

  return (
    <div className="demo_div single_auth_container">
      <h2>Log in as Demo User</h2>
      <button className="demo_login button" onClick={demoLogin}>
        Demo Login
      </button>
    </div>
  );
}

export default LoginFormPage;
