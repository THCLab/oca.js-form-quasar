<template>
  <q-page class="row items-center justify-evenly">
    <test />
  </q-page>
</template>

<script lang="ts">
import { components } from 'oca.js-form-quasar'
const { Test } = components
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageIndex',
  components: { Test }
});
</script>
