import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'react-svg-radar-chart/build/css/index.css';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { theme } from 'twin.macro';
import App from './App';
import About from './components/pages/About/About';
import Error from './components/pages/Error';
import Review from './components/pages/Review/Review';
import ReviewList from './components/pages/ReviewList/ReviewList';
import { reviewLoader } from './hooks/loaders/reviewLoader';
import './index.css';
import reportWebVitals from './reportWebVitals';

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <ReviewList />
      },
      {
        path: "/review/:reviewId",
        loader: reviewLoader(queryClient),
        element: <Review />
      },
      {
        path: "/about/:aboutId",
        loader: reviewLoader(queryClient),
        element: <About />
      },
      {
        path: "/about",
        loader: reviewLoader(queryClient),
        element: <About />
      }
    ]
  },
  {
    path: "*",
    element: <Error />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <Helmet>
          <meta name="theme-color" content={theme`colors.neutral[800]`} media="(prefers-color-scheme: dark)" />
          <meta name="theme-color" content={theme`colors.neutral[200]`} />
          <meta name="apple-mobile-web-app-status-bar-style" content="#e11d48" />
          <title>The Progressive Review</title>
          {
            process.env.NODE_ENV === 'development' &&
            <script src="http://localhost:8097"></script>
          }
        </Helmet>
        <Tooltip />
        <RouterProvider router={router} />
      </HelmetProvider>
    </QueryClientProvider>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
