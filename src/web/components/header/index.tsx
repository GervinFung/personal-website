import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import Holder from '../common/holder';
import useWordScramble from '../../hooks/use-word-scramble';
import useBreakpoint from '../../hooks/use-breakpoint-value';

const ids = ['projects', 'contact'] as const;

type Id = (typeof ids)[number];

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
        content: props.id.toUpperCase(),
    });

    return (
        <Link href={`/${props.id}`} style={{ textDecoration: 'none' }}>
            {props.shouldUseIcon ? (
                <Box>
                    <IconButton>
                        {props.id === 'projects' ? (
                            <LightbulbIcon />
                        ) : (
                            <SendIcon />
                        )}
                    </IconButton>
                </Box>
            ) : (
                <Box
                    onMouseOver={wordScramble.start}
                    onMouseOut={wordScramble.stop}
                    sx={{
                        transition: 'border 0.5s',
                        boxSizing: 'border-box',
                    }}
                >
                    <Typography
                        sx={({ palette }) => ({
                            fontWeight: props.isActive ? 'bold' : undefined,
                            color: !props.isActive
                                ? palette.text.secondary
                                : palette.text.primary,
                            '&:hover': {
                                color: palette.custom.opposite,
                            },
                        })}
                    >
                        {wordScramble.word()}
                    </Typography>
                </Box>
            )}
        </Link>
    );
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
    const shouldUseIcon = breakPoint === 'sm' || breakPoint === 'xs';
    const stackSpacing = shouldUseIcon ? 1 : 4;

    return (
        <Holder
            sx={{
                mb: 8,
                top: 0,
                zIndex: 2,
                position: 'sticky',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 24px !important',
                boxSizing: 'border-box',
                backdropFilter: 'blur(50px)',
            }}
        >
            <Box>
                <Box>
                    <Link href="/" style={{ textDecoration: 'none' }}>
                        <Box
                            alt="logo"
                            loading="lazy"
                            component="img"
                            src="/images/icons/icon-72x72.png"
                            sx={{
                                width: '50%',
                                display: 'block',
                            }}
                        />
                    </Link>
                </Box>
            </Box>
            <Stack
                direction="row"
                spacing={stackSpacing}
                sx={{
                    alignItems: 'center',
                }}
            >
                <Stack direction="row" spacing={stackSpacing}>
                    {ids.map((id) => (
                        <CustomLink
                            id={id}
                            key={id}
                            isActive={route === id}
                            shouldUseIcon={shouldUseIcon}
                        />
                    ))}
                </Stack>
                <Box>
                    <IconButton onClick={props.setMode}>
                        {props.isDarkMode ? (
                            <LightModeIcon />
                        ) : (
                            <DarkModeIcon />
                        )}
                    </IconButton>
                </Box>
            </Stack>
        </Holder>
    );
};

export default Header;
