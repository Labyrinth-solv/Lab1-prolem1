import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useParams, Link } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

function UserDetail() {
  const { userId } = useParams();

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!userId) return;
    async function getUserDetail() {
      try {
        const data = await fetchModel(`/user/${userId}`);

        setUser(data);
      } catch (error) {
        console.error(error);
      }
    }

    getUserDetail();
  }, [userId]);

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <Typography variant="h5">{user.last_name}</Typography>

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

      <Link to={`/photos/${user._id}`}>View Photos</Link>
    </div>
  );
}

export default UserDetail;
