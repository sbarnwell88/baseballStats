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

export default function HitterPDFDocument(props) {

    const { hitterData } = props;

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
                                        <Text style={styles.text}>{hitter.ab} ab</Text> 
                                        <Text style={styles.text}>{hitter.runs} runs</Text>
                                    </View>)
                            }): []}
                        </View>
                    </View>
                        <View style={{padding: '0 15px', marginTop: '10px'}}>
                            <View style={{marginTop: '15px'}}>
                                <Text>Overall</Text>
                                <View style={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap'}}>
                                    <Text style={styles.text}>RISP: {hitterData.risp !== null ? hitterData.risp.toFixed(3) : []}</Text>
                                    <Text style={styles.text}>Avg: {hitterData.avg !== null ? hitterData.avg : []}</Text>
                                    <Text style={styles.text}>HRs: {hitterData.hr !== null ? hitterData.hr : []}</Text>
                                    <Text style={styles.text}>RBIs with 2 outs: {hitterData.rbi2Out !== null ? hitterData.rbi2Out : []}</Text>
                                    <Text style={styles.text}>Men left on base: {hitterData.leftOnBase !== null ? hitterData.leftOnBase : []}</Text>
                                    <Text style={styles.text}>RBIs: {hitterData.rbi !== null ? hitterData.rbi : []}</Text>
                                    <Text style={styles.text}>Extra base hits: {hitterData.extraBaseHit !== null ? hitterData.extraBaseHit : []}</Text>
                                    <Text style={styles.text}>Runners Left on Base with RISP and 2 outs: {hitterData.lobRisp2Out !== null ? hitterData.lobRisp2Out : []}</Text>
                                </View>
                            </View>
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
