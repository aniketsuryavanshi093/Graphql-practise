import React from 'react'

const useCachinghooks = () => {
    const updatecaching = (cache, query, existingdata) => {
        const existingEvents = cache.readQuery({ query });
        // Add the newly created event to the existing data
        const newEvents = {
            events: [...existingEvents.events, existingEvents],
        };
        // Write the updated data back to the cache
        cache.writeQuery({
            query,
            data: newEvents,
        });
    }

    return { updatecaching }
}

export default useCachinghooks