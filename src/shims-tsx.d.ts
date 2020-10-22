import Vue, { VNode } from 'vue';

declare global {
  namespace JSX {
    /* eslint-disable */
    interface Element extends VNode {}
    /* eslint-disable */
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
