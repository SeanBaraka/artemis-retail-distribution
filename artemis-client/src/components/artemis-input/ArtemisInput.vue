<template>
  <div class="artemis__input">
      <input :type="type" :placeholder="placeholder" :value="value">
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: {
    type: String,
    placeholder: String,
    value: String
  }

})
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";
.artemis__input {
  background: $light-400;
  border-radius: .35em;
  input {
    background: transparent;
    padding: .75em .5em;
    border: none;
    font-size: 90%;
    height: 100%;
    width: 100%;
    outline: none;
  }
}
</style>