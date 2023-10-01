import React from 'react';

export const userRoutes = [
    {
        path: '/event',
        name: 'Event',
        exact: true,
        component: React.lazy(() => import('../views/events/Events')),
    },
    {
        path: '/booking',
        name: 'Booking',
        exact: true,
        component: React.lazy(() => import('../views/Booking/Bookings')),
    },
    {
        redirectRoute: true,
        name: 'Home',
        path: '/booking'
    }
]


export const guestRoutes = [
    {
        path: '/auth',
        exact: true, name: 'auth',
        component: React.lazy(() => import('../views/auth/Auth')),
    },
    {
        path: '/event',
        name: 'Event',
        exact: true,
        component: React.lazy(() => import('../views/events/Events')),
    },
    {
        redirectRoute: true,
        name: 'Home',
        path: '/auth'
    }
]