<template>
  <q-checkbox
    :label="translations[formMeta.language].label"
    :disable="formMeta.readonly"
    v-model="value"
    dense
    left-label />

  <slot name="information"/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CheckboxControl',
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
    const value = ref(false)

    return {
      translations,
      value
    }
  }
})
</script>

<style lang="scss">
</style>
