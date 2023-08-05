import useMediaQuery from '@mui/material/useMediaQuery';
import { type Breakpoint, useTheme } from '@mui/material/styles';

const useBreakpoint = () => {
	const theme = useTheme();

	const matches = {
		xs: useMediaQuery(theme.breakpoints.up('xs')),
		sm: useMediaQuery(theme.breakpoints.up('sm')),
		xm: useMediaQuery(theme.breakpoints.up('xm')),
		md: useMediaQuery(theme.breakpoints.up('md')),
		lg: useMediaQuery(theme.breakpoints.up('lg')),
		xl: useMediaQuery(theme.breakpoints.up('xl')),
	};

	const validBreakpoints = Object.entries(matches)
		.filter(([_, isMatch]) => isMatch)
		.map(([key]) => key as Breakpoint);

	return validBreakpoints.at(-1);
};

export default useBreakpoint;
