# Databricks Tweak Extension overview

Google Chrome extension to enhance [Databricks](https://databricks.com/) UI. Databricks provides very powerful data analytics platform. It is great but there are some places in the UI which can be optimized. Current extension will add some minor features to Databricks UI which could save you time if you are working with the Databricks every day.

## Features list

- Jobs are sorted in descending order by `Job ID` by default on the `Jobs` tab.

## How to build an extension

1. You need to install [npm](https://www.npmjs.com/) depenencies:

    ```bash
    npm install
    ```

2. To build an extension you need to run following command:

    ```bash
    npm run build
    ```

    The `dist` folder will be created as a result of build step.

## How to load extension to your browser

Currently tested with Google Chrome, but possible should work with other browsers.

Instructions for Google Chrome:

1. Open browser and navigate to `chrome://extensions`.
2. Enable `Developer Mode` by clicking the toggle switch next to `Developer mode`.
3. Click the `Load unpacked` button and select the `dist` folder.
