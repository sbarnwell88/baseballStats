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
      fontFamily: 'Oswald'
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
    console.log(props.pitcherData)

    const pitchCount = props.pitcherData[0] !== undefined ? props.pitcherData[0].totals.statistics.pitch_metrics.overall.count : 0
    
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
                    </View>
                    <View style={styles.section}>
                        <Text>Section #2</Text>
                    </View>
                </Page>
            </Document>
        </PDFViewer>
        ) : <div/>
    )
}
