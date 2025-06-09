import 'dotenv/config';

import app from './app.js';
import { testDatabaseConnection } from './config/database.js';
import { startCloseExpiredSurveysJob } from './jobs/closeExpiredSurveys.js';

const PORT = process.env.PORT || 5000;

testDatabaseConnection().then((isConnected) => {
  if (isConnected) {
    startCloseExpiredSurveysJob();

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`)
    });
  } else {
    console.error('❌ Failed to start server due to database connection issues');
    process.exit(1);
  }
});
