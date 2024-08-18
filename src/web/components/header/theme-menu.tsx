import type { Children } from '../../type/react';
import type { Mode } from '@poolofdeath20/util';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import DevicesIcon from '@mui/icons-material/Devices';
import LightModeIcon from '@mui/icons-material/LightMode';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { isTruthy, getPreferredMode } from '@poolofdeath20/util';
import React from 'react';

import { ThemeContext } from '../../context/theme';

const useAnchorElement = () => {
	const [get, set] = React.useState(undefined as undefined | HTMLElement);

	const clear = () => {
		set(undefined);
	};

	return [get, set, clear] as const;
};

const Item = (
	props: Children &
		Readonly<{
			onClick?: () => void;
		}>
) => {
	return (
		<MenuItem
			onClick={props.onClick}
			sx={{
				whiteSpace: 'pre-wrap',
				gap: 2,
			}}
		>
			{props.children}
		</MenuItem>
	);
};

	const LightIcon = () => {
		return (
			<LightModeIcon
				aria-label="light mode icon"
				sx={{
					color: 'text.secondary',
				}}
			/>
		);
	};

	const DarkIcon = () => {
		return (
			<DarkModeIcon
				aria-label="dark mode icon"
				sx={{
					color: 'text.secondary',
				}}
			/>
		);
	};


const ThemeMenu = () => {
	const [get, set, clear] = useAnchorElement();

	const themeContext = React.useContext(ThemeContext);

	const onChooseTheme = (mode: Mode) => {
		return () => {
			themeContext.setMode(mode);
			clear();
		};
	};

	return (
		<React.Fragment>
			<IconButton
				aria-label="theme icon"
				onClick={(event) => {
					set(event.currentTarget);
				}}
			>
				{themeContext.mode === 'dark' ? <DarkIcon /> : <LightIcon />}
			</IconButton>
			<Menu
				open={isTruthy(get)}
				onClose={clear}
				anchorEl={get}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				sx={({ palette }) => {
					const value = palette.mode === 'dark' ? 0.1 : 0.2;

					return {
						'& .MuiPaper-root': {
							background: palette.custom.default,
							boxShadow: 'none',
							border: `1px solid ${alpha(palette.custom.opposite, value)}`,
						},
					};
				}}
			>
				<Item onClick={onChooseTheme('light')}>
					<LightIcon />
					<Typography>Light</Typography>
				</Item>
				<Item onClick={onChooseTheme('dark')}>
					<DarkIcon />
					<Typography>Dark</Typography>
				</Item>
				<Item onClick={onChooseTheme(getPreferredMode())}>
					<DevicesIcon
						aria-label="system mode icon"
						sx={{
							color: 'text.secondary',
						}}
					/>
					<Typography>System</Typography>
				</Item>
			</Menu>
		</React.Fragment>
	);
};

export default ThemeMenu;
