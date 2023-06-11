import React from 'react';
import type { AppProps } from 'next/app';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
    createTheme,
    responsiveFontSizes,
    ThemeProvider,
} from '@mui/material/styles';
import { colorTheme } from '../src/web/theme';
import ErrorBoundary from '../src/web/components/error/boundary';
import consts from '../src/web/const';
import Layout from '../src/web/components/layout';
import '../src/web/css/font.css';
import '../src/web/typing/mui.d.ts';

const App = (props: AppProps) => {
    const { fontFamily } = consts;

    const modeKey = 'mode';

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const [mode, setMode] = React.useState('dark' as 'dark' | 'light');

    React.useEffect(() => {
        const value = localStorage.getItem(modeKey);
        setMode(
            value === 'dark' || value === 'light'
                ? value
                : prefersDarkMode
                ? 'dark'
                : 'light'
        );
    }, []);

    React.useEffect(() => {
        if (mode) {
            localStorage.setItem(modeKey, mode);
        }
    }, [mode]);

    const theme = React.useMemo(
        () =>
            responsiveFontSizes(
                createTheme({
                    typography: {
                        fontFamily,
                    },
                    palette: {
                        mode,
                        background: {
                            default:
                                mode === 'dark'
                                    ? colorTheme.contrast.black
                                    : colorTheme.contrast.white,
                        },
                        primary: {
                            main: colorTheme.blue.light,
                        },
                        secondary: {
                            main: colorTheme.green.dark,
                        },
                        custom: {
                            ...colorTheme,
                            default:
                                mode === 'dark'
                                    ? colorTheme.contrast.black
                                    : colorTheme.contrast.white,
                            opposite:
                                mode === 'light'
                                    ? colorTheme.contrast.black
                                    : colorTheme.contrast.white,
                        },
                    },
                    components: {
                        MuiCssBaseline: {
                            styleOverrides: `@font-face {${[
                                `font-family: '${fontFamily}'`,
                                'font-size: normal',
                                'font-display: swap',
                            ].join(';\n')}}`,
                        },
                    },
                    breakpoints: {
                        values: {
                            xs: 0,
                            sm: 500,
                            xm: 700,
                            md: 900,
                            lg: 1200,
                            xl: 1500,
                        },
                    },
                })
            ),
        [mode]
    );

    return (
        <ThemeProvider theme={theme}>
            <ErrorBoundary>
                <Layout
                    isDarkMode={mode === 'dark'}
                    setMode={() =>
                        setMode((mode) => (mode === 'dark' ? 'light' : 'dark'))
                    }
                >
                    <main>
                        <props.Component {...props.pageProps} />
                    </main>
                </Layout>
            </ErrorBoundary>
        </ThemeProvider>
    );
};

export default App;
