import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import * as MuiLink from '@mui/material/Link';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Holder from '../common/holder';
import useWordScramble from '../../hooks/use-word-scramble';
import useBreakpoint from '../../hooks/use-breakpoint-value';
import { capitalize } from '../../utils';
import links from '../../links';
import '../../../../env.d.ts';
import consts from '../../const';

const ids = ['home', 'projects', 'contact'] as const;

type Id = (typeof ids)[number];

const SocialButton = (
	props: Readonly<{
		href: string;
		children: React.ReactNode;
	}>
) => {
	return (
		<MuiLink.default
			href={props.href}
			target="_blank"
			rel="noopener noreferrer"
			underline="none"
			sx={{
				display: 'flex',
				alignItems: 'center',
				borderRadius: '50%',
				border: 'none',
			}}
		>
			{props.children}
		</MuiLink.default>
	);
};

const CustomLink = (
	props: Readonly<{
		id: Id;
		isActive: boolean;
		shouldUseIcon: boolean;
	}>
) => {
	const wordScramble = useWordScramble({
		count: 10,
		timeOut: 30,
		content: capitalize(props.id),
	});

	return (
		<Link
			href={`/${props.id === 'home' ? '' : props.id}`}
			style={{ textDecoration: 'none' }}
		>
			{props.shouldUseIcon ? null : (
				<Box
					onMouseOver={wordScramble.start}
					onMouseOut={wordScramble.stop}
					sx={{
						transition: 'border 0.5s',
						boxSizing: 'border-box',
					}}
				>
					<Typography
						sx={({ palette }) => {
							return {
								fontWeight: props.isActive
									? 'bolder'
									: undefined,
								color: !props.isActive
									? palette.text.secondary
									: palette.text.primary,
								'&:hover': {
									color: palette.custom.opposite,
								},
							};
						}}
					>
						{wordScramble.word()}
					</Typography>
				</Box>
			)}
		</Link>
	);
};

const EssentialIcons = {
	Projects: (props: Readonly<{ dontUseLink?: true }>) => {
		const Icon = (
			<IconButton>
				<LightbulbIcon
					sx={{
						color: 'text.secondary',
					}}
				/>
			</IconButton>
		);
		return props.dontUseLink ? (
			Icon
		) : (
			<Link
				href="/projects"
				style={{
					textDecoration: 'none',
				}}
			>
				{Icon}
			</Link>
		);
	},
	Contact: (props: Readonly<{ dontUseLink?: true }>) => {
		const Icon = (
			<IconButton>
				<EmailIcon
					sx={{
						color: 'text.secondary',
					}}
				/>
			</IconButton>
		);
		return props.dontUseLink ? (
			Icon
		) : (
			<Link
				href="/contact"
				style={{
					textDecoration: 'none',

					color: 'text.secondary',
				}}
			>
				{Icon}
			</Link>
		);
	},
	Github: (props: Readonly<{ dontUseLink?: true }>) => {
		const Icon = (
			<IconButton>
				<GitHubIcon
					sx={{
						color: 'text.secondary',
					}}
				/>
			</IconButton>
		);
		return props.dontUseLink ? (
			Icon
		) : (
			<SocialButton href={links.github}>{Icon}</SocialButton>
		);
	},
	LinkedIn: (props: Readonly<{ dontUseLink?: true }>) => {
		const Icon = (
			<IconButton>
				<LinkedInIcon
					sx={{
						color: 'text.secondary',
					}}
				/>
			</IconButton>
		);

		return props.dontUseLink ? (
			Icon
		) : (
			<SocialButton href={links.linkedin}>{Icon}</SocialButton>
		);
	},
};

