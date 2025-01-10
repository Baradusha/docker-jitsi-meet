import React from 'react';
import { makeStyles } from 'tss-react/mui';

import { DISPLAY_NAME_VERTICAL_PADDING } from './styles';

const useStyles = makeStyles()(() => {

    return {
        badge: {
            maxWidth: "90%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontSize: "20px",
            fontWeight: "normal",
            color: "#262842",
        }
    };
});

/**
 * Component that displays a name badge.
 *
 * @param {Props} props - The props of the component.
 * @returns {ReactElement}
 */
const DisplayNameBadge: React.FC<{ name: string; }> = ({ name }) => {
    const { classes } = useStyles();

    return (
        <div className = { classes.badge }>
            { name }
        </div>
    );
};

export default DisplayNameBadge;
