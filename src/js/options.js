import Storage from './storage'
import { FeatureTogglesStorageKey, getEnabledFeatures } from './features'

const featureToggleElements = document.getElementsByName('feature-toggle')

Storage.load(FeatureTogglesStorageKey, (fts) => {
  const featureToggles = getEnabledFeatures(fts && fts[FeatureTogglesStorageKey])

  featureToggleElements.forEach((element) => {
    // eslint-disable-next-line no-param-reassign
    element.checked = featureToggles[element.id]
  })
})

document.getElementById('save-options').addEventListener('click', () => {
  const featureToggles = {}

  featureToggleElements.forEach((element) => {
    featureToggles[element.id] = element.checked
  })

  Storage.save({ [FeatureTogglesStorageKey]: featureToggles }, () => {
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
