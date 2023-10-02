import React from 'react'
import CustomModal from '../../Components/Modal/CustomModal'
import moment from "moment"
import useAuthContext from '../../Context/AuthCOntext/useAuthContext'
import { Button } from '@nextui-org/react'
import { useMutation } from '@apollo/client'
import { toast } from "react-toastify"
import { CREATE_BOOKING_MUTATION } from '../../graphql/mutation'
import { useNavigate } from 'react-router-dom'
import { GET_BOOKINGS_QUERY } from '../../graphql/query'
import useCachinghooks from '../../hooks/useCachinghooks'

const ViewActivityModal = ({ isOpen, onClose, data, booking }) => {
    const { user } = useAuthContext()
    console.log(data);

    const { updatecaching } = useCachinghooks()
    const naviagte = useNavigate()
    const [createBooking, { loading, error }] = useMutation(CREATE_BOOKING_MUTATION, {
        onCompleted(data) {
            console.log(data);
            toast.success("Booking created Successfully")
            setTimeout(() => {
                onClose()
                naviagte("/booking")
            }, 2000);
        },
        update(cache, { data: { createBooking } }) {
            updatecaching(cache, GET_BOOKINGS_QUERY, createBooking, "bookings")
        },
        onError(er) {
            console.log(er);
        }
    })
    const handleBooking = () => {
        createBooking({
            variables: {
                bookingInput: {
                    eventId: data._id,
                },
            }
        })
    }
    const handleCancel = () => {

    }
    return (
        <CustomModal size={"sm"} isOpen={isOpen} onClose={onClose} title={data.title}>
            <div className='w-full'>
                <div className='flex w-full justify-start'>
                    <p className='text-base text-default-700'>Date: </p>
                    <p className='text-base text-default-700'>{moment(data.date).format('lll')}</p>
                </div>
                <div className='flex w-full my-2 justify-start'>
                    <p className='text-base text-default-700'>Price: </p>
                    <p className='text-base text-default-700'>{data.price}</p>
                </div>
                <div className='flex w-full mb-2 justify-start'>
                    <p className='text-base text-default-700'>Description: </p>
                    <p className='text-base text-default-700'>{data.description}</p>
                </div>

            </div>
            <div className='flex mb-3 mt-2 justify-around'>
                {
                    booking ? (
                        <Button color='danger' variant="ghost" className='w-[100px]' onClick={handleCancel} isLoading={loading} type='submit'>Cancel</Button>
                    )
                        :
                        user && !((user?.userId || user?._id) === data.creator._id) && (
                            <Button color='success' variant="ghost" className='w-[100px]' onClick={handleBooking} isLoading={loading} type='submit'>Confirm</Button>
                        )
                }
                <Button onClick={onClose} variant="ghost" className='w-[100px]'>Close</Button>
            </div>
        </CustomModal>
    )
}

export default ViewActivityModal