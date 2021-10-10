import browser from 'webextension-polyfill'
import Storage from './storage'
import { FeatureTogglesStorageKey, getEnabledFeatures } from './features'

const featureToggleElements = document.getElementsByName('feature-toggle')

async function optionsPageHandler() {
  const data = await Storage.load(FeatureTogglesStorageKey)

  const storedFeatureToggles = getEnabledFeatures(data && data[FeatureTogglesStorageKey])

  featureToggleElements.forEach((element) => {
    // eslint-disable-next-line no-param-reassign
    element.checked = storedFeatureToggles[element.id]
  })

  document.getElementById('save-options').addEventListener('click', async () => {
    const featureToggles = {}

    featureToggleElements.forEach((element) => {
      featureToggles[element.id] = element.checked
    })

    await Storage.save({ [FeatureTogglesStorageKey]: featureToggles })

    const statusElement = document.getElementById('options-status')
    const error = browser.runtime.lastError

    if (error) {
      statusElement.className = 'error'
      statusElement.innerText = error.message
    } else {
      statusElement.className = 'success'
      statusElement.innerText = 'Changes saved successfully'
    }
  })
}

optionsPageHandler()
  // eslint-disable-next-line no-console
  .catch((err) => console.error('Databricks Tweak extesion options error: ', err))
