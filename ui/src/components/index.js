const files = require.context('.', false, /\.vue$/)

const components = {}
files.keys().forEach(key => {
  if (key.match(/^\.\//)) {
    const component = files(key).default
    components[component.name] = component
  }
})

export default components
