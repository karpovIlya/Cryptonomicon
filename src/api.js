const allTickersUrl =
  "https://min-api.cryptocompare.com/data/all/coinlist?summary=true";

function getUrl(tickerName) {
  return `https://min-api.cryptocompare.com/data/price?fsym=${tickerName}&tsyms=USD`;
}

async function getPrice(url) {
  try {
    const request = await fetch(url);
    const data = await request.json();

    return data.USD;
  } catch (error) {
    console.log(error);
  }
}

async function getAllTickers() {
  try {
    const request = await fetch(allTickersUrl);
    const data = await request.json();

    return await data.Data;
  } catch (error) {
    console.log(error);
  }
}

export { getUrl, getPrice, getAllTickers };
