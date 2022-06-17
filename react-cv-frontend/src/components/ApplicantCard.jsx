import React from 'react'
import {Card} from 'react-bootstrap'

const ApplicantCard = ({person}) => {
    <Card>
        <Card.Body>
            <Card.Title>
                {person.name}
            </Card.Title>
        </Card.Body>
    </Card>
}

export default ApplicantCard