import React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Holder from '../common/holder';
import { projects } from '../../data';
import consts from '../../const';
import useBreakpoint from '../../hooks/use-breakpoint-value';

const Item = (project: (typeof projects)[0]['projects'][0]) => (
    <Card
        variant="outlined"
        sx={{
            borderTopRightRadius: 'none',
            borderTopLeftRadius: 'none',
            backgroundColor: 'transparent',
        }}
    >
        <CardActionArea
            sx={{
                '&:hover > a > div > div > div > h6': {
                    color: 'text.primary',
                },
                '&:hover > a > div > div > div > p': {
                    color: 'text.secondary',
                },
            }}
        >
            <Link
                key={project.name}
                href={project.githubLink}
                target="_blank"
                rel="noopener"
                underline="none"
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gridGap: 8,
                    }}
                >
                    <Box>
                        <Box
                            key={project.name}
                            alt={project.name}
                            loading="lazy"
                            component="img"
                            src={`/images/projects/${
                                project.imagePath ?? 'utari/background'
                            }.png`}
                            sx={{
                                width: '100%',
                                display: 'block',
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            p: 2,
                        }}
                    >
                        <Box>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: 'text.secondary',
                                    fontWeight: 500,
                                }}
                            >
                                {project.name}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                sx={{
                                    color: 'text.disabled',
                                    fontSize: '0.9em',
                                    boxSizing: 'border-box',
                                    wordBreak: 'break-word',
                                }}
                            >
                                {project.description}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Link>
        </CardActionArea>
    </Card>
);

const Projects = () => {
    const breakPoint = useBreakpoint();

    return (
        <Holder>
            <Stack
                spacing={8}
                sx={{
                    width: consts.width.projects[breakPoint ?? 'xl'],
                }}
            >
                {projects.map((subProjects) => (
                    <Box key={subProjects.category}>
                        <Box
                            key={subProjects.category}
                            sx={{
                                display: 'grid',
                                gridGap: 48,
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'grid',
                                    placeItems: 'center',
                                }}
                            >
                                <Typography
                                    variant="h3"
                                    sx={{ fontWeight: 700 }}
                                >
                                    {subProjects.category}
                                </Typography>
                            </Box>
                            <Box>
                                <Grid
                                    container
                                    spacing={4}
                                    sx={{
                                        autoRows: '1fr',
                                    }}
                                >
                                    {subProjects.projects.map((project) => (
                                        <Grid
                                            item
                                            key={project.name}
                                            xs={12}
                                            sm={6}
                                        >
                                            <Item {...project} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Stack>
        </Holder>
    );
};

export default Projects;
