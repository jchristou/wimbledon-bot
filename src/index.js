import { parseWimbledonResults } from "./wimbledon";

function pollWimbledon() {
  const currentHour = new Date().getHours();
  if (currentHour >= 8 && currentHour <= 20) {
    console.log("Polling...");
    parseWimbledonResults();
  }
}

pollWimbledon();

setInterval(pollWimbledon, 60 * 1_000);
