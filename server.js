// Budget API

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const BudgetEntry = require('./budgetEntryModel');

app.use(cors());
app.use('/', express.static('public'))
app.use(express.static('./'));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/personal-budget-data', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((conn=> {
    console.log("DB connection successful");
})).catch((error) =>{
    console.log("Error while connecting to DB.Check if the database is up and running.")
});


//api to fetch the budget data from db
app.get('/budget',async(req,res)=>{
    try {
        const budgetData = await BudgetEntry.find({}); // Fetch all entries from the chart
        res.json({ myBudget: budgetData });
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

// Add new budget data entry api
app.post('/add-budget', async (req, res) => {
    try {
      const newEntry = new BudgetEntry(req.body);
      const savedEntry = await newEntry.save();
      res.status(201).json(savedEntry);
    } catch (error) {
      res.status(400).json({ error: 'Bad Request' });
    }
  });


  // Add multiple budget data entries api
app.post('/add-budget-list', async (req, res) => {
    try {
      const savedEntry = await BudgetEntry.insertMany(req.body);
      res.status(201).json(savedEntry);
    } catch (error) {
        console.log(error);
      res.status(400).json({ error: 'Bad Request' });
    }
  });

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});