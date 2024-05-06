import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  Avatar,
  Box,
  Link,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import BoltIcon from "@mui/icons-material/Bolt";
import JobDescriptionModal from "./JobDescriptionModal";

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(1),
  padding: theme.spacing(2),
  transition: "transform 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: theme.shadows[4],
  },
  maxWidth: "360px",
  borderRadius: "8px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

const JobPostingCard = ({ job }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleReadMoreClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const {
    jdLink,
    jobDetailsFromCompany,
    maxJdSalary,
    minJdSalary,
    salaryCurrencyCode,
    location,
    minExp,
    jobRole,
    companyName,
    logoUrl,
  } = job;

  const formattedSalary = () => {
    const salary = Intl.NumberFormat("en-US", {
      style: "currency",
      currency: salaryCurrencyCode,
    });

    if (minJdSalary && maxJdSalary) {
      return salary.formatRange(minJdSalary, maxJdSalary);
    } else if (minJdSalary) {
      return `Min. ${salary.format(minJdSalary)}`;
    } else {
      return `Max. ${salary.format(maxJdSalary)}`;
    }
  };

  function capitalizeSentence(sentence) {
    const words = sentence.split(" ");
    const capitalizedWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return capitalizedWords.join(" ");
  }

  return (
    <StyledCard>
      <CardContent>
        <Box display="flex" alignItems="flex-start">
          <Avatar
            alt={companyName + "Logo" || "Stealth Mode Company Logo"}
            variant="rounded"
            src={logoUrl}
          />
          <Box ml={2}>
            <Link
              href={jdLink}
              target="_blank"
              rel="noopener noreferrer"
              variant="h3"
              sx={{
                letterSpacing: "1px",
                color: "#8B8B8B",
                fontWeight: "500",
                fontSize: "13px",
              }}
              underline="hover"
            >
              {companyName || "Stealth Mode Company"}
            </Link>
            <Typography
              variant="h2"
              sx={{
                fontSize: "16px",
              }}
              gutterBottom
            >
              {capitalizeSentence(jobRole)}
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: "11px", fontWeight: "600" }}
              gutterBottom
            >
              {capitalizeSentence(location)}
            </Typography>
          </Box>
        </Box>
        <Typography
          variant="body2"
          color="textSecondary"
          fontWeight={500}
          gutterBottom
        >
          Estimated Salary: {formattedSalary()}
        </Typography>
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            "&:after": {
              content: '""',
              textAlign: "right",
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "100%",
              height: "10rem",
              background: "linear-gradient(to bottom, transparent, white)",
            },
          }}
        >
          <Typography
            variant="body1"
            sx={{ fontSize: "14px", fontWeight: "300", lineHeight: 1.4 }}
            gutterBottom
          >
            {jobDetailsFromCompany.slice(0, 300)}
          </Typography>
        </Box>
        <Button
          sx={{
            textTransform: "none",
            width: "100%",
            color: "#4943da",
            marginBottom: "16px",
            fontWeight: "400",
          }}
          onClick={() => handleReadMoreClick(job)}
        >
          View Job
        </Button>
        <Typography
          variant="h2"
          sx={{
            letterSpacing: "1px",
            color: "#8B8B8B",
            fontWeight: "500",
            fontSize: "13px",
          }}
          gutterBottom
        >
          Minimum Experience
        </Typography>
        <Typography
          variant="h3"
          sx={{
            fontSize: "14px",
          }}
        >
          {minExp
            ? `${minExp} ${minExp > 1 ? "years" : "year"}`
            : "Not Mentioned"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            fontSize: "16px",
            fontWeight: "500",
            textTransform: "none",
            padding: "10px 0",
            borderRadius: "8px",
          }}
          onClick={() => window.open(jdLink, "_blank")}
        >
          <BoltIcon sx={{ color: "yellow" }} />
          Easy Apply
        </Button>
      </CardActions>
      <JobDescriptionModal
        open={modalOpen}
        onClose={handleCloseModal}
        jobDescription={jobDetailsFromCompany}
      />
    </StyledCard>
  );
};

export default JobPostingCard;
