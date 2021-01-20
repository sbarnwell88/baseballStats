import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import PDFDocument from './PDFDocument';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Home() {
  const classes = useStyles();
  const [homeTeamData, setHomeTeamData] = useState([])
  const [homeTeam, setHomeTeam] = useState('')
  const [awayTeamData, setAwayTeamData] = useState([])
  const [awayTeam, setawayTeam] = useState('')
  const [playerData, setPlayerData] = useState([])
  const [player, setPlayer] = useState([])
  const [pitcherData, setPitcherData] = useState([])
  const [playerProfile, setPlayerProfile] = useState();
  const [playerName, setplayerName] = useState('')
  const [homeTeamName, sethomeTeamName] = useState('')
  const [awayTeamName, setawayTeamName] = useState()

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const getPitcherProfile = async (playerId) => {
    await delay(5000);
    const pitcher = await axios.get(`/players/profile/${playerId}`)
    console.log("Waited 5s");
    setPlayerProfile(pitcher.data)
  }

  const getHomeTeam = async () => {
    const schedule = await axios.get('/teams');
    setHomeTeamData(schedule.data);
   };

   const getAwayTeam = async (teamId) => {
    const schedule = await axios.get(`/teams/awayTeam/${teamId}`);
    console.log(schedule.data)
    setAwayTeamData(schedule.data);
   };

  const getPlayers = async (teamId) => {
      const players = await axios.get(`/teams/${teamId}`)
      setPlayerData(players.data)
  }

  const getPitcherStats = async (playerId) => {
    const pitcher = await axios.get(`/players/${playerId}`)
    setPitcherData(pitcher.data)
    getPitcherProfile(playerId)
}

  useEffect(() => {
    getHomeTeam()
  }, []);

const handleHomeTeamChange = (event, value) => {
    setHomeTeam(event.target.value)
    sethomeTeamName(value.props.children)
    getPlayers(event.target.value)
    getAwayTeam(event.target.value)
};

const handleAwayTeamChange = (event, value) => {
  setawayTeam(event.target.value);
  setawayTeamName(value.props.children)
};
  
const handlePlayerChange = (event, value) => {
  console.log(value.props.children)
  setPlayer(event.target.value);
  setplayerName(value.props.children)
};

const handleOnClick = () => {
  getPitcherStats(player)
}


  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', margin: '10px 50px'}}>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Home Team</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={homeTeam}
              onChange={handleHomeTeamChange}
            >
                {homeTeamData.map((team) => <MenuItem name={team.team} value={team.id} key={team.id}>{team.team}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Pitchers</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={player}
              onChange={handlePlayerChange}
            >
                {playerData.map((player) => <MenuItem value={player.id} key={player.id}>{player.first_name} {player.last_name}</MenuItem>)}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Away Team</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={awayTeam}
              onChange={handleAwayTeamChange}
            >
                {awayTeamData.map((team) => <MenuItem value={team.id} key={team.id}>{team.team}</MenuItem>)}
            </Select>
          </FormControl>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center'}}>
        <Button variant="contained" color="primary" onClick={handleOnClick}>
          Submit
        </Button>
      </div>
      {playerProfile !== '' && playerProfile !== undefined ? 
      <PDFDocument 
      pitcherData={pitcherData} 
      playerProfile={playerProfile} 
      playerName={playerName} 
      awayTeam={awayTeam}
      awayTeamName={awayTeamName}
      /> :
      <div/>}
    </div>
  );
}
