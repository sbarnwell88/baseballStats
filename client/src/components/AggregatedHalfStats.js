import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    stats: {
      // padding: theme.spacing(1),
      textAlign: 'left'
    }
  }));

function AggregatedHalfStats(props) {

    const classes = useStyles();
    const { title, aggregatedMonthlyData, winSum, lossSum, ip2Sum, obaSum, eraSum, hrSum } = props;

    return (
        <Grid container spacing={2} justify="flex-start">
            <Grid item xs={1}>
                <div className={classes.stats}>{title}</div>
            </Grid>
            <Grid item xs={1}>
                <div className={classes.stats}>W: {aggregatedMonthlyData !== null ? winSum : []}</div>
            </Grid>
            <Grid item xs={1}>
                <div className={classes.stats}>L: {aggregatedMonthlyData !== null ? lossSum : []}</div>
            </Grid>
            <Grid item xs={2}>
                <div className={classes.stats}>IP: {aggregatedMonthlyData !== null ? parseFloat((ip2Sum).toFixed(1)) || 0 : []}</div>
            </Grid>
            <Grid item xs={2}>
                <div className={classes.stats}>AVG: {aggregatedMonthlyData !== null ? parseFloat((obaSum/ip2Sum).toFixed(3)) || 0 : []}</div>
            </Grid>
            <Grid item xs={2}>
                <div className={classes.stats}>ERA: {aggregatedMonthlyData !== null ? parseFloat((eraSum/ip2Sum).toFixed(3)) || 0 : []}</div>
            </Grid>
            <Grid item xs={2}>
                <div className={classes.stats}>HR: {aggregatedMonthlyData !== null ? hrSum : []}</div>
            </Grid>
        </Grid>
    )
}

export default AggregatedHalfStats
