import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

function TopBar({ currentUser, setCurrentUser }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [rightText, setRightText] = useState("");

  useEffect(() => {
    if (!currentUser) {
      setRightText("");
      return;
    }

    const fetchUser = async () => {
      try {
        const pathParts = location.pathname.split("/");

        const pageType = pathParts[1];
        const userId = pathParts[2];

        // Không có id thì không fetch
        if (!userId || userId === "undefined") {
          setRightText("");
          return;
        }

        // Chỉ fetch khi đúng route
        if (pageType !== "users" && pageType !== "photos") {
          setRightText("");
          return;
        }

        const user = await fetchModel(`/user/${userId}`);

        if (pageType === "photos") {
          setRightText(`Photos of ${user.last_name}`);
        } else {
          setRightText(`${user.first_name} ${user.last_name}`);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [location.pathname, currentUser]);

  // Logout
  const handleLogout = async () => {
    try {
      await fetchModel("/admin/logout", {
        method: "POST",
      });

      setCurrentUser(null);

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">
          {currentUser ? `Hi ${currentUser.first_name}` : "Please Login"}
        </Typography>

        {currentUser && (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        )}

        <Typography variant="h6">{rightText}</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
