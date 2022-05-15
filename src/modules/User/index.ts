import {ResponseToolkit, Server} from '@hapi/hapi';
import {Request} from '@hapi/hapi';
import Joi from 'joi';
import {createUser, findUser, findUsers, removeUser, updateUser} from '../../domains/User';
import {User} from '../../entity/User';

const UserModule = {
  name: 'user',
  version: '1.0.0',
  register: (server: Server) => {
    server.route({
      method: 'GET',
      path: '/user',
      options: {
        validate: {
          query: Joi.object({
            q: Joi.any(),
            current: Joi.number().required(),
            size: Joi.number().min(1).max(100).required()
          })
        }
      },
      handler: async (req: Request, h: ResponseToolkit) => {
        try {
          const { query } = req;
          const { q, current = 1, size = 10 } = query;
          const users = await findUsers(current, size, q);
          console.log('Query the user: ', users, ` at range [${current - 1}, ${(current - 1) + size - 1}]`);
          return h.response(users).type('application/json');
        } catch (err) {
          console.error(err);
          throw err;
        }
      }
    });

    server.route({
      method: 'POST',
      path: '/user',
      handler: async (req: Request, h: ResponseToolkit) => {
        try {
          const { payload } = req;
          await createUser(payload as User);
          console.log(`New user created - ${payload}`);
          return h.response({ status: 'success' }).type('application/json');
        } catch (err) {
          console.error(err);
          throw err;
        }
      }
    });

    server.route({
      method: 'PUT',
      path: '/user',
      handler: async (req: Request, h: ResponseToolkit) => {
        try {
          const { payload } = req;
          const newUser = await updateUser(payload as User);
          console.log(`Update the user - ${newUser}`);
          return h.response(newUser).type('application/json');
        } catch (err) {
          console.error(err);
          throw err;
        }
      }
    });

    server.route({
      method: 'DELETE',
      path: '/user',
      handler: async (req: Request, h: ResponseToolkit) => {
        try {
          const { query } = req;
          const { id } = query;
          const user = await findUser(id);
          await removeUser(user.id);
          console.log(`The ${user} has been deleted`);
          return h.response({ status: 'success' }).type('application/json');
        } catch (err) {
          console.error(err);
          throw err;
        }
      }
    });

    server.route({
      method: 'GET',
      path: '/user/{id}',
      handler: async (req: Request, h: ResponseToolkit) => {
        try {
          const { params } = req;
          const { id } = params;
          const user = await findUser(id);
          console.log(`Find the user - ${user}`);
          return h.response(user).type('application/json');
        } catch (err) {
          console.error(err);
          throw err;
        }
      }
    });
  }
};

export default { plugin: UserModule };
