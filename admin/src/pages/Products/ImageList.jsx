import Box from "components/Box";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import toast from "react-hot-toast";

const ImageList = ({ data = [], dispatch }) => {
  const fileInputRef = React.useRef(null);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState(null);

  const handleImageChange = (e) => {
    const image = [...data, ...e.target.files];
    if (image?.length > 8) {
      toast.error("Maximum 8 images are allowed");
      image.length = 8;
    }
    dispatch((prev) => ({ ...prev, image }));
  };

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleRemoveImage = (index) => {
    if (data?.length === 1) {
      toast.error("At least 1 image is required");
      return;
    }
    const updatedImages = data.filter((_, i) => i !== index);
    dispatch((prev) => ({ ...prev, image: updatedImages }));
    toast.success("Image removed");
  };

  // Drag and Drop handlers
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (draggedIndex !== index) {
      setDraggedOverIndex(index);
    }
  };

  const handleDragLeave = () => {
    setDraggedOverIndex(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();

    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDraggedOverIndex(null);
      return;
    }

    const updatedImages = [...data];
    const draggedItem = updatedImages[draggedIndex];

    // Remove dragged item
    updatedImages.splice(draggedIndex, 1);
    // Insert at new position
    updatedImages.splice(dropIndex, 0, draggedItem);

    dispatch((prev) => ({ ...prev, image: updatedImages }));
    setDraggedIndex(null);
    setDraggedOverIndex(null);
    toast.success("Image order updated");
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDraggedOverIndex(null);
  };

  return (
    <Box>
      {/* Info Banner */}
      <Box
        sx={{
          mb: 2,
          p: 2,
          borderRadius: 2,
          backgroundColor: "#e3f2fd",
          border: "1px solid #90caf9",
        }}
      >
        <Typography
          variant="caption"
          sx={{ display: "flex", alignItems: "center", color: "#1976d2", fontWeight: 600 }}
        >
          <DragIndicatorIcon sx={{ fontSize: 16, mr: 0.5 }} />
          Drag & drop images to reorder • First image is the main product image
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {data?.map((image, index) => {
          const isDragging = draggedIndex === index;
          const isDraggedOver = draggedOverIndex === index;

          return (
            <Grid key={index} item xs={6} lg={4}>
              <Box
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                sx={{
                  position: "relative",
                  cursor: "grab",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  borderRadius: "15px",
                  transition: "all 0.3s ease",
                  opacity: isDragging ? 0.5 : 1,
                  transform: isDraggedOver && draggedIndex !== index ? "scale(0.95)" : "scale(1)",
                  border: isDraggedOver ? "2px dashed #1976d2" : "2px solid transparent",
                  backgroundColor: isDraggedOver ? "#e3f2fd" : "transparent",
                  "&:active": {
                    cursor: "grabbing",
                  },
                  "&:hover .drag-handle": {
                    opacity: 1,
                  },
                }}
              >
                {image ? (
                  <React.Fragment>
                    {/* Main Image Badge */}
                    {index === 0 && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: 8,
                          left: 8,
                          backgroundColor: "#1976d2",
                          color: "white",
                          padding: "4px 8px",
                          borderRadius: "6px",
                          fontSize: "0.7rem",
                          fontWeight: 600,
                          zIndex: 2,
                          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                        }}
                      >
                        MAIN
                      </Box>
                    )}

                    {/* Drag Handle Icon */}
                    <Box
                      className="drag-handle"
                      sx={{
                        position: "absolute",
                        top: index === 0 ? 40 : 8,
                        left: 8,
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        color: "white",
                        padding: "4px",
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                        zIndex: 2,
                      }}
                    >
                      <DragIndicatorIcon sx={{ fontSize: 16 }} />
                    </Box>

                    {/* Image */}
                    <img
                      style={{
                        width: 120,
                        height: 100,
                        borderRadius: "20px",
                        border: "solid 2px #e0e0e0",
                        objectFit: "cover",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      }}
                      src={
                        typeof image == "object"
                          ? URL.createObjectURL(image)
                          : `${process.env.REACT_APP_API_URL}/uploads/${image}`
                      }
                      alt={`Product ${index + 1}`}
                      draggable={false}
                    />

                    {/* Position Number */}
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 8,
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        color: "white",
                        padding: "2px 8px",
                        borderRadius: "12px",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        zIndex: 2,
                      }}
                    >
                      {index + 1}
                    </Box>

                    {/* Remove Button */}
                    <IconButton
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                        zIndex: 3,
                        "&:hover": {
                          backgroundColor: "#d32f2f",
                          color: "white",
                        },
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage(index);
                      }}
                    >
                      <CloseIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <svg
                      width="56"
                      height="56"
                      viewBox="0 0 56 56"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.9994 51.3346H34.9994C46.666 51.3346 51.3327 46.668 51.3327 35.0013V21.0013C51.3327 9.33464 46.666 4.66797 34.9994 4.66797H20.9994C9.33268 4.66797 4.66602 9.33464 4.66602 21.0013V35.0013C4.66602 46.668 9.33268 51.3346 20.9994 51.3346Z"
                        stroke="#CDCDCD"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M21.0007 23.3333C23.578 23.3333 25.6673 21.244 25.6673 18.6667C25.6673 16.0893 23.578 14 21.0007 14C18.4233 14 16.334 16.0893 16.334 18.6667C16.334 21.244 18.4233 23.3333 21.0007 23.3333Z"
                        stroke="#CDCDCD"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.23047 44.2186L17.7338 36.4953C19.5771 35.2586 22.2371 35.3986 23.8938 36.8219L24.6638 37.4986C26.4838 39.0619 29.4238 39.0619 31.2438 37.4986L40.9505 29.1686C42.7705 27.6053 45.7105 27.6053 47.5305 29.1686L51.3338 32.4353"
                        stroke="#CDCDCD"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </React.Fragment>
                )}
              </Box>
            </Grid>
          );
        })}

        {/* Add More Images Button */}
        {data?.length < 8 && (
          <Grid item xs={6} lg={4}>
            <Box
              onClick={handleFileSelect}
              sx={{
                height: 100,
                cursor: "pointer",
                backgroundColor: "#f5f5f5",
                border: "2px dashed #bdbdbd",
                borderRadius: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#eeeeee",
                  borderColor: "#1976d2",
                  transform: "scale(1.02)",
                },
              }}
            >
              <Typography variant="h4" sx={{ color: "#bdbdbd", mb: 0.5 }}>
                +
              </Typography>
              <Typography variant="caption" sx={{ color: "#757575", fontWeight: 600 }}>
                Add Image
              </Typography>
              <Typography variant="caption" sx={{ color: "#9e9e9e", fontSize: "0.65rem" }}>
                ({data?.length || 0}/8)
              </Typography>
            </Box>
          </Grid>
        )}

        <Grid item xs={12}>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            multiple
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

ImageList.propTypes = {
  data: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default ImageList;
