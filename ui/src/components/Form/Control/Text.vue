<template>
  <q-input :type="`${(!control.isPii || showPii) ? '' : 'password' }`"
            :label="translations[formMeta.language].label"
            :readonly="formMeta.readonly"
            :name="control.name"
            v-model="value"
            dense
            outlined>
    <template v-if="control.isPii" v-slot:append>
        <q-icon
          class="cursor-pointer"
          :name="`${ showPii ? 'visibility' : 'visibility_off'}`"
          @click="showPii = !showPii" />
    </template>
  </q-input>
  <slot name="information"/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'TextControl',
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
    const showPii = ref(props.formMeta.showPii)
    const value = ref()

    return {
      translations,
      showPii,
      value
    }
  }
})
</script>

<style lang="scss">
</style>
