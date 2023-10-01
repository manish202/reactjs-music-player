import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseIcon from '@mui/icons-material/Pause';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import {useContext,memo} from "react";
import {MainContext} from "./App";

const SingleMusic = memo(({music,togglePlayPause}) => {
  console.log("App > MusicList > SingleMusic");
    return(
        <ListItem sx={{p:2}} secondaryAction={
            <IconButton sx={{p:2}} onClick={() => togglePlayPause(music)} edge="end" aria-label="play-pause">
              {music.playState == 'play' ? <PauseIcon />:<PlayCircleOutlineIcon />}
            </IconButton>
          }>
          <ListItemAvatar>
            <Avatar alt={music.name} src={`/cover/${music.cover}`}></Avatar>
          </ListItemAvatar>
          <ListItemText primary={music.name} />
        </ListItem>
    )
})

const MusicList = () => {
    console.log("App > MusicList");
    const {mode,musics,togglePlayPause} = useContext(MainContext);
    return(
      <Box
        sx={{
        width: '95%',
        maxWidth:600,
        margin:'20px auto',
        borderRadius: '5px',
        bgcolor: mode === 'dark' ? 'black':'aliceblue'
        }}
      >
        <List sx={{ width: '100%' }}>
          {musics.map((music) => <SingleMusic key={music.id} music={music} togglePlayPause={togglePlayPause} />)}
        </List>
      </Box>
    )
}
export default memo(MusicList);