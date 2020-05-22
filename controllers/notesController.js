const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/api/notes/:id', (req, res) => {
  db.Book.findAll({
    where: {
      id: req.params.id
    },
    include: [db.Note]
  })
  .then(results => res.json(results))
  .catch(error => {
    console.log(error)
    res.status(500).json(error)
  })
});

router.post('/api/note', (req, res) => {
  /**
   req.body = {
     note: 'Great Book!'
     BookId: 1
   }
   */
  // INSERT INTO `Notes` (`id`,`note`,`createdAt`,`updatedAt`,`BookId`) VALUES (DEFAULT,?,?,?,?);
  db.Note.create(req.body)
  .then((results) => res.status(200).json(results))
  .catch(error => res.status(500).json(error))
});

router.delete('/api/note/:id', (req, res) => {
  db.Note.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((results) => res.status(200).json(results))
  .catch(error => res.status(500).json(error))
});

module.exports = router;