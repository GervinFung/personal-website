import type { Children } from '../../type/react';
import type { PropsWithChildren } from 'react';

import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import IconButton from '@mui/material/IconButton';
import ExternalLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import React from 'react';

import links from '../../links';

type InternalEssentialIconsProps = Readonly<{
	route: string;
}>;

const ids = ['home', 'projects', 'contact'] as const;

const InternalLinkWithIcon = (
	props: PropsWithChildren &
		Readonly<{
			href: string;
		}>
) => {
	return (
		<Link
			aria-label={`${props.href === '/' ? 'home' : props.href} link`}
			href={props.href}
			style={{
				textDecoration: 'none',
				display: 'flex',
				alignItems: 'center',
			}}
		>
			<Stack
				direction="row"
				sx={{
					display: 'flex',
					alignItems: 'center',
					whiteSpace: 'pre-wrap',
					gap: 2,
				}}
			>
				{props.children}
			</Stack>
		</Link>
	);
};

const SocialButton = (
	props: Readonly<
		Children & {
			href: string;
			'aria-label': string;
		}
	>
) => {
	return (
		<ExternalLink
			aria-label={props['aria-label']}
			href={props.href}
			rel="external nofollow noopener noreferrer"
			sx={{
				display: 'flex',
				alignItems: 'center',
				borderRadius: '50%',
				border: 'none',
				whiteSpace: 'pre-wrap',
				gap: 2,
			}}
			target="_blank"
			underline="none"
		>
			{props.children}
		</ExternalLink>
	);
};

const Projects = (props: InternalEssentialIconsProps) => {
	return (
		<InternalLinkWithIcon href="/projects">
			<IconButton aria-label="projects icon">
				<LightbulbIcon
					sx={{
						color:
							ids[1] === props.route
								? 'text.primary'
								: 'text.secondary',
					}}
				/>
			</IconButton>
		</InternalLinkWithIcon>
	);
};

const Contact = (props: InternalEssentialIconsProps) => {
	return (
		<InternalLinkWithIcon href="/contact">
			<IconButton aria-label="contact icon">
				<EmailIcon
					sx={{
						color:
							ids[2] === props.route
								? 'text.primary'
								: 'text.secondary',
					}}
				/>
			</IconButton>
		</InternalLinkWithIcon>
	);
};

const Github = () => {
	return (
		<SocialButton aria-label="github link" href={links.github}>
			<IconButton aria-label="github icon">
				<GitHubIcon
					sx={{
						color: 'text.secondary',
					}}
				/>
			</IconButton>
		</SocialButton>
	);
};

const LinkedIn = () => {
	return (
		<SocialButton aria-label="linkedin link" href={links.linkedin}>
			<IconButton aria-label="linkedin icon">
				<LinkedInIcon
					sx={{
						color: 'text.secondary',
					}}
				/>
			</IconButton>
		</SocialButton>
	);
};

const Instagram = () => {
	return (
		<SocialButton aria-label="instagram link" href={links.instagram}>
			<IconButton aria-label="instagram icon">
				<InstagramIcon
					sx={{
						color: 'text.secondary',
					}}
				/>
			</IconButton>
		</SocialButton>
	);
};

export { ids, Projects, Contact, Github, LinkedIn, Instagram };
