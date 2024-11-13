import type {} from 'piral-menu';

declare module 'piral-menu/lib/types' {
  interface PiralCustomMenuSettings {
    key: string;
    label: string;
    code?: string;
    priority?: number;
    icon?: string;
    children?: PrismMenuSettings[];
  }
}
