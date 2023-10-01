import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';
import {useState,useRef,useEffect,useContext,memo} from "react";
import {MainContext} from "./App";
const Widget = styled('div')(({ theme }) => ({
    padding: 16,
    borderRadius: 16,
    width: 343,
    maxWidth: '100%',
    margin: 'auto',
    position: 'relative',
    zIndex: 1,
    backgroundColor: theme.palette.mode === 'dark' ? 'black':'aliceblue',
    backdropFilter: 'blur(40px)',
}));

const CoverImage = styled('div')({
    width: 100,
    height: 100,
    objectFit: 'cover',
    overflow: 'hidden',
    flexShrink: 0,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.08)',
    '& > img': {
      width: '100%',
    },
});

const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
});

const formatDuration = (value) => {
    const minute = Math.floor(value / 60);
    const secondLeft = (value - minute * 60).toString().split(".")[0];
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
}

const MusicPlayer = () => {
    console.log("MusicPlayer");
    const {mode,musics,togglePlayPause} = useContext(MainContext);
    const audioRef = useRef();
    const [currentPosition, setCurrentPosition] = useState(0);
    const cur_music = musics.filter(obj => ['play','pause'].includes(obj.playState))[0] || musics[0];
    useEffect(() => {
        const audio = audioRef.current;
        const handleTimeUpdate = () => setCurrentPosition(audio.currentTime);
        audio.addEventListener('timeupdate',handleTimeUpdate);
        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
        };
    },[]);
    useEffect(() => {
        const audio = audioRef.current;
        cur_music.playState == 'play' ? audio.play(): audio.pause();
    },[cur_music]);
    let duration = audioRef.current ? audioRef.current.duration : 0;
    duration = !isNaN(duration) ? duration:0;
    let [mainIconColor,lightIconColor] = mode === 'dark' ? ['#fff','rgba(255,255,255,0.4)']:['#000','rgba(0,0,0,0.4)'];
    const seekTo = (positionInSeconds) => {
        if(audioRef.current){
            audioRef.current.currentTime = positionInSeconds;
            setCurrentPosition(positionInSeconds);
        }
    };
    const updateVolume = (e,val) => {
        audioRef.current.volume = val/100;
    }
    const changeSong = (dir) => {
        let ind = cur_music.id - 1;
        if(dir == "next"){
            ind++;
            if(ind >= musics.length){ ind = 0 }
        }else{
            ind--;
            if(ind < 0){ ind = musics.length - 1 }
        }
        togglePlayPause(musics[ind]);
    }
    return(
        <Box sx={{ width: '100%', overflow: 'hidden', m:'20px auto' }}>
            <Widget>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CoverImage>
                        <img
                        alt={cur_music.name}
                        src={`/cover/${cur_music.cover}`}
                        />
                    </CoverImage>
                    <Box sx={{ ml: 1.5, minWidth: 0 }}>
                        <Typography noWrap>
                        <b>{cur_music.name}</b>
                        </Typography>
                    </Box>
                </Box>
                <Slider
                    aria-label="time-indicator"
                    size="small"
                    value={currentPosition}
                    min={0}
                    step={1}
                    max={duration}
                    onChange={(_, value) => seekTo(value)}
                    sx={{
                        color: mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                        height: 4,
                        '& .MuiSlider-thumb': {
                        width: 8,
                        height: 8,
                        transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                        '&:before': {
                            boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                        },
                        '&:hover, &.Mui-focusVisible': {
                            boxShadow: `0px 0px 0px 8px ${
                            mode === 'dark'
                                ? 'rgb(255 255 255 / 16%)'
                                : 'rgb(0 0 0 / 16%)'
                            }`,
                        },
                        '&.Mui-active': {
                            width: 20,
                            height: 20,
                        },
                        },
                        '& .MuiSlider-rail': {
                        opacity: 0.28,
                        },
                    }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mt: -2,
                    }}
                    >
                    <TinyText>{formatDuration(currentPosition)}</TinyText>
                    <TinyText>-{formatDuration(duration - currentPosition)}</TinyText>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mt: -1,
                    }}
                    >
                    <IconButton onClick={() => changeSong("prev")} aria-label="previous song">
                        <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
                    </IconButton>
                    <IconButton
                        aria-label={['stop','pause'].includes(cur_music.playState) ? 'play' : 'pause'}
                        onClick={() => togglePlayPause(cur_music)}
                    >
                        {['stop','pause'].includes(cur_music.playState) ? (
                        <PlayArrowRounded
                            sx={{ fontSize: '3rem' }}
                            htmlColor={mainIconColor}
                        />
                        ) : (
                        <PauseRounded sx={{ fontSize: '3rem' }} htmlColor={mainIconColor} />
                        )}
                    </IconButton>
                    <IconButton onClick={() => changeSong("next")} aria-label="next song">
                        <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
                    </IconButton>
                </Box>
                <Stack spacing={2} direction="row" sx={{ mb: 1, px: 1 }} alignItems="center">
                <VolumeDownRounded htmlColor={lightIconColor} />
                <Slider
                    aria-label="Volume"
                    defaultValue={50}
                    onChange={updateVolume}
                    sx={{
                    color: mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                    '& .MuiSlider-track': {
                        border: 'none',
                    },
                    '& .MuiSlider-thumb': {
                        width: 24,
                        height: 24,
                        backgroundColor: '#fff',
                        '&:before': {
                        boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                        },
                        '&:hover, &.Mui-focusVisible, &.Mui-active': {
                        boxShadow: 'none',
                        },
                    },
                    }}
                />
                <VolumeUpRounded htmlColor={lightIconColor} />
                </Stack>
            </Widget>
            <audio ref={audioRef} src={`/music/${cur_music.song}`}></audio>
        </Box>
    )
}
export default memo(MusicPlayer);