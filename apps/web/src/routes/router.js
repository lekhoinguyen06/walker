import { createBrowserRouter, Navigate } from 'react-router';
import { LandingPage } from '@/features/landing/page';
import { DemoPage } from '@/features/demo/page';
import LoginPage from '@/features/login/page';
import SignupPage from '@/features/signup/page';
import GoogleOAuth from '@/features/oauth';
export var router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />,
    },
    {
        path: '/demo',
        element: <DemoPage />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/signup',
        element: <SignupPage />,
    },
    {
        path: '/oauth/google',
        element: <GoogleOAuth />,
    },
    {
        path: '*',
        element: <Navigate to="/"/>,
    },
]);
