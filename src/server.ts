import 'dotenv/config'
import path from 'path';
import Hapi from '@hapi/hapi';
import vision from '@hapi/vision';
import inert from '@hapi/inert';
import ejs from 'ejs';
import modules from './modules';

export const createServer = () => {
  return Hapi.server({
    port: process.env.PORT || '3000',
    host: process.env.HOST || 'localhost'
  })
};

export const registerModules = async (server: Hapi.Server) => {
  await Promise.all(
    modules.map((module) => {
      return server.register(module);
    })
  );
};

export const registerTpl = async (server: Hapi.Server) => {
  await server.register(vision);

  server.views({
    engines: { html: ejs },
    relativeTo: path.resolve(__dirname, './views'),
    layout: 'layouts/reactive',
  });

  console.log('Template engine registered');
};

export const registerStaticServer = async (server: Hapi.Server) => {
  await server.register(inert);
  console.log('Static server registered');
};

export const initialize = async (server: Hapi.Server) => {
  await server.initialize()
  console.log('Server initialized');
};

export const start = async (server: Hapi.Server) => {
  await server.start();
  console.log('Server is running');
};
