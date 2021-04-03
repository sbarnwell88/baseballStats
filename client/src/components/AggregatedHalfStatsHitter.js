import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { removeLeadingZero } from './Util';

const useStyles = makeStyles((theme) => ({
    stats: {
      textAlign: 'left',
      fontSize: '18px'
    },
    title: {
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: '18px'
    }
  }));

function AggregatedHalfStatsHitter(props) {

    const classes = useStyles();
    const { title, aggregatedMonthlyData, avg, hits, doubles, triples, rbi, hr, obp, ab } = props;
    const stats = avg + ' AVG / ' + (hits || 0) + 
    ' H / ' + (doubles || 0) + ' 2B / ' + (triples || 0) + ' 3B / ' + (rbi || 0) + ' RBI / ' + (hr || 0) + ' HR / ' + 'OBP: ' + obp

    return (
        <Grid container spacing={1} justify="flex-start">
            <Grid item xs={1}>
                <div className={classes.title}>{title}:</div>
            </Grid>
            <Grid item xs={8}>
                <div className={classes.stats}>{aggregatedMonthlyData !== null ? stats : []}</div>
            </Grid>
        </Grid>
    )
}

export default AggregatedHalfStatsHitter
