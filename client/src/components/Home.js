import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import PDFDocument from './PDFDocument';
import HitterPDFDocument from './HitterPDFDocument'
import PitcherData from './PitcherData';
import HitterData from './HitterData';

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
  const [awayTeam, setawayTeam] = useState(null)
  const [playerData, setPlayerData] = useState([])
  const [player, setPlayer] = useState([])
  const [pitcherData, setPitcherData] = useState(null)
  const [hitterData, setHitterData] = useState(null)
  const [leagueSchedule, setleagueSchedule] = useState([])
  const [year, setyear] = useState('')
  const years = [2018, 2019, 2020, 2021]
  const [position, setposition] = useState('');
  const [mlbSeason, setMlbSeason] = useState('');

  const getLeagueSchedule = async () => {
    const schedule = await axios.get(`api/teams`);
    setleagueSchedule(schedule.data)
    firstTeam(schedule.data)
   };

  const firstTeam = (leagueSchedule) => {
    let teams = [];
    leagueSchedule.games.forEach((item) => teams.push({team: item.home.name, id: item.home.id}))    
    const uniqueArray = teams.filter((item, index) => teams.findIndex(obj => obj.team === item.team) === index)
    .filter((team) => team.team.toLowerCase() !== 'american league' && team.team.toLowerCase() !== 'national league')
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

  const getPlayers = async (teamId, positionId) => {
      const players = await axios.get(`api/players?teamId=${teamId}&position=${positionId}`)
      setPlayerData(players.data.sort((a, b) => (a.last_name > b.last_name) ? 1 : -1))
  }

  const getPitcherStats = async (playerId) => {
    if (position === 'P') {
      const pitcher = await axios.get(`api/pitcherProfile?playerId=${playerId}&year=${year}&mlbSeason=${mlbSeason}&opponentId=${awayTeam}`)
      setPitcherData(pitcher.data)
    } else {
      const hitterData = await axios.get(`api/hitterProfile?playerId=${playerId}&year=${year}&mlbSeason=${mlbSeason}&opponentId=${awayTeam}`)
      setHitterData(hitterData.data)
    }
    
}

  useEffect(() => {
    getLeagueSchedule()
  }, []);

const handleHomeTeamChange = (event) => {
  console.log(event.target.value)
    setHomeTeam(event.target.value)
    getAwayTeam(leagueSchedule, event.target.value)
    setPlayer(null)
    setposition(null)
};

const handleAwayTeamChange = (event) => {
  setawayTeam(event.target.value);
};
  
const handlePlayerChange = (event) => {
  setPlayer(event.target.value);
};

const handleOnClick = () => {
  setPitcherData(null)
  setHitterData(null)
  getPitcherStats(player)
}

const handleYearOnChange = (event) => {
  setyear(event.target.value)
}

const handlePositionOnChange = (event) => {
  setposition(event.target.value)
  getPlayers(homeTeam, event.target.value)
}

const handleMlbSeasonOnChange = (event) => {
  setMlbSeason(event.target.value)
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
            <InputLabel id="demo-simple-select-label">Position</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={position}
              onChange={handlePositionOnChange}
            >
              <MenuItem value={'P'}>Pitcher</MenuItem>
              <MenuItem value={'H'}>Hitter</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">MLB Season</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={mlbSeason}
              onChange={handleMlbSeasonOnChange}
            >
              <MenuItem value={'REG'}>Regular</MenuItem>
              <MenuItem value={'PST'}>POST</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Year</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={year}
              onChange={handleYearOnChange}
            >
                {years.map((year) => <MenuItem value={year}>{year}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Player</InputLabel>
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
      {pitcherData !== null && pitcherData !== undefined ? 
      // <PDFDocument 
      // pitcherData={pitcherData} 
      // /> 
      <div>
        <a style={{ margin: '0 10px'}} href={"https://quest.inside-edge.com/Account/Login?ReturnUrl=%2f"} target="_blank">Quest Inside Edge</a>
        <PitcherData pitcherData={pitcherData} />
      </div>
      :
      <div/>}
      {hitterData !== null ? 
      <div>
        <a style={{ margin: '0 10px'}} href={hitterData.linkForBrooksBaseball} target="_blank">Zone Profile</a>
        <a style={{ margin: '0 10px'}} href={"https://quest.inside-edge.com/Account/Login?ReturnUrl=%2f"} target="_blank">Quest Inside Edge</a>
        {/* <HitterPDFDocument hitterData={hitterData} /> */}
        <HitterData hitterData={hitterData} />
      </div> : <div/>}
    </div>
  );
}
