import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const getBuildLolApi = async () => {
  try {
    const { data } = await axios.get(process.env.URL_ALEATORILOL + "/api/all");
    
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getBuildLolApi;