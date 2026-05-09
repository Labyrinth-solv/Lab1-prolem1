import { useState } from "react";
import React from "react";

import fetchModel from "../lib/fetchModelData";
import { useNavigate } from "react-router-dom";

function LoginRegister(props) {
  const [loginName, setLoginName] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const data = await fetchModel("/admin/login", {
        method: "POST",
        body: JSON.stringify({
          login_name: loginName,
        }),
      });
      props.setCurrentUser(data);
      navigate(`/users/${data._id}`);
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <div>
      <h2>Please Login</h2>

      <input
        type="text"
        value={loginName}
        onChange={(e) => setLoginName(e.target.value)}
        placeholder="Login Name"
      />

      <button onClick={handleLogin}>Login</button>

      <div>{error}</div>
    </div>
  );
}

export default LoginRegister;
