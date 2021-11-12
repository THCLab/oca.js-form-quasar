<template>
  <div class="controlItem">
    <component :is="`${control.type}Control`" :control="control" :formMeta="formMeta">
      <template v-slot:information>
        <div class="information">
          {{ translations[formMeta.language].information }}
        </div>
      </template>
    </component>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  CheckboxControl,
  DateControl,
  NumberControl,
  SelectControl,
  SelectMultipleControl,
  TextControl
} from './Control/index'

export default defineComponent({
  name: 'Control',
  components: {
    CheckboxControl,
    DateControl,
    NumberControl,
    SelectControl,
    SelectMultipleControl,
    TextControl
  },
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

    return {
      translations
    }
  }
})
</script>

<style lang="scss">
  .controlItem {
    padding: 5px 0 5px 0;
  }

  .information {
    text-align: justify;
    font-style: italic;
    color: #6a6a6a;
  }
</style>
