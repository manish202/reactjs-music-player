import {reducer,initialState} from "./reducer";
import {useCallback,createContext,useReducer} from "react";
import MaterialUISwitch from "./MuiSwitch";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MusicList from "./MusicList";
import MusicPlayer from "./MusicPlayer";
export const MainContext = createContext();
const App = () => {
  console.log("App");
  const [state,dispatch] = useReducer(reducer,initialState);
  const darkTheme = createTheme({
    palette: {
      mode:state.mode
    },
  });
  const toggleMode = () => {
    let m = state.mode == 'dark' ? 'light':'dark';
    dispatch({type:"TOGGLE_MODE",payload:m});
  }
  const togglePlayPause = useCallback((music) => {
    const m = state.musics.map(obj => {
      if(obj.id == music.id){
        return ['stop','pause'].includes(obj.playState) ? {...obj,playState:'play'} : {...obj,playState:'pause'};
      }else{
        return {...obj,playState:'stop'}
      }
    })
    dispatch({type:"UPDT_PLAYING",payload:m});
  },[state.musics])
  return(
    <MainContext.Provider value={{...state,togglePlayPause}}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <MaterialUISwitch onClick={toggleMode} checked={state.mode == 'dark'} sx={{ m: 1 }} />
        <MusicPlayer />
        <MusicList />
      </ThemeProvider>
    </MainContext.Provider>
  )
}
export default App;