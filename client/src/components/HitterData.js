import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import HandVenueHitterStats from './HandVenueHitterStats'
import AggregatedHalfStatsHitter from './AggregatedHalfStatsHitter'
import { removeLeadingZero } from './Util';
import HitterOpponentData from './HitterOpponentData';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      margin: '20px',
    },
    paper: {
      // padding: theme.spacing(1),
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '20px'
    // color: theme.palette.text.secondary,
    },
    stats: {
    //   padding: theme.spacing(1),
      textAlign: 'left'
    },
    title: {
        textAlign: 'left',
        fontWeight: 'bold',
        textDecoration: 'underline'
    }
}));

function HitterData(props) {

    const classes = useStyles();
    const { hitterData } = props;

    let firstHalfHitsSum = 0;
    let firstHalfHRSum = 0;
    let firstHalfABSum = 0;
    let firstHalfDoublesSum = 0;
    let firstHalfAvg = 0;
    let firstHalfRbi = 0
    let firstHalfTriples = 0;
    let firstHalfObp = 0;
    let secondHalfHitsSum = 0;
    let secondHalfHRSum = 0;
    let secondHalfABSum = 0;
    let secondHalfDoublesSum = 0;
    let secondHalfAvg = 0;
    let secondHalfRbi = 0;
    let secondHalfTriple = 0;
    let secondHalfObp = 0;
    hitterData.months.forEach((month) => {
        if (month.value === '4' || month.value === '5' || month.value === '6') {
            firstHalfHitsSum = firstHalfHitsSum + month.h;
            firstHalfHRSum = firstHalfHRSum + month.hr
            firstHalfABSum = firstHalfABSum + month.ab
            firstHalfDoublesSum = firstHalfDoublesSum + month.d
            firstHalfAvg = firstHalfAvg + (month.avg * month.ab)
            firstHalfRbi = firstHalfRbi + month.rbi
            firstHalfTriples = firstHalfTriples + month.t
            firstHalfObp = firstHalfObp + (month.obp * month.ab)
        } else if (month.value === '7' || month.value === '8' || month.value === '9') {
            secondHalfHitsSum = secondHalfHitsSum + month.h
            secondHalfHRSum = secondHalfHRSum + month.hr
            secondHalfABSum = secondHalfABSum + month.ab
            secondHalfDoublesSum = secondHalfDoublesSum + month.d
            secondHalfAvg = secondHalfAvg + (month.avg * month.ab)
            secondHalfRbi = secondHalfRbi + month.rbi
            secondHalfTriple = secondHalfTriple + month.t
            secondHalfObp = secondHalfObp + (month.obp * month.ab)
        }
    })

    return (
        <div>
            <Divider style={{ marginTop: '20px' }} />
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <div className={classes.paper}>{hitterData.name}</div>
                    </Grid>
                </Grid>
                {hitterData.pitcher_hand !== null ? hitterData.pitcher_hand.map((hitter, i) => {
                    return (
                        <HandVenueHitterStats 
                        title={hitter.value + "HP"}
                        avg={hitter.avg}
                        hits={hitter.h}
                        doubles={hitter.d}
                        triples={hitter.t}
                        rbi={hitter.rbi}
                        hr={hitter.hr}
                        />
                    )
                }): []}
                <br/>
                {hitterData.homeAway !== null ? hitterData.homeAway.map((hitter, i) => {
                    return (
                        <HandVenueHitterStats 
                        title={hitter.value}
                        avg={hitter.avg}
                        hits={hitter.h}
                        doubles={hitter.d}
                        triples={hitter.t}
                        rbi={hitter.rbi}
                        hr={hitter.hr}
                        />
                    )
                }): []}
                <br/>
                <AggregatedHalfStatsHitter 
                    title='1H' 
                    aggregatedMonthlyData={hitterData.months} 
                    avg={removeLeadingZero((parseFloat(firstHalfAvg/firstHalfABSum) || 0.0).toFixed(3))} 
                    hits={firstHalfHitsSum}
                    doubles={firstHalfDoublesSum}
                    triples={firstHalfTriples}
                    rbi={firstHalfRbi}
                    hr={firstHalfHRSum}
                    ab={firstHalfABSum}
                    obp={removeLeadingZero(((firstHalfObp/firstHalfABSum) || 0.0).toFixed(3))}
                />
                <AggregatedHalfStatsHitter 
                    title='2H' 
                    aggregatedMonthlyData={hitterData.months} 
                    avg={removeLeadingZero((parseFloat(secondHalfAvg/secondHalfABSum) || 0.0).toFixed(3))} 
                    hits={secondHalfHitsSum}
                    doubles={secondHalfDoublesSum}
                    triples={secondHalfTriple}
                    rbi={secondHalfRbi}
                    hr={secondHalfHRSum}
                    ab={secondHalfABSum}
                    obp={removeLeadingZero(((secondHalfObp/secondHalfABSum) || 0.0).toFixed(3))}
                />
                {hitterData.months !== null ? hitterData.months.map((month, i) => {
                    if (month.value === '9') {
                        return (
                            <AggregatedHalfStatsHitter 
                                title='Sept' 
                                aggregatedMonthlyData={hitterData.months} 
                                avg={removeLeadingZero((parseFloat(month.avg) || 0.0).toFixed(3))} 
                                hits={month.h}
                                doubles={month.d}
                                triples={month.t}
                                rbi={month.rbi}
                                hr={month.hr}
                                ab={month.ab}
                                obp={removeLeadingZero((month.obp || 0.0).toFixed(3))}
                            />
                        )
                    }
                }): []}
                <br/>
                <Grid container spacing={1} justify="flex-start">
                    <Grid item xs={12}>
                        <div className={classes.title}>Overall</div>
                    </Grid>
                    <Grid item xs={1}>
                        <div className={classes.stats}>AB: {hitterData.atBats !== null ? hitterData.atBats || 0 : []}</div>
                    </Grid>
                    <Grid item xs={1}>
                        <div className={classes.stats}>H: {hitterData.hits !== null ? hitterData.hits || 0 : []}</div>
                    </Grid>
                    <Grid item xs={1}>
                        <div className={classes.stats}>2B: {hitterData.doubles !== null ? hitterData.doubles || 0 : []}</div>
                    </Grid>
                    <Grid item xs={1}>
                        <div className={classes.stats}>3B: {hitterData.triples !== null ? hitterData.triples || 0 : []}</div>
                    </Grid>
                    <Grid item xs={1}>
                        <div className={classes.stats}>HR: {hitterData.hr !== null ? hitterData.hr || 0 : []}</div>
                    </Grid>
                    <Grid item xs={1}>
                        <div className={classes.stats}>XB H: {hitterData.extraBaseHit !== null ? hitterData.extraBaseHit || 0 : []}</div>
                    </Grid>
                    <Grid item xs={2}>
                        <div className={classes.stats}>AVG: {hitterData.avg !== null ? removeLeadingZero((hitterData.avg || 0.0).toFixed(3)) : []}</div>
                    </Grid>
                    <Grid item xs={2}>
                        <div className={classes.stats}>OBP: {hitterData.onBasePercentage !== null ? removeLeadingZero((hitterData.onBasePercentage || 0.0).toFixed(3)) : []}</div>
                    </Grid>
                    <Grid item xs={2}>
                        <div className={classes.stats}>SLG: {hitterData.sluggingPercentage !== null ? removeLeadingZero((hitterData.sluggingPercentage || 0.0).toFixed(3)) : []}</div>
                    </Grid>
                    <Grid item xs={2}>
                        <div className={classes.stats}>I-PWR: {hitterData.isolatedPower !== null ? removeLeadingZero((hitterData.isolatedPower || 0.0).toFixed(3)) : []}</div>
                    </Grid>
                </Grid>
                <br/>
                <Grid container spacing={1} justify="flex-start">
                    <Grid item xs={2}>
                        <div className={classes.stats}>RBI: {hitterData.rbi !== null ? hitterData.rbi || 0 : []}</div>
                    </Grid>
                    <Grid item xs={2}>
                        <div className={classes.stats}>RBI w/2O: {hitterData.rbi2Out !== null ? hitterData.rbi2Out || 0 : []}</div>
                    </Grid>
                    <Grid item xs={2}>
                        <div className={classes.stats}>LOB: {hitterData.leftOnBase !== null ? hitterData.leftOnBase || 0 : []}</div>
                    </Grid>
                </Grid>
                <Grid container spacing={1} justify="flex-start">
                    <Grid item xs={2}>
                        <div className={classes.stats}>RISP: {hitterData.risp !== null ? removeLeadingZero((hitterData.risp || 0.0).toFixed(3)) : []}</div>
                    </Grid>
                    <Grid item xs={2}>
                        <div className={classes.stats}>H w/RISP: {hitterData.hitsWithRisp !== null ? hitterData.hitsWithRisp || 0 : []}</div>
                    </Grid>
                    <Grid item xs={3}>
                        <div className={classes.stats}>LOB w/RISP and 2 outs: {hitterData.lobRisp2Out !== null ? hitterData.lobRisp2Out || 0 : []}</div>
                    </Grid>
                </Grid>
                <br/>
                <Grid container spacing={1} justify="flex-start">
                    <Grid item xs={2}>
                        <div className={classes.stats}>Fly Ball: {hitterData.flyBalls !== null ? hitterData.flyBalls || 0 : []}</div>
                    </Grid>
                    <Grid item xs={2}>
                        <div className={classes.stats}>Fly Out: {hitterData.flyOuts !== null ? hitterData.flyOuts || 0 : []}</div>
                    </Grid>
                    <Grid item xs={2}>
                        <div className={classes.stats}>FODP: {hitterData.flyOutsIntoDoublePlays !== null ? hitterData.flyOutsIntoDoublePlays || 0 : []}</div>
                    </Grid>
                    <Grid item xs={2}>
                        <div className={classes.stats}>Pop Out: {hitterData.popOuts !== null ? hitterData.popOuts || 0 : []}</div>
                    </Grid>
                    <Grid item xs={2}>
                        <div className={classes.stats}>Pop Up: {hitterData.popUps !== null ? hitterData.popUps || 0 : []}</div>
                    </Grid>
                </Grid>
                <Grid container spacing={1} justify="flex-start">
                    <Grid item xs={2}>
                        <div className={classes.stats}>Grd Ball: {hitterData.groundBall !== null ? hitterData.groundBall || 0 : []}</div>
                    </Grid>
                    <Grid item xs={2}>
                        <div className={classes.stats}>Grd Outs: {hitterData.groundOuts !== null ? hitterData.groundOuts || 0 : []}</div>
                    </Grid>
                    <Grid item xs={2}>
                        <div className={classes.stats}>GIDP: {hitterData.groundedIntoDoublePlay !== null ? hitterData.groundedIntoDoublePlay || 0 : []}</div>
                    </Grid>
                </Grid>
                <Grid container spacing={1} justify="flex-start">
                    <Grid item xs={2}>
                        <div className={classes.stats}>L-Drive: {hitterData.lineDrive !== null ? hitterData.lineDrive || 0 : []}</div>
                    </Grid>
                    <Grid item xs={2}>
                        <div className={classes.stats}>L-Out: {hitterData.lineOut !== null ? hitterData.lineOut || 0 : []}</div>
                    </Grid>
                    <Grid item xs={2}>
                        <div className={classes.stats}>LIDP: {hitterData.lineOutsIntoDoublePlay !== null ? hitterData.lineOutsIntoDoublePlay || 0 : []}</div>
                    </Grid>
                </Grid>
                <br/>
                <Grid container spacing={1} justify="flex-start">
                    <Grid item xs={2}>
                        <div className={classes.stats}>KO Look: {hitterData.strikeoutsLooking !== null ? hitterData.strikeoutsLooking || 0 : []}</div>
                    </Grid>
                    <Grid item xs={2}>
                        <div className={classes.stats}>KO Swing: {hitterData.strikeoutsSwinging !== null ? hitterData.strikeoutsSwinging || 0 : []}</div>
                    </Grid>
                    <Grid item xs={2}>
                        <div className={classes.stats}>KLook: {hitterData.strikesLooking !== null ? hitterData.strikesLooking || 0 : []}</div>
                    </Grid>
                    <Grid item xs={2}>
                        <div className={classes.stats}>KSwing: {hitterData.strikesSwinging !== null ? hitterData.strikesSwinging || 0 : []}</div>
                    </Grid>
                </Grid>
                <Grid container spacing={1} justify="flex-start">
                    <Grid item xs={2}>
                        <div className={classes.stats}>BB: {hitterData.walks !== null ? (hitterData.walks + hitterData.intentionalWalks) || 0 : []}</div>
                    </Grid>
                    <Grid item xs={2}>
                        <div className={classes.stats}>BB per AB: {hitterData.walksPerPlateAppearance !== null ? removeLeadingZero((hitterData.walksPerPlateAppearance || 0.0).toFixed(3)) : []}</div>
                    </Grid>
                </Grid>
            </div>
            {hitterData.opponentStats !== null && hitterData.opponentStats.length > 0 ?
            <HitterOpponentData opponentData={hitterData.opponentStats[0]} /> :
            <div/>
            }
        </div>
    )
}

export default HitterData
