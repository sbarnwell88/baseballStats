import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
  const [teamData, setTeamData] = useState([])
  const [team, setTeam] = useState('')
  const [playerData, setPlayerData] = useState([])
  const [player, setPlayer] = useState([])
  const [pitcherData, setPitcherData] = useState([])
  const [playerName, setPlayerName] = useState('')
  const [playerProfile, setPlayerProfile] = useState();

  const getPitcherProfile = async () => {
      const pitcher = await axios.get(`/profile/${player}`)
      console.log(pitcher.data)
      setPlayerProfile(pitcher.data)
    }

  const getTeams = async () => {
    const schedule = await axios.get('/teams');
    setTeamData(schedule.data);
   };

   const getPlayers = async () => {
       const players = await axios.get(`/teams/${team}`)
       setPlayerData(players.data)
   }

   const getPitcherStats = async () => {
    const pitcher = await axios.get(`/players/${player}`)
    setPitcherData(pitcher.data)
  }

  useEffect(() => {
    getTeams()
  }, []);

  useEffect(() => {
      getPlayers()
  }, [team]);

  useEffect(() => {
    getPitcherStats()
    getPitcherProfile()
}, [player]);

const handleChange = (event) => {
    setTeam(event.target.value);
};
  
const handlePlayerChange = (event, value) => {
  console.log(event.target)
  console.log(value.props.children)
    setPlayer(event.target.value);
    setPlayerName(value.props.children)
};


  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Home Team</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={team}
          onChange={handleChange}
        >
            {teamData.map((team) => <MenuItem value={team.id} key={team.id}>{team.team}</MenuItem>)}
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
      <PDFDocument pitcherData={pitcherData} playerName={playerName} playerProfile={playerProfile} />
    </div>
  );
}
