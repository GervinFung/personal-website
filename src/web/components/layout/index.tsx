import React, { type PropsWithChildren } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Header from '../header';
import Footer from '../footer';

const Layout = (props: Readonly<PropsWithChildren>) => {
	return (
		<React.Fragment>
			<Header />
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
			<Box
				sx={{
					mt: 4,
					width: '100%',
				}}
			>
				{props?.children}
			</Box>
			<Footer />
		</React.Fragment>
	);
};

export default Layout;
