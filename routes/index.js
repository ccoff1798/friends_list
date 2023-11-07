const express = require('express');
const router = express.Router();
const userRoutes = require('./api/userRoutes'); 
const thoughtRoutes = require('./api/thoughtRoutes'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = router;
