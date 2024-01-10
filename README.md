# Puppeteer CI Driver (Win64)
Puppeteer chrome drivers for restricted Win64 based CI environments

## Install

> Note: This library will only install in a Linux64 based system.

```bash
npm install puppeteer-ci-driver
```

The default installation location is `/driver` folder at your project root. You can set your own path using `PUPPETEER_DRIVER_PATH_WIN64` environment variable.

## Skipping the postinstall script
Set `WIN_CI_DRIVER_SKIP_SETUP` environment variable to `true`, to prevent the driver installation.