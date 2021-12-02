<template>
  <q-card class="q-pa-sm">
    <q-card-section>
      <div class="row items-center">
        <span class="text-weight-bold text-h5 col">
          {{ translations[formMeta.language]?.name }}
        </span>
        <q-select class="col-2" v-model="formMeta.language" :options="availableLanguages" label="Language" dense options-dense />
      </div>
      <div class="row">
        <span class="text-weight-light text-subtitle1 col-auto">
          {{ translations[formMeta.language]?.description }}
        </span>
      </div>
    </q-card-section>

    <q-card-section>
      <Section v-for="section in sections" :key="section.id" :section="section" :form-meta="formMeta" />
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
    readonly: {
      type: Boolean,
      required: false,
      default: false
    },
    showPii: {
      type: Boolean,
      required: false,
      default: false
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
    let language
    if (availableLanguages.includes(props.defaultLanguage)) {
      language = props.defaultLanguage
    } else if (availableLanguages.find(lang => lang.startsWith(props.defaultLanguage))) {
      language = availableLanguages.find(lang => lang.startsWith(props.defaultLanguage))
    } else {
      language = availableLanguages[0]
    }

    const formMeta = reactive({
      language,
      readonly: props.readonly,
      showPii: props.showPii
    })

    return {
      sections,
      translations,
      availableLanguages,
      formMeta
    }
  }
})
</script>

<style lang="scss">
</style>
