import { memo } from "react";
import { Link } from "react-router-dom";
import {
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
} from "@mui/material";
import { InsertDriveFile, Delete, OpenInNew } from "@mui/icons-material";
import toLocaleString from "@/utils/dates/toLocaleString";
import propTypes from "./DocumentListItem.props";

/** Renders a chat document in a list of documents */
const DocumentListItem = ({ documentItem }) => {
    const actionButtons = (
        <>
            <IconButton
                component={Link}
                to={documentItem.url}
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
            >
                <OpenInNew />
            </IconButton>
            <IconButton color="error">
                <Delete />
            </IconButton>
        </>
    );
    
    return (
        <ListItem secondaryAction={actionButtons} divider>
            <ListItemIcon>
                <InsertDriveFile />
            </ListItemIcon>
            <ListItemText
                primary={documentItem.name}
                secondary={toLocaleString(documentItem.createdAt)}
            />
        </ListItem>
    );
};

DocumentListItem.propTypes = propTypes;

const memoizedComponent = memo(
    DocumentListItem,
    (prevProps, newProps) =>
        prevProps.documentItem._id === newProps.documentItem._id &&
        prevProps.documentItem.name === newProps.documentItem.name &&
        prevProps.documentItem.url === newProps.documentItem.url
);
export default memoizedComponent;
