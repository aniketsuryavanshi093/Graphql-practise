import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import moment from 'moment';

const EventsList = ({ events, user, setSelectedEvent }) => {
    return (
        <div className="gap-2 my-6 grid grid-cols-2 sm:grid-cols-4">
            {events?.map((item, index) => (
                <Card shadow="sm" key={index} >
                    <CardBody className="overflow-visible p-0 relative">
                        <div className='absolute z-50 top-2 right-2'>
                            {
                                (user?.userId || user?._id) === item.creator._id ? (
                                    <p className='m-0 text-small mt-1 text-default-500'>Your Event</p>
                                )
                                    :
                                    (
                                        <Button size="sm" className='' color="primary" onClick={() => setSelectedEvent(item)} variant="ghost">View Details</Button>
                                    )
                            }
                        </div>
                        <Image
                            shadow="sm"
                            radius="lg"
                            width="100%"
                            alt={item.title}
                            className="w-full object-cover h-[140px]"
                            src={item.img}
                        />
                        <div className='absolute bottom-2 text-small left-1'>
                            <p>{moment(item.date).format('lll')}</p>
                        </div>
                    </CardBody>
                    <CardFooter className="text-small justify-between">
                        <b>{item.title}</b>
                        <p className="text-default-500">{item.price}</p>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}

export default EventsList