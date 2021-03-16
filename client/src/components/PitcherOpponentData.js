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
      textAlign: 'left'
    },
    title: {
      textAlign: 'left',
      fontWeight: 'bold',
      textDecoration: 'underline'
    },
    subTitle: {
      textAlign: 'left',
      fontWeight: 'bold',
    }
  }));

function PitcherOpponentData(props) {

    const classes = useStyles();
    const { opponentData } = props;

    const stats = 'W: ' + (opponentData.win || 0) + ' / L: ' + (opponentData.loss || 0) + ' / Team W: ' + (opponentData.team_win || 0) + ' / Team L: ' + 
    (opponentData.team_loss || 0) + ' / Starts: ' + (opponentData.start || 0) + ' / ER: ' + (opponentData.er || 0) + ' / K: ' + (opponentData.ktotal || 0) + 
    ' / BB: ' + (opponentData.bb || 0) + ' / HR: ' + (opponentData.hr || 0) + ' / OBA: ' + (removeLeadingZero((opponentData.oba || 0.0).toFixed(3))) + 
    ' / ERA: ' + (removeLeadingZero((Number(opponentData.era) || 0.0).toFixed(3))) + '/ IP: ' + (opponentData.ip_2.toFixed(1) || 0) + '/ SAVE: ' + (opponentData.save || 0)

    return (
        <div className={classes.root}>
            <Grid container spacing={2} justify="flex-start">
                <Grid item xs={12}>
                    <div className={classes.title}>vs. {opponentData.name}</div>
                </Grid>
            </Grid>
            <Grid container spacing={1} justify="flex-start">
                <Grid item xs={2}>
                    <div className={classes.subTitle}>Pitcher Stats:</div>
                </Grid>
                <Grid item spacing={1} xs={10}>
                    <div className={classes.stats}>{stats}</div>
                </Grid>
            </Grid>
        </div>
    )
}

export default PitcherOpponentData
