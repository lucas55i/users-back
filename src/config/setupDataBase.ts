import * as mongoose from 'mongoose';
import { Logger } from '@nestjs/common';

export const setupDatabase = () => {
  Logger.log('Setting up the database connection...');
  connectDatabase();
  mapDatabaseConnectionEvents();
};

const disconnectDatabase = (signal: any) => {
  Logger.log(`Received signal "${signal}".`);
  if (
    mongoose.connection.readyState != mongoose.ConnectionStates.uninitialized &&
    mongoose.connection.readyState != mongoose.ConnectionStates.disconnected
  ) {
    Logger.log('Closing database connection...');
    mongoose.disconnect(function () {
      Logger.log('All mongoose connections have been closed!');
    });
  }
  Logger.warn('Exiting...');
  process.exit(0);
};

const connectDatabase = () => {
  const connectionString = process.env.MONGO_CONNECTION_STRING;
  Logger.debug('Connecting to the database: ' + connectionString);
  mongoose
    .connect(connectionString, {
      dbName: 'Financas',
      autoCreate: true,
      serverSelectionTimeoutMS: 5000,
    })
    .then(() => {
      Logger.log('Successfully connected to the database!');
    })
    .catch((reason) => {
      Logger.error(`Database connection failed. Reason: ${reason}`);
      Logger.error('Aborting...');
      process.exit(1);
    });
};

const mapDatabaseConnectionEvents = () => {
  mongoose.connection.on('error', (err) => {
    Logger.error(`MongoDB error: ${err}`);
    Logger.error('Aborting...');
    process.exit(1);
  });

  // Close the database connection gracefully on termination
  process.on('SIGTERM', disconnectDatabase);
  process.on('SIGINT', disconnectDatabase);
  process.on('SIGBREAK', disconnectDatabase);
  process.on('SIGHUP', disconnectDatabase);
};
