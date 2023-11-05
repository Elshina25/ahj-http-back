const express = require('express');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const Ticket = require('./js/Ticket.js');
const TicketShort = require('./js/TicketShort.js');
const uuid = require('uuid');

const app = express();

app.use(cors());

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const tickets = [];

const ticketsWithoutDesc = [];

app.use('/', router);

router.post('/createTicket', (req, res) => {
  const id = uuid.v4();
  const name = req.body.name;
  const description = req.body.description;
  const created = new Date().toLocaleString().slice(0, -3);
  const status = false;

  const ticket = new Ticket(id, name, description, created, status);
  const shortTicket = new TicketShort(id, name, created, status);

  tickets.push(ticket);
  ticketsWithoutDesc.push(shortTicket);

  res.json(ticket);
});

router.get('/allTickets', (req, res) => {
  res.send(ticketsWithoutDesc);
})

router.get('/ticketById/:id', (req, res) => {
  const id = req.params.id;
  const foundTicket = tickets.find(el => el.id === id);

  if (foundTicket) {
    return res.send(foundTicket);
  } else {
    res.status = 404;
    res.body = JSON.stringify({ message: 'Ticket not found' });
  }
  return;
});

router.delete('/deleteTicket/:id', (req, res) => {
  const id = req.params.id;
  const deleteIndex = ticketsWithoutDesc.findIndex(el => el.id === id);

  if (deleteIndex !== -1) {
    const deleteTicket = ticketsWithoutDesc.splice(deleteIndex, 1);
    tickets.splice(tickets.findIndex(el => el.id === id), 1);
    res.json(deleteTicket);
  } else {
    res.status(404).send({ message: 'Ticket not found' });
  }
  return;
});

router.patch('/ticketDone/:id', (req, res) => {
  const id = req.params.id;

  const ticket = tickets.find(el => el.id === id);
  const ticketWithoutDesc = ticketsWithoutDesc.find(el => el.id === id);

  if (ticketWithoutDesc) {
    if (ticketWithoutDesc.status === false) {
      ticketWithoutDesc.status = true;
    } else {
      ticketWithoutDesc.status = false;
    }

    res.json(ticketWithoutDesc.status);

  } else {
    res.status(404).send({ message: 'Ticket not found' });
  };

  if (ticket) {
    if (ticket.status === false) {
      ticket.status = true;
    } else {
      ticket.status = false;
    }

    res.json(ticket.status);

  } else {
    res.status(404).send({ message: 'Ticket not found' });
  }
});

router.get('/dataTicket/:id', (req, res) => {
  const id = req.params.id;
  const foundTicket = tickets.find(el => el.id === id);

  if (foundTicket) {
    res.json(foundTicket);
  }
});

router.patch('/updateById/:id', (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const id = req.params.id;

  const updatedTicket = tickets.find(el => el.id === id);

  if (updatedTicket) {
    updatedTicket.name = name;
    updatedTicket.description = description;

    ticketsWithoutDesc.find(el => el.id === id).name = name;

    res.json(updatedTicket);
  } else {
    res.status(404).send({ message: 'Ticket not found' });
  }
  return;
});

const port = 7070;
app.listen(port, (err) => {
  if (err) {
    return console.log('Error occured:', err);
  }
  console.log(`server is listening on ${port}`)
})

