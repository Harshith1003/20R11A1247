import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const TrainDetails = ({trainNumber}) => {
  const [train, setTrain] = useState(null);
  const { trainNumber } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODc2Nzg2NzMsImNvbXBhbnlOYW1lIjoiVHJhaW4gQ2VudHJhbCIsImNsaWVudElEIjoiZTAxNzJjNWUtYTYwYi00OTFiLWJiOTgtMTIyMjIyYmNiNTJmIiwib3duZXJOYW1lIjoiIiwib3duZXJFbWFpbCI6IiIsInJvbGxObyI6IjIifQ.823eCMc4ps6EQLloZO4buf7ZtxZ6Rr2-fqAaxJ9_poY";

        const response = await axios.get(`http://104.211.219.98/train/trains/${trainNumber}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        setTrain(response.data);
      } catch (error) {
        console.error('Error fetching train details:', error);
      }
    };

    fetchData();
  }, [trainNumber]);

  if (!train) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Train Details
      </Typography>
      <Typography variant="h6" gutterBottom>
        Train Name: {train.trainName}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Train Number: {train.trainNumber}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Departure Time: {train.departureTime.Hours}:{train.departureTime.Minutes}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Seats Available (Sleeper): {train.seatsAvailable.sleeper}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Seats Available (AC): {train.seatsAvailable.AC}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Price (Sleeper): {train.price.sleeper}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Price (AC): {train.price.AC}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Delayed By: {train.delayedBy} minutes
      </Typography>
    </Container>
  );
};

export default TrainDetails;
