import React, { useEffect, useState } from "react";
import { Divider, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function GetUserList() {
      try {
        const data = await fetchModel("/user/list");
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    }
    GetUserList();
  }, []);

  return (
    <div>
      <List component="nav">
        {users.map((item) => (
          <React.Fragment key={item._id}>
            <ListItem button component={Link} to={`/users/${item._id}`}>
              <ListItemText primary={`${item.first_name} ${item.last_name}`} />
            </ListItem>

            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default UserList;
