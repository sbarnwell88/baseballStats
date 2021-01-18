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

    const pitchCount = props.pitcherData[0] !== undefined ? props.pitcherData[0].totals.statistics.pitch_metrics.overall.count : 0
    const hitterHandVsPitcher = props.playerProfile !== undefined && props.playerProfile[0].totals !== undefined ? props.playerProfile[0].totals.splits.pitching.overall[0].hitter_hand : []
    const homeAwayStats = props.playerProfile !== undefined && props.playerProfile[0].totals !== undefined ? props.playerProfile[0].totals.splits.pitching.overall[0].home_away : []
    
    return (
        props.pitcherData[0] !== undefined && props.playerProfile !== undefined ? (
        <PDFViewer style={{marginTop: '20px', width: '100%', height: '100vh'}}>
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Text style={{fontSize: 24, textAlign: 'center'}}>{props.playerName[2]} {props.playerName[0]}</Text>
                        <Text>Pitch Types</Text>
                    {props.pitcherData[0].totals.statistics.pitch_metrics.pitch_types.map((pitch, i) => {
                            return (
                                <View style={{display: 'flex', flexDirection: 'row'}} key={i}>
                                    <Text style={styles.text}>{pitch.type}:</Text> 
                                    <Text style={styles.text}>{pitch.avg_speed.toFixed(1)}</Text> 
                                    <Text style={styles.text}>{(pitch.count/pitchCount*100).toFixed(2)}%</Text>
                                </View>)
                    })}
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
                        <Text>Home/Away</Text>
                        {homeAwayStats !== undefined && homeAwayStats.length > 0 ? homeAwayStats.map((item, i) => {
                            return (
                                <View style={{display: 'flex', flexDirection: 'row'}} key={i}>
                                    <Text style={styles.text}>{item.value}:</Text>
                                    <Text style={styles.text}>{item.win} wins</Text>
                                    <Text style={styles.text}>{item.loss} losses</Text>
                                    <Text style={styles.text}>{item.era} era</Text>
                                </View>
                            )
                        }): []}
                    </View>
                </Page>
            </Document>
        </PDFViewer>
        ) : <div/>
    )
}
