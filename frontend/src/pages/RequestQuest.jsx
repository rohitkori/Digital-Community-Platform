import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Stack, TextField, Button } from "@mui/material";
import { API_BACKEND_URL } from "../config";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const RequestQuest = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [rewards, setRewards] = useState("");
  const [points, setPoints] = useState("");
  const [totalRequired, setTotalRequired] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      title,
      city,
      startDate,
      endDate,
      rewards,
      points,
      totalRequired,
      description
    );

    const response = await fetch(
      `${API_BACKEND_URL}/api/quest/opening-request`,
      {
        method: "POST",
        body: JSON.stringify({
          title,
          city,
          startDate,
          endDate,
          rewards,
          points,
          totalRequired,
          description,
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
  };

  return (
    <Box>
      <Typography variant="h4" color="initial" gutterBottom>
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
            label="Total point required"
            onChange={(e) => setTotalRequired(e.target.value)}
            value={totalRequired}
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
        <Button variant="outlined" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default RequestQuest;
