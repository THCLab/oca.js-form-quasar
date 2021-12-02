<template>
  <q-select
    v-model="value"
    :class="{ 'q-field--readonly': formMeta.readonly }"
    :options="options[formMeta.language]"
    :label="translations[formMeta.language].label"
    :clearable="!formMeta.readonly"
    map-options
    emit-value
    outlined
    dense />
  <slot name="information"/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'SelectControl',
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
    const value = ref()
    const options = {}
    Object.entries(translations).map(([lang, translation]) => {
      options[lang] = props.control.entryCodes.map(code => ({
        value: code,
        label: translation.entries[code],
        disable: props.formMeta.readonly
      }))
    })

    return {
      translations,
      options,
      value
    }
  }
})
</script>

<style lang="scss">
</style>
