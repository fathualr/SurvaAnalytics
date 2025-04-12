require('dotenv').config()

const app = require('./app');
const { testDatabaseConnection } = require('./config/supabase');
const PORT = process.env.PORT || 5000;

testDatabaseConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });