import {ResponseToolkit, Server} from '@hapi/hapi';
import {Request} from '@hapi/hapi';
import {createPage} from '../../utils/serverRender';
import ContactUs from './component';
import {contactUsValication} from './model';

const ContactUsModule = {
  name: 'contactus',
  version: '1.0.0',
  register: (server: Server) => {
    server.route({
      method: 'GET',
      path: '/contactus',
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
      method: 'POST',
      path: '/contactus',
      options: {
        validate: {
          payload: contactUsValication
        }
      },
      handler: async (req: Request, h: ResponseToolkit) => {
        return h.response('success')
          .type('application/json')
      }
    })
  }
};

export default { plugin: ContactUsModule };
