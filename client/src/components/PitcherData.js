import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import AggregatedHalfStats from './AggregatedHalfStats'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: '30px',
  },
  paper: {
    // padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  stats: {
    // padding: theme.spacing(1),
    textAlign: 'left'
  }
}));

function PitcherData(props) {
    
    const classes = useStyles();
    const { pitcherData } = props;

    let firstHalfWinSum = 0;
    let firstHalfLossSum = 0;
    let firstHalfIp2Sum = 0;
    let firstHalfEraSum = 0;
    let firstHalfObaSum = 0;
    let firstHalfHitSum = 0;
    let firstHalfBattersFacedSum = 0;
    let firstHalfHR = 0;
    let secondHalfWinSum = 0;
    let secondHalfLossSum = 0;
    let secondHalfIp2Sum = 0;
    let secondHalfEraSum = 0;
    let secondHalfObaSum = 0;
    let secondHalfHitSum = 0;
    let secondHalfBattersFacedSum = 0;
    let secondHalfHR = 0;
    pitcherData.months.forEach((month) => {
        if (month.value === '4' || month.value === '5' || month.value === '6') {
            console.log("here")
            firstHalfWinSum = firstHalfWinSum + month.win;
            firstHalfLossSum = firstHalfLossSum + month.loss
            firstHalfIp2Sum = firstHalfIp2Sum + month.ip_2
            firstHalfEraSum = firstHalfEraSum + (month.era * month.ip_2)
            firstHalfObaSum = firstHalfObaSum + (month.oba * month.ip_2)
            firstHalfHitSum = firstHalfHitSum + month.h
            firstHalfBattersFacedSum = firstHalfBattersFacedSum + month.bf
            firstHalfHR = firstHalfHR + month.hr
        } else if (month.value === '7' || month.value === '8' || month.value === '9') {
            secondHalfWinSum = secondHalfWinSum + month.win
            secondHalfLossSum = secondHalfLossSum + month.loss
            secondHalfIp2Sum = secondHalfIp2Sum + month.ip_2
            secondHalfEraSum = secondHalfEraSum + (month.era * month.ip_2)
            secondHalfObaSum = secondHalfObaSum + (month.oba * month.ip_2)
            secondHalfHitSum = secondHalfHitSum + month.h
            secondHalfBattersFacedSum = secondHalfBattersFacedSum + month.bf
            secondHalfHR = secondHalfHR + month.hr
        }
    })

    return (
        <div>
            <Divider style={{ marginTop: '20px' }} />
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <div className={classes.paper}>{pitcherData.name}</div>
                    </Grid>
                </Grid>
                <Grid container spacing={2} justify="flex-start">
                    <Grid item xs={12}>
                        <div className={classes.stats}>Pitch Types</div>
                    </Grid>
                </Grid>
                {pitcherData.pitchTypes !== null ? pitcherData.pitchTypes.map((pitch, i) => {
                    return (
                        <Grid container spacing={1} justify="flex-start">
                            <Grid item xs={1}>
                                <div className={classes.stats}>{pitch.type}:</div>
                            </Grid>
                            <Grid item xs={2}>
                                <div className={classes.stats}>Avg Vel: {pitch.avg_speed.toFixed(1)}</div>
                            </Grid>
                            <Grid item xs={2}>
                                <div className={classes.stats}>Prob: {parseFloat((pitch.count/pitcherData.pitchCount*100).toFixed(2)) || 0}%</div>
                            </Grid>
                            <Grid item xs={2}>
                                <div className={classes.stats}>HR: {pitch.onbase.hr}</div>
                            </Grid>
                            <Grid item xs={2}>
                                <div className={classes.stats}>AVG: {parseFloat((pitch.onbase.h/(pitch.in_play.linedrive + pitch.in_play.groundball + pitch.in_play.popup + pitch.in_play.flyball)).toFixed(3)) || 0}</div>
                            </Grid>
                        </Grid>
                    )
                }): []}
                <br/>
                {pitcherData.homeAway !== null ? pitcherData.homeAway.map((item, i) => {
                    return (
                        <Grid container spacing={1} justify="flex-start">
                            <Grid item xs={1}>
                                <div className={classes.stats}>{item.value}:</div>
                            </Grid>
                            <Grid item xs={1}>
                                <div className={classes.stats}>W: {item.win}</div>
                            </Grid>
                            <Grid item xs={1}>
                                <div className={classes.stats}>L: {item.loss}</div>
                            </Grid>
                            <Grid item xs={2}>
                                <div className={classes.stats}>ERA: {item.era}</div>
                            </Grid>
                            <Grid item xs={2}>
                                <div className={classes.stats}>AVG: {parseFloat(item.oba).toFixed(3)}</div>
                            </Grid>
                            <Grid item xs={1}>
                                <div className={classes.stats}>HR: {item.hr}</div>
                            </Grid>
                        </Grid>
                    )
                }): []}
                <br/>
                {pitcherData.hitterHand !== null ? pitcherData.hitterHand.map((hand, i) => {
                    return (
                        <Grid container spacing={1} justify="flex-start">
                            <Grid item xs={1}>
                                <div className={classes.stats}>{hand.value}HB:</div>
                            </Grid>
                            <Grid item xs={2}>
                                <div className={classes.stats}>AVG: {hand.oba}</div>
                            </Grid>
                            <Grid item xs={2}>
                                <div className={classes.stats}>HR: {hand.hr}</div>
                            </Grid>
                        </Grid>
                        )
                    }): []}
                <br/>
                <Grid container spacing={2} justify="flex-start">
                    <Grid item xs={1}>
                        <div className={classes.stats}>Overall</div>
                    </Grid>
                    <Grid item xs={1}>
                        <div className={classes.stats}>W: {pitcherData.overallStats.games !== null ? pitcherData.overallStats.games.win : []}</div>
                    </Grid>
                    <Grid item xs={1}>
                        <div className={classes.stats}>L: {pitcherData.overallStats.games !== null ? pitcherData.overallStats.games.loss : []}</div>
                    </Grid>
                    <Grid item xs={2}>
                        <div className={classes.stats}>IP: {pitcherData.overallStats !== null ? pitcherData.overallStats.ip_2 : []}</div>
                    </Grid>
                    <Grid item xs={2}>
                        <div className={classes.stats}>AVG: {pitcherData.overallStats !== null ? pitcherData.overallStats.oba : []}</div>
                    </Grid>
                    <Grid item xs={2}>
                        <div className={classes.stats}>ERA: {pitcherData.overallStats !== null ? pitcherData.overallStats.era : []}</div>
                    </Grid>
                    <Grid item xs={2}>
                        <div className={classes.stats}>HR: {pitcherData.overallStats.onbase !== null ? pitcherData.overallStats.onbase.hr : []}</div>
                    </Grid>
                </Grid>
                <AggregatedHalfStats 
                    title='1H' 
                    aggregatedMonthlyData={pitcherData.months} 
                    winSum={firstHalfWinSum} 
                    lossSum={firstHalfLossSum}
                    ip2Sum={firstHalfIp2Sum}
                    obaSum={firstHalfObaSum}
                    eraSum={firstHalfEraSum}
                    hrSum={firstHalfHR}
                />
                <AggregatedHalfStats 
                    title='2H' 
                    aggregatedMonthlyData={pitcherData.months} 
                    winSum={secondHalfWinSum} 
                    lossSum={secondHalfLossSum}
                    ip2Sum={secondHalfIp2Sum}
                    obaSum={secondHalfObaSum}
                    eraSum={secondHalfEraSum}
                    hrSum={secondHalfHR}
                />
                {pitcherData.months !== null ? pitcherData.months.map((month) => {
                    return ( month.value === '9' ?
                        <Grid container spacing={1} justify="flex-start">
                            <Grid item xs={1}>
                                <div className={classes.stats}>September:</div>
                            </Grid>
                            <Grid item xs={1}>
                                <div className={classes.stats}>W: {month.win}</div>
                            </Grid>
                            <Grid item xs={1}>
                                <div className={classes.stats}>L: {month.loss}</div>
                            </Grid>
                            <Grid item xs={2}>
                                <div className={classes.stats}>IP: {month.ip_2}</div>
                            </Grid>
                            <Grid item xs={2}>
                                <div className={classes.stats}>AVG: {month.oba}</div>
                            </Grid>
                            <Grid item xs={2}>
                                <div className={classes.stats}>ERA: {month.era}</div>
                            </Grid>
                            <Grid item xs={2}>
                                <div className={classes.stats}>HR: {month.hr}</div>
                            </Grid>
                        </Grid>
                    : <div/>)
                }): []}
                {pitcherData.lastStarts !== null ? pitcherData.lastStarts.map((item, index) => {
                    return (
                        <Grid container spacing={1} justify="flex-start">
                            <Grid item xs={1}>
                                <div className={classes.stats}>L3:</div>
                            </Grid>
                            <Grid item xs={1}>
                                <div className={classes.stats}>W: {item.win}</div>
                            </Grid>
                            <Grid item xs={1}>
                                <div className={classes.stats}>L: {item.loss}</div>
                            </Grid>
                            <Grid item xs={2}>
                                <div className={classes.stats}>IP: {item.ip_2}</div>
                            </Grid>
                            <Grid item xs={2}>
                                <div className={classes.stats}>AVG: {item.oba}</div>
                            </Grid>
                            <Grid item xs={2}>
                                <div className={classes.stats}>ERA: {item.era}</div>
                            </Grid>
                            <Grid item xs={2}>
                                <div className={classes.stats}>HR: {item.hr}</div>
                            </Grid>
                        </Grid>
                    )
                }): []}
            </div>
        </div>
    )
}

export default PitcherData
