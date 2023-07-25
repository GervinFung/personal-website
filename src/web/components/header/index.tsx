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

const ids = ['home', 'projects', 'contact'] as const;

type Id = (typeof ids)[number];

const SocialButton = (
    props: Readonly<{
        href: string;
        children: React.ReactNode;
    }>
) => (
    <MuiLink.default
        href={props.href}
        target="_blank"
        rel="noopener"
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
                        sx={({ palette }) => ({
                            fontWeight: props.isActive ? 'bolder' : undefined,
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

const EssentialIcons = {
    Projects: () => (
        <Link
            href="/projects"
            style={{
                textDecoration: 'none',
            }}
        >
            <IconButton sx={{ p: 0, m: 0 }}>
                <LightbulbIcon
                    sx={{
                        color: 'text.secondary',
                    }}
                />
            </IconButton>
        </Link>
    ),
    Contact: () => (
        <Link
            href="/contact"
            style={{
                textDecoration: 'none',

                color: 'text.secondary',
            }}
        >
            <IconButton sx={{ p: 0, m: 0 }}>
                <EmailIcon
                    sx={{
                        color: 'text.secondary',
                    }}
                />
            </IconButton>
        </Link>
    ),
    Github: () => (
        <SocialButton href={links.github}>
            <GitHubIcon
                sx={{
                    color: 'text.secondary',
                }}
            />
        </SocialButton>
    ),
    LinkedIn: () => (
        <SocialButton href={links.linkedin}>
            <LinkedInIcon
                sx={{
                    color: 'text.secondary',
                }}
            />
        </SocialButton>
    ),
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
    const allShouldUseIcon = breakPoint === 'sm';
    const shouldUseBottonNavigation = breakPoint === 'xs';

    return (
        <Holder
            sx={{
                mb: shouldUseBottonNavigation ? 0 : 8,
                width: '100%',
                padding: '16px 24px !important',
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
                        sx={{
                            width: '100%',
                            backgroundColor: 'transparent',
                            backdropFilter: 'blur(50px)',
                        }}
                    >
                        <BottomNavigationAction
                            label="Projects"
                            icon={<EssentialIcons.Projects />}
                        />
                        <BottomNavigationAction
                            label="Contact"
                            icon={<EssentialIcons.Contact />}
                        />
                        <BottomNavigationAction
                            label="Github"
                            icon={<EssentialIcons.Github />}
                        />
                        <BottomNavigationAction
                            label="LinkedIn"
                            icon={<EssentialIcons.LinkedIn />}
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
                    }}
                >
                    <Toolbar
                        sx={{
                            width: '100%',
                            backdropFilter: 'blur(50px)',
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
                                <IconButton
                                    onClick={props.setMode}
                                    sx={{ p: 0 }}
                                >
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
                                    {ids.map((id) => (
                                        <CustomLink
                                            id={id}
                                            key={id}
                                            isActive={(route || 'home') === id}
                                            shouldUseIcon={allShouldUseIcon}
                                        />
                                    ))}
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
                                        <InstagramIcon
                                            sx={{
                                                color: 'text.secondary',
                                            }}
                                        />
                                    </SocialButton>

                                    <IconButton
                                        onClick={props.setMode}
                                        sx={{ p: 0 }}
                                    >
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
