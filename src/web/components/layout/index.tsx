import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Header from '../header';
import Footer from '../footer';

const Layout = (
	props: Readonly<
		{ children: React.ReactNode } & Parameters<typeof Header>[0]
	>
) => {
	return (
		<>
			<Header setMode={props.setMode} isDarkMode={props.isDarkMode} />
			<CssBaseline />
			<GlobalStyles
				styles={`
                * {
                    scroll-behavior: smooth !important;
                }
                *::-webkit-scrollbar {
                    width: 8px;
                }
                *::-webkit-scrollbar-track {
                    background-color: transparent !important;
                }
                *::-webkit-scrollbar-thumb {
                    border: 2px solid transparent;
                    background-clip: padding-box;
                    border-radius: 9999px;
                    background-color: gray;
                }
          `}
			/>
			{props.children}
			<Footer />
		</>
	);
};

export default Layout;
