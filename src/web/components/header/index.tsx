import type { Mode } from '@poolofdeath20/util';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import consts from '../../const';
import useBreakpoint from '../../hooks/use-breakpoint-value';
import useHeight from '../../hooks/use-height';
import Holder from '../common/holder';

import { Contact, Github, Instagram, LinkedIn, Projects } from './icons';
import ThemeMenu from './theme-menu';

const Header = () => {
	const router = useRouter();
	const route = router.route.replace('/', '') || 'home';

	const breakPoint = useBreakpoint();

	const height = useHeight();

	return (
		<Holder
			sx={{
				boxSizing: 'border-box',
			}}
		>
			<Box
				sx={{
					width: '100%',
				}}
			>
				<AppBar
					position="fixed"
					elevation={0}
					sx={({ palette }) => {
						return {
							backgroundColor: 'custom.default',
							display: 'grid',
							placeItems: 'center',
							borderBottom: !height
								? undefined
								: `1px solid ${palette.grey[palette.mode === 'dark' ? 900 : 500]}`,
						};
					}}
				>
					<Toolbar
						sx={{
							py: 2,
							px: breakPoint === 'xs' ? 1 : `0px !important`,
							width: consts.width.projects[breakPoint ?? 'xl'],
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<Box>
							<Link
								href="/"
								style={{
									textDecoration: 'none',
								}}
							>
								<Image
									alt="logo"
									loading="lazy"
									src="/images/icons/icon-72x72.png"
									width={36}
									height={36}
									style={{
										display: 'block',
									}}
								/>
							</Link>
						</Box>
						<Stack
							direction="row"
							spacing={{
								xs: 1,
								sm: 2,
							}}
							alignContent="center"
							justifyContent="flex-end"
						>
							<Projects route={route} />
							<Contact route={route} />
							<Github />
							<LinkedIn />
							<Instagram />
							<ThemeMenu />
						</Stack>
					</Toolbar>
				</AppBar>
			</Box>
		</Holder>
	);
};

export type { Mode };

export default Header;
