import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Toaster = (props) =>{
    const [open, setOpen] = useState(true);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };
    const action = (
        <>
        <Button color="secondary" size="small" onClick={handleClose}>
            UNDO
        </Button>
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
        </>
    );

    return(
        <>
            <Snackbar
                bodyStyle={{ backgroundColor: '#3A833A', color: 'coral' }}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message={props.data.message}
                action={action}
            />
        </>
    );
}

export default Toaster;