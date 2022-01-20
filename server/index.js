require('dotenv/config');
const pg = require('pg');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
const jsonMiddleWare = express.json();
const app = express();

app.use(jsonMiddleWare);

app.use(staticMiddleware);

app.use(errorMiddleware);

app.post('/api/events', (req, res) => {
  const body = req.body;
  const userID = 1;
  const sql = `
  insert into "events" ("title", "date","address", "city","state","lat", "lng", "startingtime", "userID")
  values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  returning *
  `;
  const params = [body.title, body.date, body.address, body.city, body.state, body.lat, body.lng, body.startingtime, userID];
  db.query(sql, params)
    .then(result => {
      const event = result.rows[0];
      res.status(201).json(event);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'An unexpected error has occured' });
    });
});

app.get('/api/events', (req, res, next) => {
  const sql = `
  select *
  from "events"
  `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/events/:eventID', (req, res, next) => {
  const eventID = req.params.eventID;
  const sql = 'select * from "events" where "eventID" = $1';
  const params = [eventID];
  db.query(sql, params)
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.patch('/api/events/:eventID', (req, res, next) => {
  const eventID = parseInt(req.params.eventID);
  const { title, date, address, city, state, lat, lng, startingtime } = req.body.event;
  if (!Number.isInteger(eventID) || eventID <= 0) {
    res.status(400).json({ Error: 'invalid id' });
    return;
  } else if (!title || !date || !address || !city || !state || !lat || !lng || !startingtime) {
    res.status(400).json({ Error: 'All fiedls are required' });
    return;
  }
  const sql = `
  update "events"
    set "title" = $1,
    "date" = $2,
    "address" = $3,
    "city" = $4,
    "state" = $5,
    "lat" = $6,
    "lng" = $7,
    "startingtime" = $8
  where "eventID" = $9
  returning *
  `;
  const updatedValues = [title, date, address, city, state, lat, lng, startingtime, eventID];
  db.query(sql, updatedValues)
    .then(result => {
      if (!result.rows[0]) {
        res.status(404).json({ Erros: `Cannot find event with "eventID" ${eventID}` });
      }
      res.status(200).json(result.rows[0]);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ Error: 'An unexpected error occured' });
    });
});

app.delete('/api/events/:eventID', (req, res, next) => {
  const deleteId = Number(req.params.eventID);
  if (!Number.isInteger(deleteId)) {
    res.status(400).json({ Error: 'Invalid eventId' });
    return;
  }
  const sql = `delete from "events"
                      where "eventID" = $1
                      returning *`;
  const values = [deleteId];
  db.query(sql, values)
    .then(result => {
      const deletedEvent = result;
      if (!deletedEvent) {
        res.status(400).json({ Error: `Cannot find event at eventID ${deleteId} ` });
      } else {
        res.status(204).json(values);
      }
    }).catch(err => {
      console.error(err);
      res.status(500).json({ Error: 'An unexpected error occured' });
    });
});

app.post('/api/runninglogs', (req, res, next) => {
  const { date, distance, duration } = req.body;
  const userID = 1;
  const sql = `
  insert into "runninglogs" ("date","distance", "duration", "userID")
  values ($1, $2, $3, $4)
  returning "runninglogID"
  `;
  const params = [date, distance, duration, userID];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.row);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'An unexpected error has occured' });
    });
});

app.get('/api/runninglogs', (req, res, next) => {
  const sql = `
  select *
  from "runninglogs"
  `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.delete('/api/runninglogs/:runninglogID', (req, res, next) => {
  const runninglogId = parseInt(req.params.runninglogID);
  if (!Number.isInteger(runninglogId)) {
    res.status(400).json({ Error: 'Invalid runninglogId' });
    return;
  }
  const sql = `delete from "runninglogs"
                      where "runninglogID" = $1
                      returning *`;
  const values = [runninglogId];
  db.query(sql, values)
    .then(result => {
      const deletedEvent = result;
      if (!deletedEvent) {
        res.status(400).json({ Error: `Cannot find event at eventID ${runninglogId} ` });
      } else {
        res.status(204).json(values);
      }
    }).catch(err => {
      console.error(err);
      res.status(500).json({ Error: 'An unexpected error occured' });
    });
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
