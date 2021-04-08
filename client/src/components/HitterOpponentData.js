import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { removeLeadingZero } from './Util';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      margin: '20px',
    },
    paper: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: '20px'
    },
    stats: {
      textAlign: 'left',
      fontSize: '18px'
    },
    title: {
      textAlign: 'left',
      fontWeight: 'bold',
      textDecoration: 'underline',
      fontSize: '18px'
    },
    subTitle: {
      textAlign: 'left',
      fontWeight: 'bold',
      fontSize: '18px'
    }
  }));

function HitterOpponentData(props) {

    const classes = useStyles();
    const { opponentData } = props;

    console.log(removeLeadingZero((opponentData.slg || 0.0).toFixed(3)))

    const stats = 'AVG: ' + (opponentData.avg !== 'NaN' ? removeLeadingZero((Number(opponentData.avg) || 0.0).toFixed(3)) : 0) + ' / AB: ' + (opponentData.ab || 0) + ' / Team W: ' + (opponentData.team_win || 0) + ' / Team L: ' + 
    (opponentData.team_loss || 0) + ' / H: ' + (opponentData.h || 0) + ' / 2B: ' + (opponentData.d || 0) + ' / 3B: ' + (opponentData.t || 0) + 
    ' / RBI: ' + (opponentData.rbi || 0) + ' / HR: ' + (opponentData.hr || 0) + ' / OBP: ' + (removeLeadingZero((opponentData.obp || 0.0).toFixed(3))) + 
    ' / OPS: ' + (removeLeadingZero((opponentData.ops || 0.0).toFixed(3))) + '/ SLG: ' + (removeLeadingZero((opponentData.slg || 0.0).toFixed(3)))

    return (
        <div className={classes.root}>
            <Grid container spacing={2} justify="flex-start">
                <Grid item xs={12}>
                    <div className={classes.title}>vs. {opponentData.name}</div>
                </Grid>
            </Grid>
            <Grid container spacing={1} justify="flex-start">
                <Grid item xs={2}>
                    <div className={classes.subTitle}>Hitter Stats:</div>
                </Grid>
                <Grid item spacing={1} xs={10}>
                    <div className={classes.stats}>{stats}</div>
                </Grid>
            </Grid>
        </div>
    )
}

export default HitterOpponentData
