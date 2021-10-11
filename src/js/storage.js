import browser from 'webextension-polyfill'

export default class ChromeLocalStorage {
  static async save(data) {
    return browser.storage.local.set(data)
  }

  static async load(keys) {
    return browser.storage.local.get(keys)
  }
}
