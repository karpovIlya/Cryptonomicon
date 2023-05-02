<template>
  <div class="container mx-auto flex flex-col items-center bg-gray-100 p-4">
    <add-ticker
      @add-ticker="addTickerToArray"
      @update-price="updateTickersPrice"
      :tickers-list="tickers"
    />
  </div>
</template>

<script>
import AddTicker from "./components/AddTicker.vue";

export default {
  name: "App",
  components: {
    AddTicker,
  },
  data() {
    return {
      tickers: [],
    };
  },
  methods: {
    addTickerToArray(newTicker) {
      this.tickers.push(newTicker);
    },

    updateTickersPrice(updateTicker) {
      this.tickers.forEach((ticker) => {
        if (ticker.eventId === updateTicker.eventId) {
          ticker.price = updateTicker.price;
        }
      });
    },
  },
};
</script>
