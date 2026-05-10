import "./App.css";

import React, { useState } from "react";
import { Grid, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import LoginRegister from "./components/LoginRegister";
import ProtectedRoute from "./components/ProtectedRoute";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <Router>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
          </Grid>

          <Grid item xs={12}>
            <div className="main-topbar-buffer" />
          </Grid>

          <Grid item sm={3}>
            <Paper className="main-grid-item">
              {currentUser && <UserList />}
            </Paper>
          </Grid>

          <Grid item sm={9}>
            <Paper className="main-grid-item">
              <Routes>
                <Route
                  path="/"
                  element={<LoginRegister setCurrentUser={setCurrentUser} />}
                />
                <Route
                  path="/login"
                  element={<LoginRegister setCurrentUser={setCurrentUser} />}
                />

                <Route
                  path="/users/:userId"
                  element={
                    <ProtectedRoute currentUser={currentUser}>
                      <UserDetail />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/photos/:userId"
                  element={
                    <ProtectedRoute currentUser={currentUser}>
                      <UserPhotos />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default App;
