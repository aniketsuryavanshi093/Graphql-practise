import { Button, Spinner } from '@nextui-org/react'
import { useState } from 'react'
import CreateEventModal from './CreateEventModal'
import useAuthContext from '../../Context/AuthCOntext/useAuthContext'
import { GET_EVENTS } from '../../graphql/query'
import { useQuery } from '@apollo/client'
import EventsList from '../../Components/Events/EventsList'
import ViewActivityModal from './ViewActivityModal'

const Events = () => {
    const [OpenModal, setOpenModal] = useState(false)
    const [activityModal, setActivityModal] = useState({ open: false, data: {} })
    const { user } = useAuthContext()
    const { data, loading } = useQuery(GET_EVENTS);
    console.log(data, user);

    return (
        <div className='w-full'>
            <div className='flex align-center w-full justify-between'>
                <h2 className=''>
                    All Events
                </h2>
                {
                    user && (
                        <Button onClick={() => setOpenModal(!OpenModal)} color="primary">
                            Create Event
                        </Button>
                    )
                }
                {
                    OpenModal && (
                        <CreateEventModal isOpen={OpenModal} onClose={() => setOpenModal(false)} />
                    )
                }
            </div>
            {
                loading ? (
                    <div className="spinner-card w-full my-14">
                        <Spinner className='w-full' color="primary" labelColor="primary" />
                    </div>
                )
                    :
                    (
                        <EventsList setSelectedEvent={(data) => setActivityModal({ open: true, data })} events={data?.events} user={user} />
                    )
            }
            {
                activityModal.open && (
                    <ViewActivityModal isOpen={activityModal.open} data={activityModal.data} onClose={() => setActivityModal({ open: false, data: {} })} />
                )
            }

        </div>

    )
}

export default Events