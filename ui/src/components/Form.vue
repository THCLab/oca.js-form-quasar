<template>
  <q-card class="form">
    <q-toolbar>
      <q-toolbar-title>
        <div class="row items-center">
          <span class="text-weight-bold col">
            {{ translations[languages.selected]?.name }}
          </span>
          <q-select class="col" v-model="languages.selected" :options="languages.available" label="Language" dense options-dense />
        </div>
        <div class="row">
          <span class="text-weight-light text-subtitle1 col-auto">
            {{ translations[languages.selected]?.description }}
          </span>
        </div>
      </q-toolbar-title>
    </q-toolbar>

    <q-card-section>
      <Section v-for="section in sections" :key="section.id" :section="section" :language="languages.selected" />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from 'vue'
import { QCard } from 'quasar'
import Section from './Form/Section'

export default defineComponent({
  name: 'Form',
  components: { Section },
  props: {
    structure: {
      type: Object,
      required: true,
      validator(value) {
        if (!value.hasOwnProperty('sections')) { return false }
        if (!value.hasOwnProperty('translations')) { return false }
        return true
      }
    },
    defaultLanguage: {
      type: String,
      required: false,
      default: 'en_EN'
    }
  },
  setup(props) {
    const sections = JSON.parse(JSON.stringify(props.structure.sections))
    const translations = JSON.parse(JSON.stringify(props.structure.translations))

    const availableLanguages = Object.keys(translations)
    const languages = reactive({
      selected: availableLanguages.includes(props.defaultLanguage) ? props.defaultLanguage : availableLanguages[0],
      available: availableLanguages
    })

    return {
      sections,
      translations,
      languages
    }
  }
})
</script>

<style lang="scss">
.form {
  width: 50vw;
}
</style>
