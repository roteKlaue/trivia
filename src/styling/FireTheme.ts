import { createTheme } from "@mui/material/styles";
import { FIRE } from "./colors/fire";

export const FireDarkTheme = createTheme({
    palette: {
        mode: "dark",

        primary: {
            main: FIRE.orange.main,
            light: FIRE.orange.light,
            dark: FIRE.orange.dark,
            contrastText: "#000",
        },

        secondary: {
            main: FIRE.red.main,
        },

        background: {
            default: FIRE.dark.bg,
            paper: FIRE.dark.paper,
        },

        text: {
            primary: FIRE.text.lightPrimary,
            secondary: FIRE.text.lightSecondary,
        },

        error: {
            main: FIRE.red.error,
        },
    },

    shape: { borderRadius: 14 },

    typography: {
        fontFamily: `"Inter", "Roboto", sans-serif`,
        button: { textTransform: "none", fontWeight: 600 },
    },

    components: {
        // MuiButton: {
        //     styleOverrides: {
        //         root: {
        //             borderRadius: 14,
        //             fontWeight: 600,
        //             textTransform: "none",
        //         },

        //         contained: ({ theme }) => ({
        //             background: `linear-gradient(135deg,${theme.palette.primary.light},${theme.palette.primary.main})`,
        //             boxShadow: `0 0 12px ${FIRE.effects.glowMedium}`,
        //             "&:hover": {
        //                 boxShadow: `0 0 20px ${FIRE.effects.glowStrong}`,
        //             },
        //         }),

        //         outlined: ({ theme }) => ({
        //             borderWidth: 2,
        //             borderColor: theme.palette.primary.main,
        //             "&:hover": {
        //                 borderWidth: 2,
        //                 backgroundColor: `${theme.palette.primary.main}22`,
        //             },
        //         }),

        //         text: ({ theme }) => ({
        //             "&:hover": {
        //                 backgroundColor: `${theme.palette.primary.main}22`,
        //             },
        //         }),
        //     },
        // },

        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: `linear-gradient(145deg, ${FIRE.dark.paper}, ${FIRE.dark.paperAlt})`,
                },
            },
        },
    },
});

export const FireLightTheme = createTheme({
    palette: {
        mode: "light",

        primary: {
            main: FIRE.orange.main,
            light: FIRE.orange.lighter,
            dark: FIRE.orange.darker,
            contrastText: "#fff",
        },

        secondary: {
            main: FIRE.red.strong,
        },

        background: {
            default: FIRE.light.bg,
            paper: FIRE.light.paper,
        },

        text: {
            primary: FIRE.text.darkPrimary,
            secondary: FIRE.text.darkSecondary,
        },
    },

    shape: { borderRadius: 14 },

    typography: {
        fontFamily: `"Inter", "Roboto", sans-serif`,
        button: { textTransform: "none", fontWeight: 600 },
    },

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 14,
                    fontWeight: 600,
                    textTransform: "none",
                },

                contained: ({ theme }) => ({
                    background: `linear-gradient(135deg,${theme.palette.primary.light},${theme.palette.primary.main})`,
                    boxShadow: `0 0 12px ${FIRE.effects.glowMedium}`,
                    "&:hover": {
                        boxShadow: `0 0 20px ${FIRE.effects.glowStrong}`,
                    },
                }),

                outlined: ({ theme }) => ({
                    borderWidth: 2,
                    borderColor: theme.palette.primary.main,
                    "&:hover": {
                        borderWidth: 2,
                        backgroundColor: `${theme.palette.primary.main}22`,
                    },
                }),

                text: ({ theme }) => ({
                    "&:hover": {
                        backgroundColor: `${theme.palette.primary.main}22`,
                    },
                }),
            },
        },

        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: `linear-gradient(145deg, ${FIRE.light.paper}, ${FIRE.light.paperAlt})`,
                },
            },
        },
    },
});



