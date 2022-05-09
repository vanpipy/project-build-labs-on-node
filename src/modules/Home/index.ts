import {ResponseToolkit, Server} from '@hapi/hapi';
import {Request} from '@hapi/hapi';
import {createPage} from '../../utils/serverRender';
import Home from './component';

const HomeModule = {
  name: 'home',
  version: '1.0.0',
  register: (server: Server) => {
    server.route({
      method: 'GET',
      path: '/',
      handler: async (req: Request, h: ResponseToolkit) => {
        try {
          const { result } = await server.inject('/static/manifest.json');
          const { component, scripts, links } = await createPage(
            'home',
            JSON.parse(result as any),
            Home
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

export default { plugin: HomeModule };
