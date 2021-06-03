import { Box, Container, IconButton, makeStyles } from "@material-ui/core";
import React from "react";
import { PhotoCamera, Close } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  inputImage: {
    display: "none",
  },
  uploadLabel: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  uploadWrapper: {
    height: "200px",
    width: "200px",
  },
  imageWrapper: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "15px",
  },
  deleteImageBtn: {
    position: "absolute",
    right: "10px",
    top: "10px",
  },
}));

function UploadPhoto({ handleUploadImage, handleDeleteImage, image }) {
  const classes = useStyles();

  return (
    <Container maxWidth="xl">
      <input
        accept="image/*"
        type="file"
        className={classes.inputImage}
        onChange={(e) => handleUploadImage(e.target.files[0])}
      />
      <Box className={classes.uploadWrapper}>
        {!image && (
          <Box
            component="label"
            className={classes.uploadLabel}
            htmlFor="icon-button-file"
          >
            <PhotoCamera color="primary" />
          </Box>
        )}
        {image && (
          <Box className={classes.imageWrapper}>
            <img
              className={classes.image}
              src={URL.createObjectURL(image)}
              alt="ingredient"
            />
            <IconButton
              className={classes.deleteImageBtn}
              size="small"
              aria-label="close"
            >
              <Close onClick={handleDeleteImage} />
            </IconButton>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default UploadPhoto;
