<template>
  <dl class="grid grid-cols-1 gap-5 sm:grid-cols-3">
    <ui-ticker-card
      v-for="ticker in tickersList"
      :key="ticker.name"
      :ticker-recievd="ticker"
      @delete="deleteTicker"
      @click="() => chooseTicker(ticker)"
      :class="{
        'border-4':
          receivedChoosenTicker !== null &&
          ticker.name === receivedChoosenTicker.name,
      }"
    />
  </dl>
</template>

<script>
import UiTickerCard from "./UiTickerCard.vue";

export default {
  name: "TickersList",
  components: {
    UiTickerCard,
  },
  props: {
    tickersList: {
      type: Array,
      default: () => [],
    },
    receivedChoosenTicker: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    deleteTicker(tickerToRemove) {
      this.$emit("delete", tickerToRemove);
    },

    chooseTicker(choosenTicker) {
      this.$emit("chooseTicker", choosenTicker);
    },
  },
};
</script>
