const initialState = {
    mode:'dark',
    musics:[
        {id:1,name:"Music 1",cover:"cover-1.webp",song:"music-1.mp3",playState:'stop'},
        {id:2,name:"Music 2",cover:"cover-2.jpg",song:"music-2.mp3",playState:'stop'},
        {id:3,name:"Music 3",cover:"cover-3.webp",song:"music-3.mp3",playState:'stop'},
        {id:4,name:"Music 4",cover:"cover-4.webp",song:"music-4.mp3",playState:'stop'},
        {id:5,name:"Music 5",cover:"cover-5.webp",song:"music-5.mp3",playState:'stop'}
    ]
}
const reducer = (state,action) => {
    switch(action.type){
        case "TOGGLE_MODE":
            return {...state,mode:action.payload};
        break;
        case "UPDT_PLAYING":
            return {...state,musics:action.payload};
        break;
        default:
            return state;
    }
}
export {reducer,initialState};