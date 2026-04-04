import React from "react";
import { Typography } from "@mui/material";
import { useParams, Link } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";

function UserDetail() {
    const { userId } = useParams();  
    const user = models.userModel(userId);  

    if (!user) {
        return <Typography>User not found</Typography>;
    }

    return (
        <div>
          <Typography variant="h5">
            {user.first_name} {user.last_name}
          </Typography>

          <Typography variant="body1">
            <b>Location:</b> {user.location}
          </Typography>

          <Typography variant="body1">
            <b>Occupation:</b> {user.occupation}
          </Typography>

          <Typography variant="body1">
            <b>Description:</b> {user.description}
          </Typography>

          <br />

          <Link to={`/photos/${user._id}`}>
            View Photos
          </Link>
        </div>
    );
}

export default UserDetail;