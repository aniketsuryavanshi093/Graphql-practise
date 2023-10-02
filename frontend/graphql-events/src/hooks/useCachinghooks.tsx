import React from 'react'

const useCachinghooks = () => {
    const updatecaching = (cache, query, existingdata, key) => {
        const existingEvents = cache.readQuery({ query });
        console.log(existingEvents);

        // Add the newly created event to the existing data
        const newEvents = {
            [key]: [...existingEvents[`${key}`], existingdata],
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