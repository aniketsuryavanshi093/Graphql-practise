import { useState } from 'react'
import { useQuery } from '@apollo/client';
import { GET_BOOKINGS_QUERY } from '../../graphql/query';
import { Spinner } from '@nextui-org/react';
import ViewActivityModal from '../events/ViewActivityModal';
import useAuthContext from '../../Context/AuthCOntext/useAuthContext';
import BookingsList from './BookingsList';

const Bookings = () => {
    const { data, loading } = useQuery(GET_BOOKINGS_QUERY)
    const { user } = useAuthContext()
    console.log(data);
    const [activityModal, setActivityModal] = useState({ open: false, data: {} })

    return (
        <div className='w-full'>

            {
                loading ? (
                    <div className="spinner-card w-full my-14">
                        <Spinner className='w-full' color="primary" labelColor="primary" />
                    </div>
                )
                    :
                    (
                        <BookingsList setSelectedEvent={(data) => setActivityModal({ open: true, data })} bookings={data?.bookings} user={user} />
                    )
            }
            {
                activityModal.open && (
                    <ViewActivityModal booking isOpen={activityModal.open} bookingid={activityModal.data._id} data={activityModal.data.Event} onClose={() => setActivityModal({ open: false, data: {} })} />
                )
            }
        </div>
    )
}

export default Bookings