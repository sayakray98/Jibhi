import './index.css';
import Applayouts from './components/Applayouts/Applayouts';
import Home from './components/Home/Home';
import Properties from './components/Properties/Properties';
import PropertyDetail from './components/PropertyDetail/PropertyDetail';
import Packages from './components/Packages/Packages';
import PhotoGallery from './components/PhotoGallery/PhotoGallery';
import Blog from './components/Blog/Blog';
import Contact from './components/Contact/Contact';

import {
  createHashRouter,
  RouterProvider
} from "react-router-dom";

const router = createHashRouter([
  {
    path: "/",
    element: <Applayouts />,
    children: [
      { index: true, element: <Home /> },
      { path: "properties", element: <Properties /> },
      { path: "property/:id", element: <PropertyDetail /> },
      { path: "packages", element: <Packages /> },
      { path: "gallery", element: <PhotoGallery /> },
      { path: "blog", element: <Blog /> },
      { path: "contact", element: <Contact /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}