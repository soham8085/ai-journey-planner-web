export const SelectTravelersList = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'A solo traveler in exploration.',
        icon: '✈',
        people: '1'
    },
    {
        id: 2,
        title: 'A Couple',
        desc: 'Two travelers in tandem.',
        icon: '🥂',
        people: '2'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A group of fun-loving adventurers.',
        icon: '🏡',
        people: '3 to 5'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'A bunch of thrill-seekers.',
        icon: '👯',
        people: '5 to 10'
    },
];

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay conscious of costs.',
        icon: '💵',
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Keep costs on the average side.',
        icon: '💰',
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Don’t worry about costs.',
        icon: '💸',
    },
];

export const AI_PROMPT = "Generate Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.";
