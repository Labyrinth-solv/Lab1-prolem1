import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useParams, Link } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

function UserPhotos({ currentUser }) {
  const { userId } = useParams();

  const [photos, setPhotos] = useState([]);

  const [commentText, setCommentText] = useState({});

  const [file, setFile] = useState(null);
  const [notify, setNotify] = useState("");

  const handleAddComment = async (photoId) => {
    try {
      const text = commentText[photoId];

      if (!text || text.trim() === "") return;

      await fetchModel(`/comment/commentsOfPhoto/${photoId}`, {
        method: "POST",
        body: JSON.stringify({ comment: text }),
      });

      // update UI
      const data = await fetchModel(`/photo/photosOfUser/${userId}`);
      setPhotos(data);

      setCommentText((prev) => ({ ...prev, [photoId]: "" }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddPhoto = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    const res = await fetch("https://2njxmt-8081.csb.app/api/photo/new", {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    if (!res.ok) {
      console.log("Upload failed");
      setNotify("failed");
      return;
    }

    const newPhoto = await res.json();

    console.log("Uploaded:", newPhoto);
    setFile(null);
    setNotify("success");

    // reload photos
    const data = await fetchModel(`photo/photosOfUser/${userId}`);

    setPhotos(data);
  };

  useEffect(() => {
    async function getPhotos() {
      try {
        const data = await fetchModel(`/photo/photosOfUser/${userId}`);

        setPhotos(data);
        setNotify("");
      } catch (error) {
        console.error(error);
      }
    }

    getPhotos();
  }, [userId]);

  if (photos.length === 0) {
    return <p>No photos found...</p>;
  }

  return (
    <div>
      {currentUser._id === userId && (
        <div>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <button onClick={handleAddPhoto}>Add Photo</button>
          {notify && <p style={{ color: "green" }}>{notify}</p>}
        </div>
      )}
      <Typography variant="h5">User Photos</Typography>

      {photos.map((photo) => (
        <div className="user-photo-container" key={photo._id}>
          <img
            className="user-photo-image"
            src={`https://2njxmt-8081.csb.app/images/${photo.file_name}`}
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
          <input
            type="text"
            value={commentText[photo._id] || ""}
            onChange={(e) =>
              setCommentText({
                ...commentText,
                [photo._id]: e.target.value,
              })
            }
            placeholder="Write a comment..."
          />

          <button onClick={() => handleAddComment(photo._id)}>Comment</button>
        </div>
      ))}
    </div>
  );
}

export default UserPhotos;
