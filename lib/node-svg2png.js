'use strict';

const path = require('path');
const Playwright = require('playwright');

function getLoaderHtmlPath() {
  const filePath = path.join(__dirname, 'loader.html');
  return `file:${filePath}`
}

function resolveSvgFilePath(filePath) {
  return `${process.cwd()}/screenshot.png`;
}

async function render(options = {}) {
  const { sourceFile } = options;
  const defaultLaunchOptions = {
    headless: false,
  };
  const browser = await Playwright.chromium.launch(defaultLaunchOptions);
  const targetUrl = getLoaderHtmlPath();
  const page = await browser.newPage();
  await page.goto(targetUrl, {
    waitUntil: 'load',
  });
  const screenshotPath = resolveSvgFilePath(sourceFile);
  await page.screenshot({
    path: screenshotPath,
    fullPage: true,
  });
  await browser.close();
}

exports.render = render;
