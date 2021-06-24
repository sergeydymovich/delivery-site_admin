import { Box, IconButton, makeStyles } from "@material-ui/core";
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
    height: "100%",
    width: "100%",
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
    right: "5px",
    top: "5px",
  },
}));

function UploadPhoto({ handleUploadImage, handleDeleteImage, image, className }) {
  const classes = useStyles();

  return (
    <Box className={className}>
       <input      
        accept="image/*"
        type="file"
        className={classes.inputImage}
        id='icon-button-file'
        value=''
        onChange={handleUploadImage}
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
              src={typeof image === "string" ? image : URL.createObjectURL(image)}
              alt="product"
            />
            <IconButton
              className={classes.deleteImageBtn}
              size="small"
              aria-label="close"
              onClick={handleDeleteImage}
            >
              <Close  />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default UploadPhoto;
