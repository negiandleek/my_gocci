const express = require('express');
const router = express.Router();

const photoList = [
    {
        id: "001",
        name: "photo001.jpg",
        type: "jpg",
        dataUrl: "http://localhost:3000/data/photo001.jpg"
    },{
        id: "002",
        name: "photo002.jpg",
        type: "jpg",
        dataUrl: "http://localhost:3000/data/photo002.jpg"
    }
];

router.get('/get/photo',(req,res) => {
    console.log('router.get');
    res.json(photoList);
});

module.exports = router;