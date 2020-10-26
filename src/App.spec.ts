import { mount } from '@vue/test-utils';
import { render } from '@vue/server-test-utils';
import App from './App.vue';

describe('App', () => {
    it('should render without exception', () => {
        const app = () => mount(App);
        expect(app).not.toThrow();
    });

    it('should match the snapshot', async () => {
        const result = await render(App);
        expect(result).toMatchSnapshot();
    });
});
