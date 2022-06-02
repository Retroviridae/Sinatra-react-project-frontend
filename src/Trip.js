import React,{ useState, useEffect } from 'react';
import { useParams } from "react-router"
import { Form, Button,Card} from 'react-bootstrap/';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Trip(){
    const [clicked,setClicked] = useState(false)
    const [trip,setTrip] =useState({
      "id": 3,
      "title": "International",
      "description": "South america and germany!!",
      "start_date": "2022-08-15",
      "end_date": "2023-01-03",
      "expanded_stops": [
        {
          "id": 3,
          "arrival": "2022-06-02",
          "departure": "2022-06-03",
          "trip_id": 3,
          "destination_id": 4,
          "destination": "Peru"
        },
        {
          "id": 4,
          "arrival": "2022-06-02",
          "departure": "2022-06-03",
          "trip_id": 3,
          "destination_id": 4,
          "destination": "Peru"
        }
      ]
    })

    let { id } = useParams();
    useEffect(()=>{
        fetch(`http://localhost:9292/trips/${id}`)
        .then(resp =>resp.json())
        .then(data => setTrip(data))
      },[])

      function handleFormChange(e){
          setTrip({...trip,[e.target.name]:e.target.value})
      }
      
      function handleSubmit(e){
          e.preventDefault()
        fetch(`http://localhost:9292/trips/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(trip),
          })
            .then((r) => r.json())
            .then(data => console.log(data));
      }

      function handleDelete(e){
        // setTrip({...trip,["expanded_stops"]:trip.expanded_stops.filter(stop=>stop.id!=e.target.name)})
        // trip.expanded_stops=trip.expanded_stops.filter(stop=>stop.id!=e.target.name)
        // console.log(trip.expanded_stops.filter(stop=>stop.id!=e.target.name))
        // console.log(trip)
        // console.log(trip.expanded_stops.filter(stop=>stop.id!=e.target.name))
        fetch(`http://localhost:9292/stops/${e.target.name}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(setTrip({...trip,["expanded_stops"]:trip.expanded_stops.filter(stop=>stop.id!=e.target.name)}));
      }
    return(
        <div>
          <p>{trip.title}</p>
        {trip.expanded_stops.map(stop=> {
                return (
                  
                        <Card key={stop.id} style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>{stop.destination}</Card.Title>
                                <Card.Text>
                                Arrive: {stop.arrival}
                                </Card.Text>
                                <Card.Text>
                                Depart: {stop.departure}
                                </Card.Text>
                                <Button name={stop.id} onClick={handleDelete} variant="dark">Delete Stop</Button>
                            </Card.Body>
                        </Card>
                )
            })}
                <Button href={"/trips/" + trip.id + "/new_stop"} variant="primary">New Stop</Button>
                <Button href="/trips"  variant="secondary">Back</Button>
        {/* {clicked?
        <form onSubmit={handleSubmit} style={{ width: '40rem',margin: 'auto' }}>
        <h2>Create a new trip!</h2>
        <Row className='mt-2'>
          <Form.Label column lg={2}>
            Name
          </Form.Label>
          <Col xs={7}>
            <Form.Control type="text" placeholder="Name" name='name' value={trip.name} onChange={handleFormChange}/>
          </Col>
        </Row>
        
        <Row className='mt-2'>
          <Form.Label column lg={2}>
            Location
          </Form.Label>
          <Col xs={7}>
            <Form.Control type="text" placeholder="Location" name='location' value={trip.location} onChange={handleFormChange} />
          </Col>
        </Row>
        
        <Row className='mt-2'>
          <Form.Label column lg={2}>
            Description
          </Form.Label>
          <Col xs={7}>
            <Form.Control type="text" placeholder="Description" name='description' value={trip.description} onChange={handleFormChange} />
          </Col>
        </Row>
        <Button onSubmit={()=>console.log('submit')} variant="primary" type="submit">
          Submit
        </Button>
      </form>
    :null} */}
      </div>
    )
}
export default Trip