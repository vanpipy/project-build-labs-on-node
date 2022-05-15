import {ResponseToolkit, Server} from '@hapi/hapi';
import {Request} from '@hapi/hapi';
import {createPage} from '../../utils/serverRender';
import ContactUsList from './component';

const ContactUsListModule = {
  name: 'contactuslist',
  version: '1.0.0',
  register: (server: Server) => {
    server.route({
      method: 'GET',
      path: '/contactus-list',
      handler: async (_req: Request, h: ResponseToolkit) => {
        try {
          const { result } = await server.inject('/static/manifest.json');
          const { component, scripts, links } = await createPage(
            'contactuslist',
            JSON.parse(result as any),
            ContactUsList
          );
          return h.view('pages/reactive', { component, scripts, links });
        } catch (err) {
          console.error(err);
          return h.view('pages/500');
        }
      }
    });
  }
};

export default { plugin: ContactUsListModule };
