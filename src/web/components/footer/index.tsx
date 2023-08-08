import React from 'react';
import Typography from '@mui/material/Typography';
import Holder from '../common/holder';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import useBreakpoint from '../../hooks/use-breakpoint-value';

const Footer = () => {
	const breakPoint = useBreakpoint();

	const isMobile = breakPoint === 'xs';

	return (
		<Holder
			sx={{
				m: 0,
				mt: 8,
				mb: isMobile ? 8 : 0,
			}}
		>
			<Box
				sx={{
					mb: 4,
					whiteSpace: 'pre-wrap',
					...(!isMobile
						? {
								display: 'flex',
						  }
						: {
								display: 'grid',
								placeItems: 'center',
								gridGap: 8,
						  }),
				}}
			>
				<Box>
					<Typography
						sx={{
							color: 'text.secondary',
						}}
					>
						<Link
							href="https://creativecommons.org/licenses/by-nc-sa/4.0"
							target="_blank"
							rel="noopener noreferrer"
							sx={{
								textDecoration: 'underline',
								color: 'text.secondary',
								textDecorationColor: 'text.secondary',
								'&:hover': {
									color: 'text.primary',
									textDecorationColor: 'text.primary',
								},
							}}
						>
							CC BY-NC-SA 4.0
						</Link>{' '}
					</Typography>
				</Box>
				<Box>
					<Typography
						sx={{
							color: 'text.secondary',
						}}
					>
						2022 - Present © Gervin Fung
					</Typography>
				</Box>
			</Box>
		</Holder>
	);
};

export default Footer;
