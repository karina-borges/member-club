import { fetchClientInfoById } from "../services/fetch-client-info-by-id.js";
import { showClientInfo } from "./show.js";
const form = document.querySelector("form");
const cardId = document.getElementById("card-id");

form.onsubmit = async (event) => {
  event.preventDefault();

  try {
    const id = cardId.value;

    const client = await fetchClientInfoById({ id });

    cardId.value = "";

    showClientInfo({ client });
  } catch (error) {
    console.error("Error fetching client info", error);
  }
};
