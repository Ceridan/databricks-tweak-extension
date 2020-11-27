export const FeatureTogglesStorageKey = 'featureToggles'

export const Features = Object.freeze({
  sortJobsByDesc: 'sortJobsByDesc',
  restoreFilterValue: 'restoreFilterValue',
})

export function getEnabledFeatures(overrideWith = undefined) {
  const featureToggles = Object.assign({}, ...Object.values(Features).map((ft) => ({ [ft]: true })))
  if (overrideWith) {
    Object.assign(featureToggles, overrideWith)
  }
  return featureToggles
}
