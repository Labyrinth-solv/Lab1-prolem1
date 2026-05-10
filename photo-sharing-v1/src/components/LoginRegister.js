import { useState } from "react";
import React from "react";

import fetchModel from "../lib/fetchModelData";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function LoginRegister({ setCurrentUser }) {
  const [credential, setCredential] = useState(
    {
      login_name: "",
      password: ""
    });
  const [error, setError] = useState("");
  const { register, handleSubmit, reset } = useForm();
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const data = await fetchModel("/admin/login", {
        method: "POST",
        body: JSON.stringify({
          login_name: credential.login_name,
          password: credential.password,
        }),
      });
      setCurrentUser(data);
      navigate(`/users/${data._id}`);
    } catch (err) {
      setError("Login failed");
    }
  };

  const onSubmit = async (data) => {
    try {
      if (data.password !== data.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      await fetchModel("/user/register", {
        method: "POST",
        body: JSON.stringify({
          login_name: data.login_name,
          password: data.password,
          first_name: data.first_name,
          last_name: data.last_name,
          location: data.location,
          occupation: data.occupation,
        }),
      });

      setSuccess("Register success!");
      setError("");
      reset(); // clear form
    } catch (err) {
      setError("Register failed");
      setSuccess("");
    }
  };

  return (
    <div>
      <h2>Please Login</h2>

      <input
        type="text"
        value={credential.login_name}
        onChange={(e) => setCredential({ ...credential, login_name: e.target.value })}
        placeholder="Login Name"
      />
      <input
        type="password"
        value={credential.password}
        onChange={(e) => setCredential({ ...credential, password: e.target.value })}
        placeholder="Your password"
      />

      <button onClick={handleLogin}>Login</button>

      <div>{error}</div>

      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Login name" {...register("login_name")} />
        <input placeholder="First name" {...register("first_name")} />
        <input placeholder="Last name" {...register("last_name")} />
        <input placeholder="Location" {...register("location")} />
        <input placeholder="Occupation" {...register("occupation")} />
        <input type="password" placeholder="Password" {...register("password")} />
        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
        />

        <button type="submit">Register Me</button>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </form>

    </div>
  );
}

export default LoginRegister;
