import { colorTheme } from '../theme';

type Common = {
    custom: typeof colorTheme;
    background: Theme['background'];
};

declare module '@mui/material/styles' {
    interface Theme extends Common {}

    interface Palette extends Common {}

    interface PaletteOptions extends Common {}

    interface BreakpointOverrides {
        xm: true;
    }
}
