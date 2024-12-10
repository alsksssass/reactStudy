import React from 'react';
import ReactDOM from 'react-dom/client';
// import { createBrowserRouter, HashRouter, RouterProvider } from 'react-router-dom';
// import Home from './routes/Home';
// import Detail from './routes/Detail';
// import List from './routes/List';
// import ReactGA from "react-ga4";
import App from './App';
import "./input.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
// 구버전
// ReactDOM.render(<App />, document.getElementById('root')) // 


// if (process.env.REACT_APP_GA_KEY) {
//   ReactGA.initialize(process.env.REACT_APP_GA_KEY);
// }

// const basename = process.env.PUBLIC_URL;
// const root = ReactDOM.createRoot(document.getElementById('root'));
// const routes = [
//   {
//     path: '/',
//     element: <Home />,
//   },
//   {
//     path: '/detail/:id',
//     element: <Detail />,
//   },
//   {
//     path: '/list',
//     element: <List />,
//   }
// ];

// const router = createBrowserRouter(routes, {basename: basename});

// root.render(
//   // <React.StrictMode>
//   <RouterProvider router={router} />
//   // </React.StrictMode>
// );