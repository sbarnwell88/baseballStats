import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Page, Text, View, Document, StyleSheet, PDFViewer, Font } from '@react-pdf/renderer';

Font.register({
    family: 'Roboto',
     format: 'Light 300 italic',
    src: './Roboto/Roboto-MediumItalic.ttf'
  });

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
      },
    page: {
    //   fontFamily: 'Roboto', 
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
    const pitchingProfile = props.playerProfile !== undefined ? props.playerProfile[0].totals.splits.pitching.overall[0].hitter_hand : ''
    const homeAway = props.playerProfile !== undefined ? props.playerProfile[0].totals.splits.pitching.overall[0].home_away : ''
    console.log(homeAway)
    
    return (
        props.pitcherData[0] !== undefined ? (
        <PDFViewer style={{marginTop: '20px', width: '100%', height: '100vh'}}>
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Text style={{fontSize: 24, textAlign: 'center'}}>{props.playerName[2]} {props.playerName[0]}</Text>
                        <Text>Pitch Types</Text>
                    {props.pitcherData[0].totals.statistics.pitch_metrics.pitch_types.map((pitch) => {
                            return (
                                <View style={{display: 'flex', flexDirection: 'row'}}>
                                    <Text style={styles.text}>{pitch.type}:</Text> 
                                    <Text style={styles.text}>{pitch.avg_speed.toFixed(1)}</Text> 
                                    <Text style={styles.text}>{(pitch.count/pitchCount*100).toFixed(2)}%</Text>
                                </View>)
                    })}
                        <Text>R/L handed batters</Text>
                        {pitchingProfile !== undefined && pitchingProfile.length > 0 ? pitchingProfile.map((hand) => {
                            return (
                                <View style={{display: 'flex', flexDirection: 'row'}}>
                                    <Text style={styles.text}>{hand.value}-hand batter:</Text>
                                    <Text style={styles.text}>{hand.oba}</Text>
                                    <Text style={styles.text}>{hand.hr} hr</Text>
                                </View>
                            )
                        }) : []}
                        <Text>Home/Away</Text>
                        {homeAway !== undefined && homeAway.length > 0 ? homeAway.map((item) => {
                            return (
                                <View style={{display: 'flex', flexDirection: 'row'}}>
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
