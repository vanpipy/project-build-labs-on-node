import {join} from 'path';
import React from 'react';
import {renderToString} from 'react-dom/server';

type StrValueObject = { [key: string]: string };

const STATIC = '/static';

export const renderJSXToString = (node: () => JSX.Element) => {
  const element = React.createElement(node);
  return renderToString(element);
};

export const createScripts = (mapping: StrValueObject, id: string) => {
  return ['react', 'react-dom', 'ui', 'commons', id].map((key) => {
    const uri = mapping[`${key}.js`];
    return uri ? join(STATIC, uri) : '';
  }).reduce((scripts, uri) => {
    const script = uri ? `<script type="text/javascript" src="${uri}"></script>\n` : '';
    return scripts + script;
  }, '')
};

export const createStyles = (mapping: StrValueObject) => {
  return ['style'].map((key) => {
    const uri = mapping[`${key}.css`];
    return uri ? join(STATIC, uri) : '';
  }).reduce((links, uri) => {
    const link = uri ? `<link rel="stylesheet" href="${uri}">\n` : '';
    return links + link;
  }, '');
};

export const createPage = async (id: string, mappingJSON: StrValueObject, comp: () => JSX.Element) => {
  const links = createStyles(mappingJSON);
  const scripts = createScripts(mappingJSON, id);
  const component = renderJSXToString(comp);
  return { component, scripts, links };
};
