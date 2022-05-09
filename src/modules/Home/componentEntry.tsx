import React from 'react';
import ReactDom from 'react-dom/client';
import Home from './component';

const app = document.getElementById('app');
ReactDom.hydrateRoot(app as HTMLElement, <Home />);
