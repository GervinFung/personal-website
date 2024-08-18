import type { SxProps, Theme } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { isFalse } from '@poolofdeath20/util';
import React from 'react';

import useBreakpoint from '../../hooks/use-breakpoint-value';
import Holder from '../common/holder';

const Footer = () => {
	const breakPoint = useBreakpoint();

	const isMobile = breakPoint === 'xs';

	const [show, setState] = React.useState(false);

	React.useEffect(() => {
		setState(true);
	}, []);

	const animation: SxProps<Theme> | undefined =
		process.env.NEXT_PUBLIC_NODE_ENV === 'testing'
			? undefined
			: {
					transition: 'opacity 1s, transform 1s',
					transitionDelay: '200ms',
					opacity: show ? 1 : 0,
					transform: show ? 'translateY(0)' : 'translateY(-100%)',
				};

	return (
		<Holder
			sx={{
				m: 0,
				mt: 8,
				...animation,
			}}
		>
			<Box
				sx={{
					mb: 4,
					whiteSpace: 'pre-wrap',
					...(isFalse(isMobile)
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
							rel="external nofollow noopener noreferrer"
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
