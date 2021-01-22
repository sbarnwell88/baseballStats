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

    const { pitcherData, playerProfile, awayTeam } = props;
    console.log(playerProfile)
    const pitchCount = pitcherData[0].totals !== undefined ? pitcherData[0].totals.statistics.pitch_metrics.overall.count : 0
    const hitterHandVsPitcher = playerProfile !== undefined && playerProfile[0] !== undefined ? playerProfile[0].totals.splits.pitching.overall[0].hitter_hand : []
    const homeAwayStats = playerProfile !== undefined && playerProfile[0] !== undefined ? playerProfile[0].totals.splits.pitching.overall[0].home_away : []
    const opponentStats = playerProfile !== undefined && playerProfile[0] !== undefined && awayTeam !== undefined ? 
        playerProfile[0].totals.splits.pitching.overall[0].opponent.filter((team) => team.id === awayTeam) : []
    const opponentName = playerProfile !== undefined && playerProfile[0] !== undefined && awayTeam !== undefined ? 
        playerProfile[0].totals.splits.pitching.overall[0].opponent.filter((team) => team.id === awayTeam) : []
    const lastStarts = playerProfile !== undefined && playerProfile[0] !== undefined ? playerProfile[0].totals.splits.pitching.overall[0].last_starts : []
    const overallStats = playerProfile[0].totals.statistics.pitching.overall;
    console.log(playerProfile[0].totals.statistics.pitching.overall.ip_2)

    return (
        pitcherData[0] !== undefined && playerProfile !== undefined ? (
        <PDFViewer style={{marginTop: '20px', width: '100%', height: '100vh'}}>
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Text style={{fontSize: 24, textAlign: 'center'}}>{pitcherData[1]}</Text>
                    <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                        <View style={{padding: '0 15px', marginTop: '10px'}}>
                            <Text>Pitch Types</Text>
                            {pitcherData[0].totals !== undefined ? pitcherData[0].totals.statistics.pitch_metrics.pitch_types.map((pitch, i) => {
                                return (
                                    <View style={{display: 'flex', flexDirection: 'row'}} key={i}>
                                        <Text style={styles.text}>{pitch.type}:</Text> 
                                        <Text style={styles.text}>{pitch.avg_speed.toFixed(1)}</Text> 
                                        <Text style={styles.text}>{(pitch.count/pitchCount*100).toFixed(2)}%</Text>
                                        <Text style={styles.text}>{pitch.onbase.hr} hr</Text>
                                    </View>)
                            }): []}
                        </View>
                        <View style={{padding: '0 15px', marginTop: '10px'}}>
                            <View>
                            <Text>Home/Away</Text>
                            {homeAwayStats !== undefined && homeAwayStats.length > 0 ? homeAwayStats.map((item, i) => {
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
                            </View>
                            <View style={{marginTop: '15px'}}>
                                <Text>R/L handed batters</Text>
                                {hitterHandVsPitcher !== undefined && hitterHandVsPitcher.length > 0 ? hitterHandVsPitcher.map((hand, i) => {
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
                                    <Text style={styles.text}>Innings Pitched/Year: {playerProfile !== undefined && playerProfile[0] !== undefined ? overallStats.ip_2 : []}</Text>
                                    <Text style={styles.text}>Avg: {playerProfile !== undefined && playerProfile[0] !== undefined ? overallStats.oba : []}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{padding: '0 30px', marginTop: '15px'}}>
                            <Text>Last Starts</Text>
                            {lastStarts !== undefined && lastStarts.length > 0 ? lastStarts.map((item, index) => {
                                return (
                                    <View style={{display: 'flex', flexDirection: 'column'}} key={index}>
                                        <Text style={styles.text}>starts: {item.value}</Text>
                                        <Text style={styles.text}>era: {item.era}</Text>
                                        <Text style={styles.text}>avg: {item.oba}</Text>
                                    </View>
                                )
                            }) : []}
                        </View>
                        <View style={{padding: '0 15px', marginTop: '15px'}}>
                            {opponentName.length > 0 ? <Text>{opponentName[0].name}</Text> : []}
                            {opponentStats !== undefined && opponentStats.length > 0 && awayTeam !== undefined ? opponentStats.map((item, index) => {
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
                    </View>
                </Page>
            </Document>
        </PDFViewer>
        ) : <div/>
    )
}
