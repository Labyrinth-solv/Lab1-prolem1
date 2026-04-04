import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";
import { useEffect, useState } from "react";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList () {
    const users = models.userListModel();

    return (
      <div>
        <Typography variant="body1">
          This is the user list, which takes up 3/12 of the window.
        </Typography>

        <List component="nav">
          {users.map((item) => (
            <React.Fragment key={item._id}>
              
              <ListItem
                button
                component={Link}
                to={`/users/${item._id}`}
              >
                <ListItemText
                  primary={`${item.first_name} ${item.last_name}`}
                />
              </ListItem>

              <Divider />
            </React.Fragment>
          ))}
        </List>

        <Typography variant="body1">
          The model comes in from models.userListModel()
        </Typography>
      </div>
    );
}

export default UserList;