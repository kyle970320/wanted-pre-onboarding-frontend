import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import CompRoute from './comp/CompRoute';
/* import App from './App'; */



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  /* React.StrictMode */
  <BrowserRouter>
    <CompRoute/>
  </BrowserRouter>
);