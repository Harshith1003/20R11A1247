import React, { useEffect, useState ,useNavigate} from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItemButton, ListItemText, Button } from '@mui/material';
import TrainDetails from './TrainDetails';

const TrainLists = () => {
  const [trains, setTrains] = useState([]);
  const navigate = useNavigate();

  const handleClick = (trainNumber) => {
    navigate(`/trains/${trainNumber}`);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODc2NzkxOTAsImNvbXBhbnlOYW1lIjoiVHJhaW4gQ2VudHJhbCIsImNsaWVudElEIjoiZTAxNzJjNWUtYTYwYi00OTFiLWJiOTgtMTIyMjIyYmNiNTJmIiwib3duZXJOYW1lIjoiIiwib3duZXJFbWFpbCI6IiIsInJvbGxObyI6IjIifQ.QCWq4X9mvAep_5CP5q_TpAhNdNc7y7cyWgYpCbzuJjI";

        const response = await axios.get('http://104.211.219.98:80/train/trains', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        if (Array.isArray(response.data)) {
          const filteredTrains = response.data.filter(train => {
            const departureTime = new Date(train.departureTime);
            const currentTime = new Date();
            const timeDifference = departureTime.getTime() - currentTime.getTime();
            const minutesDifference = Math.floor(timeDifference / 60000);
            return minutesDifference > 30;
          });
          const sortedTrains = filteredTrains.sort((a, b) => {
            const priceComparison = a.price - b.price;
            if (priceComparison !== 0) {
              return priceComparison;
            }
            const availabilityComparison = b.seatsAvailability - a.seatsAvailability;
            if (availabilityComparison !== 0) {
              return availabilityComparison;
            }
            return new Date(b.departureTime) - new Date(a.departureTime);
          });

      

          setTrains(response.data);
        } else {
          console.error('Train data is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching train data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        All Trains
      </Typography>
      <List>
        {trains.map((train) => (
          <ListItemButton key={train.trainNumber}  >
          <ListItemText
              primary={`${train.trainName} (${train.trainNumber})`}
              secondary={`Departure Time: ${train.departureTime.Hours}:${train.departureTime.Minutes}`}
            />
            <Button onClick={() => onclick(train.trainNumber)} variant="contained" >
              View Details
            </Button>
          </ListItemButton>
        ))}
      </List>
    </Container>
  );
};

export default TrainLists;
