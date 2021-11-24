<template>
  <div>
    <component :is="`h${(section.id.match(/-/g) || []).length}`">
      {{ translations[formMeta.language]?.label }}
    </component>
    <div v-for="control in controls">
      <Control v-if="control" :key="control.name" :control="control" :form-meta="formMeta" />
      <div class="text-center" v-else>[unhandled control placeholder]</div>
    </div>
    <Section v-for="subsection in section.subsections" :key="subsection.id" :section="subsection" :form-meta="formMeta" />
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

<style lang="scss" scoped>
.h-base {
  font-size: 14px;
  font-weight: 500;
  margin: 0.3em 0;
  padding: 0.2em 0;
  line-height: 1.15em;
  border: 0;
  border-bottom: 2px dotted rgba(0, 0, 0, .3);
}

h1, h2, h3, h4, h5, h6 {
  @extend .h-base;
}

h1 {
  font-size: 22px;
  border-style: dashed;
}

h2 {
  font-size: 18px;
}
</style>
