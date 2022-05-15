import {ResponseToolkit, Server} from '@hapi/hapi';
import {Request} from '@hapi/hapi';
import {createFeedback, findFeedbacks, getTotalOfFeedbacks} from '../../domains/Feedback';
import {Feedback} from '../../entity/Feedback';
import {createPage} from '../../utils/serverRender';
import {contactUsValidation} from '../../utils/validation';
import ContactUs from './component';

const ContactUsModule = {
  name: 'contactus',
  version: '1.0.0',
  register: (server: Server) => {
    server.route({
      method: 'GET',
      path: '/contactus-page',
      handler: async (_req: Request, h: ResponseToolkit) => {
        try {
          const { result } = await server.inject('/static/manifest.json');
          const { component, scripts, links } = await createPage(
            'contactus',
            JSON.parse(result as any),
            ContactUs
          );
          return h.view('pages/reactive', { component, scripts, links });
        } catch (err) {
          console.error(err);
          return h.view('pages/500');
        }
      }
    });

    server.route({
      method: 'GET',
      path: '/contactus',
      handler: async (req: Request, h: ResponseToolkit) => {
        try {
          const { query } = req;
          const { current = 1, size = 10, q } = query;
          const feedbacks = await findFeedbacks(current, size, q);
          const total = await getTotalOfFeedbacks();
          console.log(`Query the feedbacks - ${feedbacks}`);
          return h.response({ total, records: feedbacks }).type('application/json');
        } catch (err) {
          console.error(err);
          throw err;
        }
      }
    });

    server.route({
      method: 'POST',
      path: '/contactus',
      options: {
        validate: {
          payload: contactUsValidation
        }
      },
      handler: async (req: Request, h: ResponseToolkit) => {
        try {
          const { payload } = req;
          await createFeedback(payload as Feedback);
          console.log('New feedback created');
          return h.redirect('/');
        } catch (err) {
          console.error(err);
          throw err;
        }
      }
    });
  }
};

export default { plugin: ContactUsModule };
