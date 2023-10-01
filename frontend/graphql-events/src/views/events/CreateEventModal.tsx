import React from 'react'
import CustomModal from '../../Components/Modal/CustomModal'
import { Button, Input } from '@nextui-org/react'
import { Field, Form, Formik } from 'formik'
import { eventvalidation } from '../../validation/authvalidation'
import { useMutation } from '@apollo/client'
import { toast } from "react-toastify"
import { CREATE_EVENT } from '../../graphql/mutation'
import { CustomInput, customTextArea } from '../../utils/CustomComponents'
import { GET_EVENTS } from '../../graphql/query'
import useCachinghooks from '../../hooks/useCachinghooks'


const CreateEventModal = ({ isOpen, onClose }) => {
    const initialvalue = {
        title: "",
        description: "",
        date: "",
        price: null
    }
    const { updatecaching } = useCachinghooks()
    const [createevent, { loading }] = useMutation(CREATE_EVENT, {
        onCompleted(data) {
            console.log(data);
            toast.success("Event created Successfully")
            setTimeout(() => {
                onClose()
            }, 2000);
        },
        onError(er) {
            toast.error(er.message)
        },
        // Use the `update` function to update the cache
        update(cache, { data: { createEvents } }) {
            // Read the existing data from the cache    
            updatecaching(cache, GET_EVENTS, createEvents)
        },
    })
    const handleSubmit = (values: { title: string; description: string; date: string; price: null }) => {
        createevent({
            variables: {
                eventInput: {
                    ...values
                }
            }
        })
    }
    return (
        <CustomModal isOpen={isOpen} onClose={onClose} title="Create Event">
            <Formik
                initialValues={initialvalue}
                validationSchema={eventvalidation}
                enableReinitialize
                onSubmit={(values) => {
                    handleSubmit(values,);
                }}
            >
                {({ errors, handleChange }) => (
                    <Form>
                        <Field component={CustomInput}
                            label="Event Title" name="title" type="text" placeholder="Enter event title " variant="bordered"
                        />
                        <div className='mt-2'>
                            <Field component={CustomInput}
                                label="Price" name="price" type="number" placeholder="Enter event price " variant="bordered"
                            />
                        </div>

                        <div className='flex flex-col my-3'>
                            <label htmlFor='date' > Enter Date</label>
                            <input onChange={handleChange} id='date' className='p-2 border-gray-800 rounded-md border' type='datetime-local' name='date' />
                            {errors.date && <div className="invalid-feedback d-block mb-1">{errors.date}</div>}
                        </div>

                        <Field component={customTextArea}
                            label="Enter Description" name="description"
                        />
                        <div className='flex mb-3 mt-2 justify-around'>
                            <Button color='success' variant="ghost" className='w-[100px]' isLoading={loading} type='submit'>Confirm</Button>
                            <Button onClick={onClose} variant="ghost" className='w-[100px]'>Close</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </CustomModal>
    )
}

export default CreateEventModal