import React,{ useState, useEffect } from 'react';
import { useParams } from "react-router"
import { Card,Button } from 'react-bootstrap';

function Trip(){
    const [trip,setTrip] =useState({
        "expanded_stops": [
          [
            {
              "id": 1,
              "arrival": "2022-06-02",
              "departure": "2022-06-03",
              "trip_id": 1,
              "destination_id": 1
            },
            "inks lake"
          ],
          [
            {
              "id": 2,
              "arrival": "2022-06-07",
              "departure": "2022-06-09",
              "trip_id": 1,
              "destination_id": 3
            },
            "Whistler Bike Park"
          ]
        ]
      })

    let { id } = useParams();
    useEffect(()=>{
        fetch(`http://localhost:9292/trips/${id}`)
        .then(resp =>resp.json())
        .then(data => setTrip(data))
      },[])
      return(
        <div>
            
            {trip.expanded_stops.map(stop=> {
                return (
                    <Card key={stop[0].id}style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Stopping at: {stop[1]}</Card.Title>
                        <Card.Text>
                        Arrive: {stop[0].arrival}
                        </Card.Text>
                        <Card.Text>
                        Depart:{stop[0].departure}
                        </Card.Text>
                        
                    </Card.Body>
                </Card>
                
                )
            })}
            <Button href="/trips" variant="secondary">Back</Button>
        </div>
    )
}
export default Trip