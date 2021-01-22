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
    minWidth: 140,
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
  const [homeTeamName, sethomeTeamName] = useState('')
  const [leagueSchedule, setleagueSchedule] = useState([])

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const getPitcherProfile = async (playerId) => {
    await delay(5000);
    const pitcher = await axios.get(`/players/profile/${playerId}`)
    console.log("Waited 5s");
    setPlayerProfile(pitcher.data)
  }

  const getLeagueSchedule = async () => {
    const schedule = await axios.get('/teams');
    setleagueSchedule(schedule.data)
    firstTeam(schedule.data)
   };

  const firstTeam = (leagueSchedule) => {
    let teams = [];
    leagueSchedule.games.forEach((item) => teams.push({team: item.home.name, id: item.home.id}))    
    const uniqueArray = teams.filter((item, index) => teams.findIndex(obj => obj.team === item.team) === index)
    setHomeTeamData(uniqueArray.sort((a, b) => (a.team > b.team) ? 1 : -1))
  }

   const getAwayTeam = async (leagueSchedule, teamId) => {
    let awayTeams = [];
    let homeTeams = [];
    leagueSchedule.games.forEach((item) => {
      if (item.home.id === teamId || item.away.id === teamId) {
          awayTeams.push({team: item.home.name, id: item.home.id})
          homeTeams.push({team: item.away.name, id: item.away.id})
      }
  })

    const opponentList = awayTeams.concat(homeTeams).filter((team) => team.id !== teamId)
    const uniqueArray = opponentList.filter((item, index) => opponentList.findIndex(obj => obj.team === item.team) === index)
    setAwayTeamData(uniqueArray.sort((a, b) => (a.team > b.team) ? 1 : -1));
   };

  const getPlayers = async (teamId) => {
      const players = await axios.get(`/teams/${teamId}`)
      console.log(players.data)
      setPlayerData(players.data.sort((a, b) => (a.last_name > b.last_name) ? 1 : -1))
  }

  const getPitcherStats = async (playerId) => {
    const pitcher = await axios.get(`/players/${playerId}`)
    setPitcherData(pitcher.data)
    getPitcherProfile(playerId)
}

  useEffect(() => {
    getLeagueSchedule()
  }, []);

const handleHomeTeamChange = (event, value) => {
    setHomeTeam(event.target.value)
    sethomeTeamName(value.props.children)
    getPlayers(event.target.value)
    getAwayTeam(leagueSchedule, event.target.value)
};

const handleAwayTeamChange = (event, value) => {
  setawayTeam(event.target.value);
};
  
const handlePlayerChange = (event, value) => {
  setPlayer(event.target.value);
};

const handleOnClick = () => {
  getPitcherStats(player)
}


  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', margin: '10px 50px'}}>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Select Team</InputLabel>
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
            <InputLabel id="demo-simple-select-label">Opposing Team</InputLabel>
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
      awayTeam={awayTeam}
      /> :
      <div/>}
    </div>
  );
}
