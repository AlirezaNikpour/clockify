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
    TRACKER: {
        RELATIVE: "tracker",
        ABSOLUTE: "/tracker",
    },
};

export default ROUTE_CONSTANTS;