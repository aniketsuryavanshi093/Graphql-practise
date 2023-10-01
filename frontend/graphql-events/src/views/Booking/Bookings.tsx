import React from 'react'
import useAuthContext from '../../Context/AuthCOntext/useAuthContext';

const Bookings = () => {
    console.log(useAuthContext());
    return (
        <div>Bookings</div>
    )
}

export default Bookings