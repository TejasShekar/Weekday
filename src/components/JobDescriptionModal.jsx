// JobDescriptionModal.jsx
import React from "react";
import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";

const JobDescriptionModal = ({ open, onClose, jobDescription }) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="job-description-title">
      <DialogTitle textAlign="center">Job Description</DialogTitle>
      <DialogContent>
        <Typography
          variant="body1"
          sx={{ fontSize: "14px", lineHeight: 1.4, fontWeight: "300" }}
          gutterBottom
        >
          {jobDescription}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default JobDescriptionModal;
