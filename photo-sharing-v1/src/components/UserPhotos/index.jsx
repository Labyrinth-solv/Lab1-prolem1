import React from "react";
import { Typography } from "@mui/material";
import { useParams, Link } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";

function UserPhotos() {
    const { userId } = useParams();
    const photos = models.photoOfUserModel(userId);

    if (!photos || photos.length === 0) {
        return <Typography>No photos found</Typography>;
    }

    return (
      <div>
        <Typography variant="h5">User Photos</Typography>

        {photos.map((photo) => (
          <div key={photo._id} style={{ marginBottom: "20px" }}>
            
         
            <img
              src={`/images/${photo.file_name}`}
              alt=""
              style={{ width: "300px" }}
            />

            
            <Typography variant="body2">
              {new Date(photo.date_time).toLocaleString()}
            </Typography>

            
            <Typography variant="subtitle1">Comments:</Typography>

            
            {photo.comments && photo.comments.length > 0 ? (
              photo.comments.map((cmt) => (
                <div key={cmt._id} style={{ marginLeft: "20px" }}>
                  
                  <Link to={`/users/${cmt.user._id}`}>
                    {cmt.user.first_name} {cmt.user.last_name}
                  </Link>

                  <Typography variant="body2">
                    {cmt.comment}
                  </Typography>

                  <Typography variant="caption">
                    {new Date(cmt.date_time).toLocaleString()}
                  </Typography>
                </div>
              ))
            ) : (
              <Typography variant="body2" style={{ marginLeft: "20px" }}>
                No comments
              </Typography>
            )}

          </div>
        ))}
      </div>
    );
}

export default UserPhotos;