const Header = (
	props: Readonly<{
		isDarkMode: boolean;
		setMode: () => void;
	}>
) => {
	const router = useRouter();
	const route = router.route.replace('/', '');

	const breakPoint = useBreakpoint();
	const allShouldUseIcon = breakPoint === 'xm' || breakPoint === 'sm';
	const shouldUseBottonNavigation = breakPoint === 'xs';

	return (
		<Holder
			sx={{
				mb: shouldUseBottonNavigation ? 0 : 16,
				boxSizing: 'border-box',
			}}
		>
			{!shouldUseBottonNavigation ? null : (
				<Box
					sx={{
						zIndex: 2,
						position: 'fixed',
						bottom: 0,
						width: '100%',
					}}
				>
					<BottomNavigation
						showLabels
						value={
							ids
								.map((id, index) => {
									return {
										id,
										index: !index ? undefined : index - 1,
									};
								})
								.find(({ id }) => {
									return id === route;
								})?.index
						}
						sx={{
							width: '100%',
							backgroundColor: 'transparent',
							backdropFilter: 'blur(50px)',
						}}
						onChange={(_, value) => {
							const open = (link: string) => {
								return window.open(
									link,
									'_blank',
									'noopener noreferrer'
								);
							};
							if (value === 2) {
								return open(links.github);
							}
							if (value === 3) {
								return open(links.linkedin);
							}
							const id = ids.at(value + 1);
							if (id) {
								return router.push(id, undefined, {
									shallow: true,
								});
							}
						}}
					>
						<BottomNavigationAction
							label="Projects"
							icon={<EssentialIcons.Projects dontUseLink />}
							sx={({ palette }) => {
								return {
									color:
										route === ids[1]
											? `${palette.text.primary} !important`
											: undefined,
								};
							}}
						/>
						<BottomNavigationAction
							label="Contact"
							icon={<EssentialIcons.Contact dontUseLink />}
							sx={({ palette }) => {
								return {
									color:
										route === ids[2]
											? `${palette.text.primary} !important`
											: undefined,
								};
							}}
						/>
						<BottomNavigationAction
							label="Github"
							icon={<EssentialIcons.Github dontUseLink />}
						/>
						<BottomNavigationAction
							label="LinkedIn"
							icon={<EssentialIcons.LinkedIn dontUseLink />}
						/>
					</BottomNavigation>
				</Box>
			)}
			<Box
				sx={{
					width: '100%',
				}}
			>
				<AppBar
					position={shouldUseBottonNavigation ? 'relative' : 'fixed'}
					elevation={0}
					sx={{
						backgroundColor: 'transparent',
						display: 'grid',
						placeItems: 'center',
						backdropFilter: 'blur(50px)',
					}}
				>
					<Toolbar
						sx={{
							py: 3,
							px: `0px !important`,
							width: consts.width.projects[breakPoint ?? 'xl'],
							...(shouldUseBottonNavigation
								? {
										display: 'flex',
										justifyContent: 'space-between',
								  }
								: {
										display: 'grid',
										gridTemplateColumns: '1fr 1fr 1fr',
								  }),
						}}
					>
						<Box>
							<Link href="/" style={{ textDecoration: 'none' }}>
								<Box
									alt="logo"
									loading="lazy"
									component="img"
									src="/images/icons/icon-72x72.png"
									sx={{
										width: 36,
										display: 'block',
									}}
								/>
							</Link>
						</Box>
						{!shouldUseBottonNavigation ? null : (
							<Box>
								<IconButton onClick={props.setMode}>
									{props.isDarkMode ? (
										<LightModeIcon
											sx={{
												color: 'text.secondary',
											}}
										/>
									) : (
										<DarkModeIcon
											sx={{
												color: 'text.secondary',
											}}
										/>
									)}
								</IconButton>
							</Box>
						)}
						{shouldUseBottonNavigation ? null : (
							<Box>
								<Box
									sx={{
										width: '100%',
										display: 'flex',
										justifyContent: 'space-evenly',
										alignItems: 'center',
									}}
								>
									{ids.map((id) => {
										return (
											<CustomLink
												id={id}
												key={id}
												isActive={
													(route || 'home') === id
												}
												shouldUseIcon={allShouldUseIcon}
											/>
										);
									})}
								</Box>
							</Box>
						)}
						{shouldUseBottonNavigation ? null : (
							<Box>
								<Box
									sx={{
										width: '100%',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'flex-end',
										gridGap: 24,
									}}
								>
									{!allShouldUseIcon ? null : (
										<>
											<EssentialIcons.Projects />
											<EssentialIcons.Contact />
										</>
									)}
									<EssentialIcons.Github />
									<EssentialIcons.LinkedIn />
									<SocialButton href={links.instagram}>
										<IconButton>
											<InstagramIcon
												sx={{
													color: 'text.secondary',
												}}
											/>
										</IconButton>
									</SocialButton>
									<IconButton onClick={props.setMode}>
										{props.isDarkMode ? (
											<LightModeIcon
												sx={{
													color: 'text.secondary',
												}}
											/>
										) : (
											<DarkModeIcon
												sx={{
													color: 'text.secondary',
												}}
											/>
										)}
									</IconButton>
								</Box>
							</Box>
						)}
					</Toolbar>
				</AppBar>
			</Box>
		</Holder>
	);
};

export default Header;
