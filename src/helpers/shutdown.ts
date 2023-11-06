export const shutdown = (server) => {
  // Close the server to stop accepting new connections
  server.close((err) => {
    if (err) {
      console.error('Error while closing the server:', err);
      process.exit(1);
    }

    // Perform any cleanup tasks here (e.g., closing database connections)
    // ...

    console.log('Server has been closed gracefully.');
    process.exit(0);
  });
};
