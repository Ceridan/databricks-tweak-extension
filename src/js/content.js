import Storage from './storage'
import { FeatureTogglesStorageKey, Features } from './features'

const featureToggles = Object.assign({}, ...Object.values(Features).map((ft) => ({ [ft]: true })))

Storage.load(FeatureTogglesStorageKey, (fts) => {
  Object.assign(featureToggles, fts)
})

let jobListFilter = ''

function sortJobsByDesc() {
  const columns = Array.from(document.querySelectorAll('a.header-cell'))
  const jobColumn = columns.filter((column) => column.innerText === 'Job ID')[0]
  jobColumn.click()
  jobColumn.click()
}

function restoreFilterValue() {
  const filter = document.getElementById('input')

  if (!filter.value && jobListFilter) {
    filter.value = jobListFilter
    filter.dispatchEvent(new Event('input', { bubbles: true }))
  }

  filter.addEventListener('input', () => {
    jobListFilter = filter.value
  })
}

function locationHashChanged() {
  if (document.location.hash.startsWith('#joblist')) {
    const timerId = setInterval(() => {
      if (document.getElementsByClassName('job-list-table')[0] !== undefined) {
        clearInterval(timerId)
        if (featureToggles[Features.restoreFilterValue]) restoreFilterValue()
        if (featureToggles[Features.sortJobsByDesc]) sortJobsByDesc()
      }
    }, 1000)
  }
}

window.addEventListener('load', locationHashChanged)
window.addEventListener('hashchange', locationHashChanged)
chrome.storage.onChanged.addListener((changes) => {
  if (changes[FeatureTogglesStorageKey] && changes[FeatureTogglesStorageKey].newValue) {
    Object.assign(FeatureTogglesStorageKey, changes[FeatureTogglesStorageKey].newValue)
  }
})
