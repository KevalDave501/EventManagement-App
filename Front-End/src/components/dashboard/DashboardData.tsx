import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Event {
    e_id: number;
    e_name: string;
    e_vanue: string;
    e_startdate: string;
    e_enddate: string;
    e_capacity: number;
    is_active: string;
}

const DashboardData: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/admin/activeEvents');
                setEvents(response.data);
            } catch (err) {
                setError('Failed to fetch events');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) {
        return (
            <Container className="mt-4">
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-4">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Active Events</h2>
            <Row>
                {events.map(event => (
                    <Col key={event.e_id} sm={12} md={6} lg={4} className="mb-4">
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>{event.e_name}</Card.Title>
                                <Card.Text>
                                    <strong>Venue:</strong> {event.e_vanue}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Start Date:</strong> {event.e_startdate}
                                </Card.Text>
                                <Card.Text>
                                    <strong>End Date:</strong> {event.e_enddate}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Capacity:</strong> {event.e_capacity}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default DashboardData;
