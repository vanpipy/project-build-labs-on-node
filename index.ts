import {createServer, initialize, registerModules, registerStaticServer, registerTpl, start} from './src/server';
import AppDB from './src/database';
import {resolve} from 'path';

const main = async () => {
  const server = createServer();
  await registerTpl(server);
  await registerStaticServer(server);

  server.route({
    method: 'GET',
    path: '/static/{param*}',
    handler: {
      directory: {
        path: resolve(__dirname, './public')
      }
    }
  });

  await registerModules(server);
  await initialize(server);
  await start(server);

  try {
    await AppDB.initialize();
    console.log('App DB initialized successfully');
  } catch (err) {
    console.log('Failed to initialize the App DB');
    console.error(err);
  }
};

process.on('unhandledRejection', (err: Error) => {
  console.log(err);
  process.exit(1);
});

main();
