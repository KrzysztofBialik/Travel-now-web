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
                name: "Accommodations",
                link: "/accommodations"
            },
            {
                id: 22,
                name: "My Accommodations",
                link: "/accommodations/myAccommodations"
            },
            {
                id: 23,
                name: "My Votes",
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
        name: "Day Plans",
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

export const currentTripButtonsDataWithGroupId = (groupId) => {
 return [
    {
        id: 1,
        name: "Day Plans",
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
        link: "/participants/" + groupId,
    },
    {
        id: 4,
        name: "Summary",
        link: "/tripSummary",
    }
];
}


export const futureTripButtonsDataWithGroupId = (groupId) => {
    return [{
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
        link: "/accommodations/" + groupId,
        submenu: [
            {
                id: 21,
                name: "Accommodations",
                link: "/accommodations/" + groupId
            },
            {
                id: 22,
                name: "My Accommodations",
                link: "/accommodations/myAccommodations/" + groupId
            },
            {
                id: 23,
                name: "My Votes",
                link: "/accommodations/myAccommodationVotes/" + groupId
            }
        ]
    },
    {
        id: 3,
        name: "Participants",
        link: "/participants/" + groupId
    }];
}
