<template>
  <q-input
    filled
    :label="translations[formMeta.language].label"
    v-model="value"
    :mask="format.replace(/[a-zA-Z]/g, '#')"
    :readonly="formMeta.readonly"
    dense >

    <template disable v-slot:append>
      <q-icon name="event" :class="{ 'cursor-pointer': !formMeta.readonly, 'cursor-not-allowed': formMeta.readonly }">
        <q-popup-proxy v-if="!formMeta.readonly" transition-show="scale" transition-hide="scale">
          <q-date v-model="value" :mask="format" first-day-of-week="1">
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>

  <slot name="information"/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'DateControl',
  props: {
    control: {
      type: Object,
      required: true,
      validator(value) {
        if (!value.hasOwnProperty('name')) { return false }
        if (!value.hasOwnProperty('translations')) { return false }
        return true
      }
    },
    formMeta: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const translations = JSON.parse(JSON.stringify(props.control.translations))
    const format = props.control.format || "YYYY-MM-DD"
    const value = ref()

    return {
      translations,
      format,
      value
    }
  }
})
</script>

<style lang="scss">
</style>
