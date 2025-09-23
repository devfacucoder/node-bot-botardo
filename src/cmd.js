import packageJson from "../package.json" with { type: "json" };

const cmd = [
  {
    comand: "!ping",
    text: "ponga",
  },
  {
    comand: "!streemer",
    text: "funcion para el mago es gay",
  },
  {
    comand: "!info",
    text: "robot info: version " + packageJson.version + " - creador: Javi",
    
  },
  {
    comand: "!anime",
    text: "usa este comando y te dara un anime al azar mas o menos",
    onLyView: true,
  },
  
  
];
export default cmd;
