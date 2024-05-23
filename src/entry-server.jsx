import { renderToString } from 'react-dom/server';

import App from './app';

//X export const render = () => {
//X  return renderToString(<App />);   
export const render = (data) => {
return renderToString(<App data={data} />);
};
