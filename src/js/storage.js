export default class ChromeLocalStorage {
  static save(data, callback) {
    chrome.storage.local.set(data, callback)
  }

  static load(keys, callback) {
    chrome.storage.local.get(keys, callback)
  }
}
