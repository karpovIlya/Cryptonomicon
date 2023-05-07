<template>
  <div class="container mx-auto flex flex-col items-center bg-gray-100 p-4">
    <div class="container">
      <add-ticker @add-ticker="addTickerToArray" :tickers-list="tickers" />

      <hr class="w-full border-t border-gray-600 my-4" v-if="tickers.length" />

      <dl class="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <ticker-card
          v-for="ticker in tickers"
          :key="ticker.name"
          :ticker-recievd="ticker"
          @delete="deleteTicker"
        />
      </dl>

      <hr class="w-full border-t border-gray-600 my-4" v-if="tickers.length" />
    </div>
  </div>
</template>

<script>
import AddTicker from "./components/AddTicker.vue";
import TickerCard from "./components/TickerCard.vue";

export default {
  name: "App",
  components: {
    AddTicker,
    TickerCard,
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

    deleteTicker(tickerToRemove) {
      this.tickers.forEach((ticker, index) => {
        if (ticker.name === tickerToRemove.name) {
          this.tickers.splice(index, 1);
        }
      });
    },
  },
};
</script>
