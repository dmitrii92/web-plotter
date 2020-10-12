import { WolframResponeDto } from "./WolframResponse";
import axios from "axios";

const API_URL = "https://wolfram-api.herokuapp.com";

export const getGraph = (expression: string): Promise<WolframResponeDto> => {
  const url = `${API_URL}/plot/`;

  return axios.get(url, { params: { expression: expression } }).then((response) => response.data);
};
