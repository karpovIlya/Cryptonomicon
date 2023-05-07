<template>
  <div
    class="flex bg-white shadow-md p-1 rounded-md shadow-md flex-wrap"
    v-if="hints.length > 0"
  >
    <span
      class="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer"
      v-for="hint in hints"
      :key="hint"
      @click="() => clickToHint(hint)"
    >
      {{ hint }}
    </span>
  </div>
</template>

<script>
import { getAllTickers } from "../../api";

export default {
  name: "UiAutocomplete",
  props: {
    inputValue: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      hints: [],
      allTickers: null,
    };
  },
  methods: {
    autocomplete() {
      let count = 0;
      this.hints = [];

      this.allTickers.then((allTickersNames) => {
        for (let tickerName in allTickersNames) {
          if (
            tickerName.toUpperCase().search(this.inputValue.toUpperCase()) !==
              -1 &&
            this.inputValue !== "" &&
            count < 5
          ) {
            this.hints.push(tickerName);
            count++;
          }
        }
      });
    },

    clickToHint(hintText) {
      this.$emit("click-to-hint", hintText);
    },
  },
  watch: {
    inputValue() {
      this.autocomplete();
    },
  },
  created() {
    this.allTickers = getAllTickers();
  },
};
</script>
