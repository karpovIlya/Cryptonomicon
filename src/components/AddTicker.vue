<template>
  <section>
    <div class="flex">
      <div class="max-w-xs">
        <label for="wallet" class="block text-sm font-medium text-gray-700">
          Тикер
        </label>

        <div class="mt-1 relative rounded-md shadow-md">
          <input
            type="text"
            name="wallet"
            id="wallet"
            class="block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
            placeholder="Например DOGE"
            v-model="newTickerValue"
            @keydown.enter="addTicker"
          />
        </div>

        <ui-autocomplete
          :input-value="newTickerValue"
          @click-to-hint="useHint"
        />
        <div class="text-sm text-red-600">{{ validateText }}</div>
        <ui-add-button @click="addTicker" />
      </div>
    </div>
  </section>
</template>

<script>
import UiAddButton from "./UI/UiAddButton.vue";
import UiAutocomplete from "./UI/UiAutocomplete.vue";
import { getUrl, getPrice } from "../api";

export default {
  name: "AddTicker",
  components: {
    UiAddButton,
    UiAutocomplete,
  },
  props: {
    tickersList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      newTickerValue: "",
      validateText: "",
    };
  },
  methods: {
    addTicker() {
      const newTicker = {
        name: this.newTickerValue.toUpperCase(),
        price: "-",
      };

      if (!this.isTickerThere(newTicker.name)) {
        newTicker.eventId = setInterval(() => {
          getPrice(getUrl(newTicker.name)).then(
            (data) => (newTicker.price = data)
          );

          this.$emit("update-price", newTicker);
        }, 2000);

        this.$emit("add-ticker", newTicker);
        this.newTickerValue = "";
      }
    },

    isTickerThere(newTickerName) {
      let isThere = false;

      this.tickersList.forEach((ticker) => {
        if (ticker.name === newTickerName) {
          isThere = true;
        }
      });

      if (isThere) {
        this.validateText = "Такой тикер уже добавлен!";
      } else {
        this.validateText = "";
      }

      return isThere;
    },

    useHint(hintText) {
      this.newTickerValue = hintText;
    },
  },
};
</script>
