<template>
  <div class="container mx-auto flex flex-col items-center bg-gray-100 p-4">
    <div class="container">
      <add-ticker @add-ticker="addTickerToArray" :tickers-list="tickers" />

      <hr class="w-full border-t border-gray-600 my-4" v-if="tickers.length" />

      <tickers-list
        :tickers-list="tickers"
        :received-choosen-ticker="selectedTicker"
        @delete="deleteTicker"
        @choose-ticker="chooseTicker"
      />

      <hr class="w-full border-t border-gray-600 my-4" v-if="tickers.length" />

      <price-chart
        :ticker-to-chart="selectedTicker"
        :is-visible="selectedTicker !== null"
        @remove-chart="deleteChart"
      />
    </div>
  </div>
</template>

<script>
import AddTicker from "./components/AddTicker/AddTicker.vue";
import TickersList from "./components/TickersList/TickersList.vue";
import PriceChart from "./components/PriceChart.vue";

export default {
  name: "App",
  components: {
    AddTicker,
    TickersList,
    PriceChart,
  },
  data() {
    return {
      tickers: [],
      selectedTicker: null,
    };
  },
  methods: {
    addTickerToArray(newTicker) {
      this.tickers.push(newTicker);
    },

    deleteTicker(tickerToRemove) {
      this.tickers.forEach((ticker, index) => {
        if (ticker.name === tickerToRemove.name) {
          this.tickers.splice(index, 1);
        }
      });

      if (
        this.selectedTicker !== null &&
        tickerToRemove.name === this.selectedTicker.name
      ) {
        this.selectedTicker = null;
      }
    },

    chooseTicker(choosenTicker) {
      this.selectedTicker = choosenTicker;
    },

    deleteChart() {
      this.selectedTicker = null;
    },
  },
};
</script>
