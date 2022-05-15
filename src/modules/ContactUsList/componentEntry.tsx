import React from 'react';
import ReactDom from 'react-dom/client';
import ContactUsList from './component.tsx';

const app = document.getElementById('app');
ReactDom.hydrateRoot(app as HTMLElement, <ContactUsList />);
