import browser from 'webextension-polyfill'
import Storage from './storage'
import { FeatureTogglesStorageKey, Features, getEnabledFeatures } from './features'

let featureToggles
let jobListFilter
let root

function getJobsPageRoot() {
  const shadowElements = document.getElementsByTagName('databricks-jaws')
  if (shadowElements.length === 0) return undefined

  const { shadowRoot } = shadowElements[0]
  if (!shadowRoot) return undefined

  const jobsPageRoot = Array.from(shadowRoot.childNodes).find((node) => node.id === 'mfe-root')
  return jobsPageRoot
}

function sortJobsByDesc() {
  const columns = Array.from(root.querySelectorAll('a.header-cell'))
  const jobColumn = columns.find((column) => column.innerText === 'Job ID')
  jobColumn.click()
  jobColumn.click()
}

function restoreFilterValue() {
  const filter = root.querySelector('#input')

  if (filter.value && !jobListFilter) {
    jobListFilter = filter.value
  } else if (!filter.value && jobListFilter) {
    filter.value = jobListFilter
    filter.dispatchEvent(new Event('input', { bubbles: true }))
  }

  filter.addEventListener('input', () => {
    jobListFilter = filter.value
  })
}

function locationHashChanged() {
  if (document.location.hash.startsWith('#job/list')) {
    const timerId = setInterval(() => {
      root = getJobsPageRoot()

      if (root && root.querySelectorAll('a.header-cell').length > 0) {
        clearInterval(timerId)
        if (featureToggles[Features.restoreFilterValue]) restoreFilterValue()
        if (featureToggles[Features.sortJobsByDesc]) sortJobsByDesc()
      }
    }, 500)
  }
}

async function contentScriptHandler() {
  const data = await Storage.load(FeatureTogglesStorageKey)
  featureToggles = getEnabledFeatures(data && data[FeatureTogglesStorageKey])

  window.addEventListener('load', locationHashChanged)
  window.addEventListener('hashchange', locationHashChanged)
  browser.storage.onChanged.addListener((changes) => {
    if (changes[FeatureTogglesStorageKey] && changes[FeatureTogglesStorageKey].newValue) {
      Object.assign(featureToggles, changes[FeatureTogglesStorageKey].newValue)
    }
  })
}

contentScriptHandler()
  // eslint-disable-next-line no-console
  .catch((err) => console.error('Databricks Tweak extesion content error: ', err))
