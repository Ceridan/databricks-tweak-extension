import Storage from './storage'
import { FeatureTogglesStorageKey } from './features'

const featureToggleElements = document.getElementsByName('feature-toggle')

Storage.load(FeatureTogglesStorageKey, (fts) => {
  if (!fts) return

  featureToggleElements.forEach((element) => {
    if (fts[element.id] || fts[element.id] === undefined) {
      // eslint-disable-next-line no-param-reassign
      element.checked = 'checked'
    }
  })
})

document.getElementById('save-options').addEventListener('click', () => {
  const featureToggles = {}

  featureToggleElements.forEach((element) => {
    featureToggles[element.id] = !!(element.checked)
  })

  Storage.save(featureToggles, () => {
    const statusElement = document.getElementById('options-status')
    const error = chrome.runtime.lastError

    if (error) {
      statusElement.className = 'error'
      statusElement.innerText = error.message
    } else {
      statusElement.className = 'success'
      statusElement.innerText = 'Changes saved successfully'
    }
  })
})
