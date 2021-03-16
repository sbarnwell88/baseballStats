import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { removeLeadingZero } from './Util';

const useStyles = makeStyles((theme) => ({
    stats: {
      // padding: theme.spacing(1),
      textAlign: 'left'
    },
    subTitle: {
        textAlign: 'left',
        fontWeight: 'bold',
      }
  }));

function AggregatedHalfStats(props) {

    const classes = useStyles();
    const { title, aggregatedMonthlyData, winSum, lossSum, ip2Sum, obaSum, eraSum, hrSum } = props;
    const inningsPitchedDecimal = ip2Sum % 1;
    const inningsPitched = inningsPitchedDecimal > .2 ? Math.ceil(ip2Sum) : ip2Sum

    return (
        <Grid container spacing={2} justify="flex-start">
            <Grid item xs={1}>
                <div className={classes.subTitle}>{title}</div>
            </Grid>
            <Grid item xs={1}>
                <div className={classes.stats}>W: {aggregatedMonthlyData !== null ? winSum || 0 : []}</div>
            </Grid>
            <Grid item xs={1}>
                <div className={classes.stats}>L: {aggregatedMonthlyData !== null ? lossSum || 0 : []}</div>
            </Grid>
            <Grid item xs={2}>
                <div className={classes.stats}>IP: {aggregatedMonthlyData !== null ? (inningsPitched || 0.0).toFixed(1) : []}</div>
            </Grid>
            <Grid item xs={2}>
                <div className={classes.stats}>AVG: {aggregatedMonthlyData !== null ? removeLeadingZero(((obaSum/ip2Sum) || 0.0).toFixed(3)) : []}</div>
            </Grid>
            <Grid item xs={2}>
                {console.log(((eraSum/ip2Sum) || 0.0).toFixed(3))}
                <div className={classes.stats}>ERA: {aggregatedMonthlyData !== null ? removeLeadingZero(((eraSum/ip2Sum) || 0.0).toFixed(3)) : []}</div>
            </Grid>
            <Grid item xs={2}>
                <div className={classes.stats}>HR: {aggregatedMonthlyData !== null ? hrSum || 0 : []}</div>
            </Grid>
        </Grid>
    )
}

export default AggregatedHalfStats
