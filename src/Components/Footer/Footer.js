import React from 'react';
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

function Footer() {
    return (
        <div>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="#">
                We are Polymer
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </div>
        
    )
}

export default Footer;
