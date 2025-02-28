import dynamic from 'next/dynamic';

export const events = [
    {
        id: 1,
        title: 'Festivals',
        time: '12:00 PM - 1:00 PM',
        description:
            "Celebrate a community's unique aspects, such as the Chokkanathaswamy Festival, Muthalamman Festival, and Mariamman Festival",
    },
    {
        id: 2,
        title: 'Ceremonies',
        time: '2:00 PM - 4:00 PM',
        description: 'Rituals performed on special occasions',
    },
    {
        id: 3,
        title: 'Parties',
        time: '4:00 PM - 6:00 PM',
        description: 'Social, recreational, or corporate events',
    },
];
export const EventCalendar = async ({
    data,
    modalData,
}: {
    data: Array<{ [key: string]: string }>;
    modalData: Array<{ [key: string]: string }>;
}) => {
    const EventCalendarContainer = dynamic(() => import('./EventCalendarContainer'), {
        loading: () => <h1>Loading...</h1>,
    });
    const EventsList = dynamic(() => import('./EventsList'), {
        loading: () => <h1>Loading...</h1>,
    });
    return (
        <div className="bg-white rounded-md p-3">
            <EventCalendarContainer />
            <EventsList data={data} modalData={modalData} />
        </div>
    );
};
