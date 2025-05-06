import { sendTelegramError, sendTelegramMessage } from "./telegram";

/* This token needs refreshing daily. In chrome, open up DevTools and
 * change to the "Network" tab. Navigate to the wimbledon ticket website,
 * and find this catalog call in devtools. Right click it, and click
 * "Copy as fetch (Node.js)". Replace this fetch with what you copied */
const getCurrentCatalog = () =>
  fetch(
    "https://ticketsale.wimbledon.com/tnwr/v1/catalog?maxPerformances=50&maxTimeslots=50&maxPerformanceDays=3&maxTimeslotDays=3&includeMetadata=true",
    {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "en",
        priority: "u=1, i",
        "sec-ch-ua":
          '"Chromium";v="136", "Brave";v="136", "Not.A/Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sec-gpc": "1",
        "x-api-key": "",
        "x-csrf-token": "",
        "x-secutix-host": "ticketsale.wimbledon.com",
        cookie: "",
        Referer: "https://ticketsale.wimbledon.com/secured/content",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      body: null,
      method: "GET"
    }
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then((response) => {
      if (response.sections.length === 0) {
        return Promise.reject("Sections is 0 length. Refresh Token");
      }
      return response;
    })
    .catch((error) => {
      sendTelegramError(
        `Boss! There's a problem with the bot! ${JSON.stringify(error)}`
      );
    });

export async function parseWimbledonResults() {
  const results = await getCurrentCatalog();
  if (!results) {
    console.log("something is going wrong, there are no results");
    return;
  }
  const sections = results.sections;
  const relevantData = sections.map((section) => {
    const court = section.name.en;
    const days = section.clusters[0].items.map(({ product }) => ({
      availability: product.availability,
      saleAvailability: product.saleAvailability,
      dayName: product.jsonLdMetadata.name,
      url: product.performances[0].action.buy
    }));
    return {
      court,
      days
    };
  });

  relevantData.forEach((data) => {
    /* This doesn't seem to filter anything. Oh well. It's enough to know when there was a drop, at least. */
    const filteredDays = data.days.filter(
      (day) => day.availability !== "NONE" || day.saleAvailability !== "NONE"
    );

    if (filteredDays.length !== 0) {
      const craftedMessage = filteredDays.reduce((acc, day) => {
        return acc + `${day.dayName}: ${day.url} \n`;
      }, "");

      sendTelegramMessage(
        `Hey, looks like there are some tickets for ${data.court}!\n\n${craftedMessage}`
      );
    }
  });
}
