import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Stack, TextField, Button, Chip } from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { API_BACKEND_URL } from "../config";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import AuthContext from "../context/AuthContext";

const RequestQuest = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState(
    new Date("2024-02-28T12:01:28.030Z")
  );
  const [endDate, setEndDate] = useState(new Date("2024-02-28T12:01:28.030Z"));
  const [rewards, setRewards] = useState("");
  const [points, setPoints] = useState("");
  const [totalRequired, setTotalRequired] = useState("");
  const [description, setDescription] = useState("");
  const [leisureActivity, setLeisureActivity] = useState("");
  const [leisureActivities, setLeisureActivities] = useState([]);
  const [localEvent, setLocalEvent] = useState("");
  const [localEvents, setLocalEvents] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (leisureActivities.length > 0 && localEvents.length > 0) {
      const start_date = format(startDate, "yyyy-MM-dd'T'HH:mm:ss.SSSX");
      console.log(start_date);
      const end_date = format(endDate, "yyyy-MM-dd'T'HH:mm:ss.SSSX");
      const leisure_activity = leisureActivities;
      const local_events = localEvents;
      const total_required = totalRequired;
      const created_by = user.sub.split(":")[0];
      const response = await fetch(
        `${API_BACKEND_URL}/api/quest/opening-request`,
        {
          method: "POST",
          body: JSON.stringify({
            title,
            description,
            start_date,
            end_date,
            city,
            leisure_activity,
            local_events,
            rewards,
            points,
            total_required,
            created_by,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Quest request created successfully!");
        navigate("/dashboard");
      } else {
        toast.error("Something went wrong!");
      }
    } else {
      toast.error("please fill the form completely");
    }
  };

  return (
    <Box>
      <Typography
        variant="h4"
        color="initial"
        gutterBottom
        sx={{ marginTop: "70px" }}
      >
        Open Quest Request
      </Typography>
      <form onSubmit={handleSubmit} action={<Link to="/login" />}>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            fullWidth
            required
          />
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="City"
            onChange={(e) => setCity(e.target.value)}
            value={city}
            fullWidth
            required
          />
        </Stack>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            type="date"
            variant="outlined"
            color="secondary"
            label="Start date"
            onChange={(e) => setStartDate(e.target.value)}
            value={startDate}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            required
          />
          <TextField
            type="date"
            variant="outlined"
            color="secondary"
            label="End date"
            onChange={(e) => setEndDate(e.target.value)}
            value={endDate}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            required
          />
        </Stack>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="Rewards"
            onChange={(e) => setRewards(e.target.value)}
            value={rewards}
            fullWidth
            required
          />
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="Points"
            onChange={(e) => setPoints(e.target.value)}
            value={points}
            fullWidth
            required
          />
          <TextField
            type="number"
            variant="outlined"
            color="secondary"
            label="Total people required"
            onChange={(e) => setTotalRequired(e.target.value)}
            value={totalRequired}
            InputProps={{ inputProps: { min: 0 } }}
            fullWidth
            required
          />
        </Stack>
        <TextField
          type="text"
          variant="outlined"
          color="secondary"
          label="Description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          fullWidth
          required
          sx={{ mb: 4 }}
        />
        {leisureActivities.length > 0 ? (
          <>
            {"Leisure Activities: "}
            {leisureActivities.map((activity, index) => {
              return (
                <Chip label={activity} key={index} sx={{ mb: 2, gap: "5px" }} />
              );
            })}
          </>
        ) : (
          <small id="leisure-activity-id" style={{ color: "red" }}>
            Please enter atleast one Leisure Activity
          </small>
        )}

        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="Leisure Activity*"
            onChange={(e) => setLeisureActivity(e.target.value)}
            value={leisureActivity}
            fullWidth
          />
          <Button
            onClick={() => {
              leisureActivities.push(leisureActivity);
              setLeisureActivity("");
            }}
          >
            <AddCircleOutlinedIcon />
          </Button>
        </Stack>
        {localEvents.length > 0 ? (
          <>
            {"Local Events: "}
            {localEvents.map((events, index) => {
              return (
                <Chip label={events} key={index} sx={{ mb: 2, gap: "5px" }} />
              );
            })}
          </>
        ) : (
          <small id="local-event-id" style={{ color: "red" }}>
            Please enter atleast one Local Event
          </small>
        )}
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="Local Events*"
            onChange={(e) => setLocalEvent(e.target.value)}
            value={localEvent}
            fullWidth
          />
          <Button
            onClick={() => {
              localEvents.push(localEvent);
              setLocalEvent("");
            }}
          >
            <AddCircleOutlinedIcon />
          </Button>
        </Stack>
        <Button variant="outlined" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default RequestQuest;
