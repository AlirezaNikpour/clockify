const ROUTE_CONSTANTS = {
    ROOT: {
        RELATIVE: "/",
        ABSOLUTE: "/",
    },
    ROOT_STAR: {
        RELATIVE: "/*",
        ABSOLUTE: "/*",
    },
    USER: {
        RELATIVE: "user",
        ABSOLUTE: "/user",
        PROFILE: {
            RELATIVE: "setting",
            ABSOLUTE: "/user/setting"
        },
    },
    PROJECT: {
        RELATIVE: "projects",
        ABSOLUTE: "/projects",
    },
    REPORT: {
        RELATIVE: "reports",
        ABSOLUTE: "/reports",
    },
    CLIENT: {
        RELATIVE: "clients",
        ABSOLUTE: "/clients",
    },
    HOME: {
        RELATIVE: "/",
        ABSOLUTE: "/",
    },
    TRACKER: {
        RELATIVE: "time-tracker",
        ABSOLUTE: "/time-tracker",
    },
};

export default ROUTE_CONSTANTS;