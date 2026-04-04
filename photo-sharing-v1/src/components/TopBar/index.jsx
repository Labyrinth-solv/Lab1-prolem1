import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";

function TopBar() {
    const location = useLocation();

    let rightText = "";

    const userMatch = location.pathname.match(/\/users\/(.+)/);
    const photoMatch = location.pathname.match(/\/photos\/(.+)/);

    if (userMatch) {
        const user = models.userModel(userMatch[1]);
        if (user) {
            rightText = `${user.first_name} ${user.last_name}`;
        }
    } else if (photoMatch) {
        const user = models.userModel(photoMatch[1]);
        if (user) {
            rightText = `Photos of ${user.first_name} ${user.last_name}`;
        }
    }

    return (
      <AppBar className="topbar-appBar" position="absolute">
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          
          <Typography variant="h6">
            Lê Trung Đức
          </Typography>

          <Typography variant="h6">
            {rightText}
          </Typography>

        </Toolbar>
      </AppBar>
    );
}

export default TopBar;