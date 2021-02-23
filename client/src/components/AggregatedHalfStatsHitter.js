import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    stats: {
      // padding: theme.spacing(1),
      textAlign: 'left'
    }
  }));

function AggregatedHalfStatsHitter(props) {

    const classes = useStyles();
    const { title, aggregatedMonthlyData, avg, hits, doubles, triples, rbi, hr, obp, ab } = props;
    const stats = (parseFloat((avg/ab).toFixed(3)) || 0) + ' AVG / ' + hits + 
    ' H / ' + doubles + '2B / ' + triples + ' 3B / ' + rbi + ' RBI / ' + hr + ' HR / ' + 'OBP: ' + obp

    return (
        <Grid container spacing={1} justify="flex-start">
            <Grid item xs={1}>
                <div className={classes.stats}>{title}:</div>
            </Grid>
            <Grid item xs={8}>
                <div className={classes.stats}>{aggregatedMonthlyData !== null ? stats : []}</div>
            </Grid>
        </Grid>
    )
}

export default AggregatedHalfStatsHitter
