import React from 'react';
import Box from '@mui/material/Box';

const BlurryClusterHoverEffect = (
    props: Readonly<{
        children: React.ReactNode;
    }>
) => {
    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
            }}
        >
            {props.children}
        </Box>
    );
};

export { BlurryClusterHoverEffect };
