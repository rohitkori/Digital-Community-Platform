import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TollIcon from "@mui/icons-material/Toll";

const MyProfile = ({ data }) => {
  return (
    <>
      <h1>My Profile</h1>
      <Card sx={{ display: "flex" }} mb={1}>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image="https://cdn2.iconfinder.com/data/icons/instagram-ui/48/jee-74-512.png"
          alt="profile-img"
        />
        <Box
          sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}
        >
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {data.name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Email: {data.email}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="div">
              {data.contact && `Contact: ${data.contact}`}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              component="div"
              mb={1}
            >
              City: {data.city}
            </Typography>
            {data.specializations && (
              <Stack direction="row" spacing={1}>
                {data.specializations.map((response, index) => {
                  return <Chip label={response} key={index} />;
                })}
              </Stack>
            )}
          </CardContent>
        </Box>
      </Card>
      {data.completed_quests || data.contribution_points ? (
        <Card sx={{ display: "flex", justifyContent: "space-between" }}>
          {data.completed_quests && (
            <>
              <CheckCircleIcon />{" "}
              <CardContent>
                Completed Quests: {data.completed_quests}
              </CardContent>
            </>
          )}
          {data.contribution_points && (
            <>
              <TollIcon />{" "}
              <CardContent>
                Contribution Points: {data.contribution_points}
              </CardContent>
            </>
          )}
        </Card>
      ) : null}
      <Divider
        variant="middle"
        sx={{ marginBottom: "20px", marginTop: "20px" }}
      />
    </>
  );
};

export default MyProfile;
