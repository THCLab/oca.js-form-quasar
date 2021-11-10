<template>
  <q-card class="test-class">
    <q-toolbar>
      <q-toolbar-title>
        <span class="text-weight-bold">Header</span>
      </q-toolbar-title>
      <q-btn flat round dense icon="close" v-close-popup />
    </q-toolbar>

    <q-card-section>
      Test
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="Close" color="primary" v-close-popup />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { QCard } from 'quasar'

export default defineComponent({
  name: 'Test'
})
</script>

<style lang="scss">
.test-class {
  width: 20vw;
}
</style>
