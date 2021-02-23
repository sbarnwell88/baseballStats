import React from 'react'
import { Page, Text, View, Document, StyleSheet, PDFViewer, Font } from '@react-pdf/renderer';

Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
  });

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
      },
    page: {
      fontFamily: 'Oswald', 
      paddingTop: 20,
      paddingBottom: 20
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    },
    text: {
        marginLeft: 20,
    }
  });

export default function HitterPDFDocument(props) {

    const { hitterData } = props;

    let firstHalfHitsSum = 0;
    let firstHalfHRSum = 0;
    let firstHalfABSum = 0;
    let firstHalfDoublesSum = 0;
    let firstHalfAvg = 0;
    let firstHalfRbi = 0
    let secondHalfHitsSum = 0;
    let secondHalfHRSum = 0;
    let secondHalfABSum = 0;
    let secondHalfDoublesSum = 0;
    let secondHalfAvg = 0;
    let secondHalfRbi = 0;
    hitterData.months.forEach((month) => {
        if (month.value === '4' || month.value === '5' || month.value === '6') {
            firstHalfHitsSum = firstHalfHitsSum + month.h;
            firstHalfHRSum = firstHalfHRSum + month.hr
            firstHalfABSum = firstHalfABSum + month.ab
            firstHalfDoublesSum = firstHalfDoublesSum + month.d
            firstHalfAvg = firstHalfAvg + (month.avg * month.ab)
            firstHalfRbi = firstHalfRbi + month.rbi
        } else if (month.value === '7' || month.value === '8' || month.value === '9') {
            secondHalfHitsSum = secondHalfHitsSum + month.h
            secondHalfHRSum = secondHalfHRSum + month.hr
            secondHalfABSum = secondHalfABSum + month.ab
            secondHalfDoublesSum = secondHalfDoublesSum + month.d
            secondHalfAvg = secondHalfAvg + (month.avg * month.ab)
            secondHalfRbi = secondHalfRbi + month.rbi
        }
    })

    return (
        hitterData !== null ? (
        <PDFViewer style={{marginTop: '20px', width: '100%', height: '100vh'}}>
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Text style={{fontSize: 24, textAlign: 'center'}}>{hitterData.name}</Text>
                    <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                        <View style={{padding: '0 15px', marginTop: '10px'}}>
                            <Text>Pitcher Hand</Text>
                            {hitterData.pitcher_hand !== null ? 
                            hitterData.pitcher_hand.map((hitter, i) => {
                                return (
                                    <View style={{display: 'flex', flexDirection: 'row'}} key={i}>
                                        <Text style={styles.text}>{hitter.value}:</Text> 
                                        <Text style={styles.text}>{hitter.avg} avg</Text> 
                                        <Text style={styles.text}>{hitter.h} hits</Text>
                                        <Text style={styles.text}>{hitter.d} doubles</Text>
                                        <Text style={styles.text}>{hitter.rbi} rbi</Text>
                                        <Text style={styles.text}>{hitter.hr} hr</Text>
                                    </View>)
                            }): []}
                        </View>
                    </View>
                    <View style={{padding: '0 15px', marginTop: '10px'}}>
                            <Text>Home/Away</Text>
                            {hitterData.homeAway !== null ? hitterData.homeAway.map((item, i) => {
                                return (
                                    <View style={{display: 'flex', flexDirection: 'row'}} key={i}>
                                        <Text style={styles.text}>{item.value}:</Text>
                                        <Text style={styles.text}>{item.avg} avg</Text>
                                        <Text style={styles.text}>{item.h} hits</Text>
                                        <Text style={styles.text}>{item.d} doubles</Text>
                                        <Text style={styles.text}>{item.rbi} rbi</Text>
                                        <Text style={styles.text}>{item.hr} hr</Text>
                                    </View>
                                )
                            }): []}
                        </View>
                    <View style={{padding: '0 15px', marginTop: '10px'}}>
                        <View style={{marginTop: '15px'}}>
                            <Text>Overall</Text>
                            <View style={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap'}}>
                                <Text style={styles.text}>AB: {hitterData.atBats !== null ? hitterData.atBats : []}</Text>
                                <Text style={styles.text}>Hits: {hitterData.hits !== null ? hitterData.hits : []}</Text>
                                <Text style={styles.text}>Doubles: {hitterData.doubles !== null ? hitterData.doubles : []}</Text>
                                <Text style={styles.text}>Triples: {hitterData.triples !== null ? hitterData.triples : []}</Text>
                                <Text style={styles.text}>HRs: {hitterData.hr !== null ? hitterData.hr : []}</Text>
                                <Text style={styles.text}>RBIs: {hitterData.rbi !== null ? hitterData.rbi : []}</Text>
                                <Text style={styles.text}>RISP: {hitterData.risp !== null ? hitterData.risp.toFixed(3) : []}</Text>
                                <Text style={styles.text}>Avg: {hitterData.avg !== null ? hitterData.avg : []}</Text>
                                <Text style={styles.text}>RBIs with 2 outs: {hitterData.rbi2Out !== null ? hitterData.rbi2Out : []}</Text>
                                <Text style={styles.text}>Men left on base: {hitterData.leftOnBase !== null ? hitterData.leftOnBase : []}</Text>
                                <Text style={styles.text}>Extra base hits: {hitterData.extraBaseHit !== null ? hitterData.extraBaseHit : []}</Text>
                                <Text style={styles.text}>Runners Left on Base with RISP and 2 outs: {hitterData.lobRisp2Out !== null ? hitterData.lobRisp2Out : []}</Text>
                                <Text style={styles.text}>Fly Balls: {hitterData.flyBalls !== null ? hitterData.flyBalls : []}</Text>
                                <Text style={styles.text}>Fly Outs: {hitterData.flyOuts !== null ? hitterData.flyOuts : []}</Text>
                                <Text style={styles.text}>Fly Outs into Double Plays: {hitterData.flyOutsIntoDoublePlays !== null ? hitterData.flyOutsIntoDoublePlays : []}</Text>
                                <Text style={styles.text}>Ground Ball: {hitterData.groundBall !== null ? hitterData.groundBall : []}</Text>
                                <Text style={styles.text}>Ground Outs: {hitterData.groundOuts !== null ? hitterData.groundOuts : []}</Text>
                                <Text style={styles.text}>Grounded into Double Play: {hitterData.groundedIntoDoublePlay !== null ? hitterData.groundedIntoDoublePlay : []}</Text>
                                <Text style={styles.text}>Hits with RISP: {hitterData.hitsWithRisp !== null ? hitterData.hitsWithRisp : []}</Text>
                                <Text style={styles.text}>Isolated Power: {hitterData.isolatedPower !== null ? hitterData.isolatedPower : []}</Text>
                                <Text style={styles.text}>Line Drive: {hitterData.lineDrive !== null ? hitterData.lineDrive : []}</Text>
                                <Text style={styles.text}>Line Out: {hitterData.lineOut !== null ? hitterData.lineOut : []}</Text>
                                <Text style={styles.text}>Line Outs into Double Play: {hitterData.lineOutsIntoDoublePlay !== null ? hitterData.lineOutsIntoDoublePlay : []}</Text>
                                <Text style={styles.text}>On Base %: {hitterData.onBasePercentage !== null ? hitterData.onBasePercentage.toFixed(3) : []}</Text>
                                <Text style={styles.text}>Pop Outs: {hitterData.popOuts !== null ? hitterData.popOuts : []}</Text>
                                <Text style={styles.text}>Pop Ups: {hitterData.popUps !== null ? hitterData.popUps : []}</Text>
                                <Text style={styles.text}>Slugging %: {hitterData.sluggingPercentage !== null ? hitterData.sluggingPercentage.toFixed(3) : []}</Text>
                                <Text style={styles.text}>Strike Outs Looking: {hitterData.strikeoutsLooking !== null ? hitterData.strikeoutsLooking : []}</Text>
                                <Text style={styles.text}>Strike Outs Swinging: {hitterData.strikeoutsSwinging !== null ? hitterData.strikeoutsSwinging : []}</Text>
                                <Text style={styles.text}>Strikes Looking: {hitterData.strikesLooking !== null ? hitterData.strikesLooking : []}</Text>
                                <Text style={styles.text}>Strikes Swinging: {hitterData.strikesSwinging !== null ? hitterData.strikesSwinging : []}</Text>
                                <Text style={styles.text}>Walks: {hitterData.walks !== null ? hitterData.walks : []}</Text>
                                <Text style={styles.text}>Walks Per Plate Appearance: {hitterData.walksPerPlateAppearance !== null ? hitterData.walksPerPlateAppearance.toFixed(3) : []}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{marginTop: '15px'}}>
                            <Text>September Stats</Text>
                            {hitterData.months !== null ? hitterData.months.map((month) => {
                            if (month.value === '9') {
                                return (
                                    <View style={{display: 'flex', flexDirection: 'row'}}>
                                        <Text style={styles.text}>RBIs: {month.rbi}</Text>
                                        <Text style={styles.text}>HRs: {month.hr}</Text>
                                        <Text style={styles.text}>Hits: {month.h}</Text>
                                        <Text style={styles.text}>Obp: {month.obp}</Text>
                                        <Text style={styles.text}>Avg: {month.avg}</Text>
                                        <Text style={styles.text}>Doubles: {month.d}</Text>
                                    </View>)
                            }
                            }) : []}
                        </View>
                        <View style={{marginTop: '15px'}}>
                            <Text>First Half</Text>
                            {hitterData.months !== null ? 
                            (<View style={{display: 'flex', flexDirection: 'row'}}>
                                <Text style={styles.text}>RBIs: {firstHalfRbi}</Text>
                                <Text style={styles.text}>Hits: {firstHalfHitsSum}</Text>
                                <Text style={styles.text}>HRs: {firstHalfHRSum}</Text>
                                <Text style={styles.text}>Doubles: {firstHalfDoublesSum}</Text>
                                <Text style={styles.text}>Avg: {parseFloat((firstHalfAvg/firstHalfABSum).toFixed(3)) || 0}</Text>
                            </View>) : []}
                        </View>
                        <View style={{marginTop: '15px'}}>
                            <Text>Second Half</Text>
                            {hitterData.months !== null ? 
                            (<View style={{display: 'flex', flexDirection: 'row'}}>
                                <Text style={styles.text}>RBIs: {secondHalfRbi}</Text>
                                <Text style={styles.text}>Hits: {secondHalfHitsSum}</Text>
                                <Text style={styles.text}>HRs: {secondHalfHRSum}</Text>
                                <Text style={styles.text}>Doubles: {secondHalfDoublesSum}</Text>
                                <Text style={styles.text}>Avg: {parseFloat((secondHalfAvg/secondHalfABSum).toFixed(3)) || 0}</Text>
                            </View>) : []}
                        </View>
                    </View>
            </Page>
            {hitterData.opponentStats !== null ? (
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <View style={{padding: '0 15px', marginTop: '15px'}}>
                            {hitterData.opponentName !== null ? <Text>{hitterData.opponentName}</Text> : []}
                            {hitterData.opponentStats !== null ? hitterData.opponentStats.map((item, index) => {
                                return (
                                    <View style={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap'}} key={index}>
                                        <Text style={styles.text}>avg: {item.oba}</Text>
                                        <Text style={styles.text}>HR: {item.hr}</Text>
                                        <Text style={styles.text}>k total: {item.ktotal}</Text>
                                        <Text style={styles.text}>walks: {item.bb}</Text>
                                        <Text style={styles.text}>team win: {item.team_win}</Text>
                                        <Text style={styles.text}>team loss: {item.team_loss}</Text>
                                        <Text style={styles.text}>pitcher's wins: {item.win}</Text>
                                        <Text style={styles.text}>pitcher's losses: {item.loss}</Text>
                                        <Text style={styles.text}>starts: {item.start}</Text>
                                        <Text style={styles.text}>earned runs: {item.er}</Text>
                                    </View>
                                )
                            }) : []}
                        </View>
                    </View>
                </Page>)
                : []}
            </Document>
        </PDFViewer>
        ) : <div/>
    )
}
