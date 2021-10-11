# ![logo](images/logo.png) Databricks Tweak

[![chrome-web-store](https://img.shields.io/chrome-web-store/v/ildmaaenkjijfjohacihiijkhhhjehgj)][chrome-web-store]

Databricks Tweak is a Web extension to enhance [Databricks](https://databricks.com/) UI. Databricks is great platform but there are some places in the UI which can be optimized in terms of productivity. `Databricks Tweak` extension adds some features to Databricks UI which could save you time if you are working with the Databricks on the every day basis.

You may get Databricks Tweak extension from [Chrome Web Store][chrome-web-store].

## Features list

- Jobs are sorted in descending order by `Job ID` by default on the `Jobs` tab.
- Restores the filter state on `Jobs` tab when you leave it and navigate back. For example jump to some job details and navigate back via `All Jobs` link there.

You may enable or disable any feature in the extension options.

## How to build an extension

1. You need to install [npm](https://www.npmjs.com/) depenencies:

    ```bash
    npm install
    ```

2. To build an extension you need to run following command:

    ```bash
    npm run build
    ```

    The `dist` and `out` folders will be created as a result of build step. The `dist` folder contains the builded extensions. The `out` folder contains zip-archive with the extension's code.

## How to load extension to your browser

### Instructions for Google Chrome

1. Open browser and navigate to `chrome://extensions`.
2. Enable `Developer Mode` by clicking the toggle switch next to `Developer mode`.
3. Click the `Load unpacked` button and select the `dist` folder.

### Instructions for Mozilla Firefox

1. Open browser and navigate to `about:debugging#/runtime/this-firefox`.
2. Click the `Load Temporary Add-on...` button and select the `zip` file in the `out` folder.

[chrome-web-store]: https://chrome.google.com/webstore/detail/databricks-tweak/ildmaaenkjijfjohacihiijkhhhjehgj