<template>
  <div>
    {{ translations[formMeta.language]?.label }}
    <hr/>
    <div v-for="control in controls">
      <Control v-if="control" :key="control.name" :control="control" :form-meta="formMeta" />
      <div class="text-center" v-else>[unhandled control placeholder]</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Control from './Control.vue'

export default defineComponent({
  name: 'Section',
  components: { Control },
  props: {
    section: {
      type: Object,
      required: true,
      validator(value) {
        if (!value.hasOwnProperty('id')) { return false }
        if (!value.hasOwnProperty('controls')) { return false }
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
    const controls = JSON.parse(JSON.stringify(props.section.controls)),
    const translations = JSON.parse(JSON.stringify(props.section.translations))

    return {
      controls,
      translations
    }
  }
})
</script>

<style lang="scss">
</style>
