import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useParams, Link } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

function UserPhotos() {
  const { userId } = useParams();

  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    async function getPhotos() {
      try {
        const data = await fetchModel(`/photo/photosOfUser/${userId}`);

        setPhotos(data);
      } catch (error) {
        console.error(error);
      }
    }

    getPhotos();
  }, [userId]);

  if (photos.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Typography variant="h5">User Photos</Typography>

      {photos.map((photo) => (
        <div className="user-photo-container" key={photo._id}>
          <img
            className="user-photo-image"
            src={`/images/${photo.file_name}`}
            alt=""
          />

          <Typography variant="body2">
            {new Date(photo.date_time).toLocaleString()}
          </Typography>

          <Typography variant="subtitle1">Comments:</Typography>

          {photo.comments && photo.comments.length > 0 ? (
            photo.comments.map((cmt) => (
              <div className="comment-container" key={cmt._id}>
                <Link to={`/users/${cmt.user._id}`}>
                  {cmt.user.first_name} {cmt.user.last_name}
                </Link>

                <Typography variant="body2" className="comment-text">
                  {cmt.comment}
                </Typography>

                <Typography variant="caption">
                  {new Date(cmt.date_time).toLocaleString()}
                </Typography>
              </div>
            ))
          ) : (
            <Typography variant="body2" className="comment-container">
              No comments
            </Typography>
          )}
        </div>
      ))}
    </div>
  );
}

export default UserPhotos;
