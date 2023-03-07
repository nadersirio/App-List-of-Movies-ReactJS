import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import React from "react";
import ReactDOM from "react-dom/client";
import Movie from "./components/Movie";
import NewMovie from './components/newMovie';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} />
      <Route path='/movie/:nameMovie' element={<Movie />} />
      <Route path='/new-movie' element={<NewMovie />} />
      <Route path='/new-movie/:id' element={<NewMovie />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();