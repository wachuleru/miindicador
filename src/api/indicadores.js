import { API_URL } from "../utils/url";
import axios from "axios";

export const indicadoresEconomicos= async (query)=>{
    const indicador = await axios.get(`${API_URL}/${query}`);
    return indicador.data
};