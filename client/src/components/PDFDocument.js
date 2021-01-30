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

export default function PDFDocument(props) {

    const { pitcherData } = props;

    let firstHalfWinSum = 0;
    let firstHalfLossSum = 0;
    let firstHalfIp2Sum = 0;
    let firstHalfEraSum = 0;
    let firstHalfObaSum = 0;
    let firstHalfHitSum = 0;
    let firstHalfBattersFacedSum = 0;
    let secondHalfWinSum = 0;
    let secondHalfLossSum = 0;
    let secondHalfIp2Sum = 0;
    let secondHalfEraSum = 0;
    let secondHalfObaSum = 0;
    let secondHalfHitSum = 0;
    let secondHalfBattersFacedSum = 0;
    pitcherData.months.forEach((month) => {
        if (month.value === '4' || month.value === '5' || month.value === '6') {
            console.log("here")
            firstHalfWinSum = firstHalfWinSum + month.win;
            firstHalfLossSum = firstHalfLossSum + month.loss
            firstHalfIp2Sum = firstHalfIp2Sum + month.ip_2
            firstHalfEraSum = firstHalfEraSum + month.era
            firstHalfObaSum = firstHalfObaSum + month.oba
            firstHalfHitSum = firstHalfHitSum + month.h
            firstHalfBattersFacedSum = firstHalfBattersFacedSum + month.bf
        } else if (month.value === '7' || month.value === '8' || month.value === '9') {
            secondHalfWinSum = secondHalfWinSum + month.win
            secondHalfLossSum = secondHalfLossSum + month.loss
            secondHalfIp2Sum = secondHalfIp2Sum + month.ip_2
            secondHalfEraSum = secondHalfEraSum + month.era
            secondHalfObaSum = secondHalfObaSum + month.oba
            secondHalfHitSum = secondHalfHitSum + month.h
            secondHalfBattersFacedSum = secondHalfBattersFacedSum + month.bf
        }
    })

    return (
        pitcherData !== null ? (
        <PDFViewer style={{marginTop: '20px', width: '100%', height: '100vh'}}>
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Text style={{fontSize: 24, textAlign: 'center'}}>{pitcherData.name}</Text>
                    <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                        <View style={{padding: '0 15px', marginTop: '10px'}}>
                            <Text>Pitch Types</Text>
                            {pitcherData.pitchTypes !== null ? 
                            pitcherData.pitchTypes.map((pitch, i) => {
                                return (
                                    <View style={{display: 'flex', flexDirection: 'row'}} key={i}>
                                        <Text style={styles.text}>{pitch.type}:</Text> 
                                        <Text style={styles.text}>{pitch.avg_speed.toFixed(1)}</Text> 
                                        <Text style={styles.text}>{(pitch.count/pitcherData.pitchCount*100).toFixed(2)}%</Text>
                                        <Text style={styles.text}>{pitch.onbase.hr} hr</Text>
                                        <Text style={styles.text}>{(pitch.onbase.h/(pitch.in_play.linedrive + pitch.in_play.groundball + pitch.in_play.popup + pitch.in_play.flyball)).toFixed(3)} avg</Text>
                                    </View>)
                            }): []}
                        </View>
                        <View style={{padding: '0 15px', marginTop: '10px'}}>
                            <Text>Home/Away</Text>
                            {pitcherData.homeAway !== null ? pitcherData.homeAway.map((item, i) => {
                                return (
                                    <View style={{display: 'flex', flexDirection: 'row'}} key={i}>
                                        <Text style={styles.text}>{item.value}:</Text>
                                        <Text style={styles.text}>{item.win} wins</Text>
                                        <Text style={styles.text}>{item.loss} losses</Text>
                                        <Text style={styles.text}>{item.era} era</Text>
                                        <Text style={styles.text}>{item.oba} avg</Text>
                                        <Text style={styles.text}>{item.hr} hr</Text>
                                    </View>
                                )
                            }): []}
                            <View style={{marginTop: '15px'}}>
                                <Text>R/L handed batters</Text>
                                {pitcherData.hitterHand !== null ? pitcherData.hitterHand.map((hand, i) => {
                                    return (
                                        <View style={{display: 'flex', flexDirection: 'row'}} key={i}>
                                            <Text style={styles.text}>{hand.value}-hand batter:</Text>
                                            <Text style={styles.text}>{hand.oba}</Text>
                                            <Text style={styles.text}>{hand.hr} hr</Text>
                                        </View>
                                    )
                                }) : []}
                            </View>
                            <View style={{marginTop: '15px'}}>
                                <Text>Overall</Text>
                                <View style={{display: 'flex', flexDirection: 'row'}}>
                                    <Text style={styles.text}>Innings Pitched/Year: {pitcherData.overallStats !== null ? pitcherData.overallStats.ip_2 : []}</Text>
                                    <Text style={styles.text}>Avg: {pitcherData.overallStats !== undefined ? pitcherData.overallStats.oba : []}</Text>
                                </View>
                            </View>
                            <View style={{marginTop: '15px'}}>
                                <Text>September Stats</Text>
                                {pitcherData.months !== null ? pitcherData.months.map((month) => {
                                    if (month.value === '9') {
                                        return (
                                            <View style={{display: 'flex', flexDirection: 'row'}}>
                                                <Text style={styles.text}>Wins: {month.win}</Text>
                                                <Text style={styles.text}>Losses: {month.loss}</Text>
                                                <Text style={styles.text}>ERA: {month.era}</Text>
                                                <Text style={styles.text}>Avg: {month.oba}</Text>
                                                <Text style={styles.text}>Innings pitched: {month.ip_2}</Text>
                                            </View>)
                                    }
                                }) : []}
                            </View>
                            <View style={{marginTop: '15px'}}>
                                <Text>First Half</Text>
                                {pitcherData.months !== null ? 
                                (<View style={{display: 'flex', flexDirection: 'row'}}>
                                    <Text style={styles.text}>Wins: {firstHalfWinSum}</Text>
                                    <Text style={styles.text}>Losses: {firstHalfLossSum}</Text>
                                    <Text style={styles.text}>ERA: {(firstHalfEraSum/firstHalfIp2Sum).toFixed(3)}</Text>
                                    {/* <Text style={styles.text}>Avg: {(firstHalfObaSum/firstHalfBattersFacedSum).toFixed(3)}</Text> */}
                                    <Text style={styles.text}>Innings pitched: {firstHalfIp2Sum}</Text>
                                </View>) : []}
                            </View>
                            <View style={{marginTop: '15px'}}>
                                <Text>Second Half</Text>
                                {pitcherData.months !== null ? 
                                (<View style={{display: 'flex', flexDirection: 'row'}}>
                                    <Text style={styles.text}>Wins: {secondHalfWinSum}</Text>
                                    <Text style={styles.text}>Losses: {secondHalfLossSum}</Text>
                                    <Text style={styles.text}>ERA: {(secondHalfEraSum/secondHalfIp2Sum).toFixed(3)}</Text>
                                    {/* <Text style={styles.text}>Avg: {(secondHalfObaSum/secondHalfBattersFacedSum).toFixed(3)}</Text> */}
                                    <Text style={styles.text}>Innings pitched: {secondHalfIp2Sum}</Text>
                                </View>) : []}
                            </View>
                            <View style={{marginTop: '15px'}}>
                                <Text>Last Starts</Text>
                                {pitcherData.lastStarts !== null ? pitcherData.lastStarts.map((item, index) => {
                                    return (
                                        <View style={{display: 'flex', flexDirection: 'row'}} key={index}>
                                            <Text style={styles.text}>starts: {item.value}</Text>
                                            <Text style={styles.text}>era: {item.era}</Text>
                                            <Text style={styles.text}>avg: {item.oba}</Text>
                                        </View>
                                    )
                                }) : []}
                            </View>
                        </View>
                    </View>
                </View>
            </Page>
            {pitcherData.opponentStats !== null ? (
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <View style={{padding: '0 15px', marginTop: '15px'}}>
                            {pitcherData.opponentName !== null ? <Text>{pitcherData.opponentName}</Text> : []}
                            {pitcherData.opponentStats !== null ? pitcherData.opponentStats.map((item, index) => {
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
                </Page>
                ) : []}
            </Document>
        </PDFViewer>
        ) : <div/>
    )
}
