export const futureTripButtonsData = [
    {
        id: 1,
        name: "Availability",
        link: "/availability",
        submenu: [
            {
                id: 11,
                name: "My Availability",
                link: "/availability"
            },
            {
                id: 12,
                name: "Optimized dates",
                link: "/availability/optimizedDates"
            }
        ]
    },
    {
        id: 2,
        name: "Accommodations",
        link: "/accommodations",
        submenu: [
            {
                id: 21,
                name: "All Accommodations",
                link: "/accommodations"
            },
            {
                id: 22,
                name: "My accommodations",
                link: "/accommodations/myAccommodations"
            },
            {
                id: 23,
                name: "My votes",
                link: "/accommodations/myAccommodationVotes"
            }
        ]
    },
    {
        id: 3,
        name: "Participants",
        link: "/participants",
    },
    {
        id: 4,
        name: "Summary",
        link: "/tripSummary",
    }
];


export const currentTripButtonsData = [
    {
        id: 1,
        name: "Day plans",
        link: "/dayPlan",
    },
    {
        id: 2,
        name: "Finances",
        link: "/finances",
    },
    {
        id: 3,
        name: "Participants",
        link: "/participants",
    },
    {
        id: 4,
        name: "Summary",
        link: "/tripSummary",
    }
];


export const pastTripButtonsData = [
    {
        id: 1,
        name: "Finances",
        link: "/finances",
    },
    {
        id: 1,
        name: "Summary",
        link: "/tripSummary",
    },

    {
        id: 3,
        name: "Media",
        link: "/media",
    }
];

export const pastTripButtonsDataWithGroupId = (groupId) => {
    return [
        {
            id: 1,
            name: "Finances",
            link: "/finances/" + groupId,
        },
        {
            id: 1,
            name: "Summary",
            link: "/tripSummary/" + groupId,
        },

        // {
        //     id: 3,
        //     name: "Media",
        //     link: "/media",
        // }
    ];
}

export const currentTripButtonsDataWithGroupId = (groupId) => {
    return [
        {
            id: 1,
            name: "Day plans",
            link: "/dayPlan/" + groupId,
        },
        {
            id: 2,
            name: "Finances",
            link: "/finances/" + groupId,
        },
        {
            id: 3,
            name: "Participants",
            link: "/participants/" + groupId,
        },
        {
            id: 4,
            name: "Summary",
            link: "/tripSummary/" + groupId,
        }
    ];
}


export const futureTripButtonsDataWithGroupId = (groupId) => {
    return [{
        id: 1,
        name: "Availability",
        link: "/availability/" + groupId,
        submenu: [
            {
                id: 11,
                name: "My availability",
                link: "/availability/" + groupId
            },
            {
                id: 12,
                name: "Optimized dates",
                link: "/availability/optimizedDates/" + groupId
            }
        ]
    },
    {
        id: 2,
        name: "Accommodations",
        link: "/accommodations/" + groupId,
        submenu: [
            {
                id: 21,
                name: "All Accommodations",
                link: "/accommodations/" + groupId
            },
            {
                id: 22,
                name: "My accommodations",
                link: "/accommodations/myAccommodations/" + groupId
            },
            {
                id: 23,
                name: "My votes",
                link: "/accommodations/myAccommodationVotes/" + groupId
            }
        ]
    },
    {
        id: 3,
        name: "Participants",
        link: "/participants/" + groupId
    },
    {
        id: 4,
        name: "Summary",
        link: "/tripSummary/" + groupId,
    }

    ];
}
