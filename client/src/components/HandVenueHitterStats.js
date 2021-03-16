import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { removeLeadingZero } from './Util';

const useStyles = makeStyles((theme) => ({
    stats: {
      textAlign: 'left'
    },
    title: {
        textAlign: 'left',
        fontWeight: 'bold'
    }
}));

function HandVenueHitterStats(props) {

    const classes = useStyles();
    const { title, avg, hits, doubles, triples, rbi, hr } = props;
    
    const stats = (removeLeadingZero((avg || 0.0).toFixed(3))) + ' AVG / ' + (hits || 0) + ' H / ' + (doubles || 0) + ' 2B / ' + 
        (triples || 0) + ' 3B / ' + (rbi || 0) + ' RBI / ' + (hr || 0) + ' HR'

    return (
        <Grid container spacing={1} justify="flex-start">
            <Grid item xs={1}>
                <div className={classes.title}>{title}:</div>
            </Grid>
            <Grid item xs={8}>
                <div className={classes.stats}>{stats}</div>
            </Grid>
        </Grid>
    )
}

export default HandVenueHitterStats
