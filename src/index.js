import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Header from "./components/MainMenu/MainMenu";
import MainContainer from "./containers/MainContainer/MainContainer";
import NotFoundContainer from "./containers/NotFoundContainer/NotFoundContainer";
import Calendar from "./components/Calendar/Calendar";
import CalendarPage from "./pages/CalendarPage/CalendarPage";
const router = createBrowserRouter([
    {
        path: "/",
        element: <MainContainer/>,
        errorElement: <NotFoundContainer />,
        children:[
            {
                path:'calendar',
                element:<CalendarPage/>
            }
        ]
    },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
