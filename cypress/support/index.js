import { exec } from 'child_process';

before((done) => {
  // Start the services with docker-compose up
  exec('docker-compose up -d', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error starting services: ${stderr}`);
      return done(err);
    }
    console.log(`Docker services started: ${stdout}`);
    done();
  });
});

after((done) => {
  // Stop and remove the services with docker-compose down
  exec('docker-compose down', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error stopping services: ${stderr}`);
      return done(err);
    }
    console.log(`Docker services stopped: ${stdout}`);
    done();
  });
});
