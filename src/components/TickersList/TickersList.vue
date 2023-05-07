<template>
  <dl class="grid grid-cols-1 gap-5 sm:grid-cols-3">
    <ui-ticker-card
      v-for="ticker in tickersList"
      :key="ticker.name"
      :ticker-recievd="ticker"
      @delete="deleteTicker"
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
  },
  methods: {
    deleteTicker(tickerToRemove) {
      this.$emit("delete", tickerToRemove);
    },
  },
};
</script>
