## [18.0.1](https://github.com/benbria/react-i18n-wrapper/compare/v18.0.0...v18.0.1) (2019-07-25)


### Bug Fixes

* Correctly translate objects with empty strings as result. ([c6ee2ec](https://github.com/benbria/react-i18n-wrapper/commit/c6ee2ec))

# [18.0.0](https://github.com/benbria/react-i18n-wrapper/compare/v17.1.0...v18.0.0) (2019-03-25)


### Features

* Add `useI18n` hook. ([2117745](https://github.com/benbria/react-i18n-wrapper/commit/2117745))


### BREAKING CHANGES

* Use of hooks API requires React v16.8.0 or higher.

# [17.1.0](https://github.com/benbria/react-i18n-wrapper/compare/v17.0.2...v17.1.0) (2019-02-11)


### Bug Fixes

* code inspect change ([1264e95](https://github.com/benbria/react-i18n-wrapper/commit/1264e95))
* minor cleanup ([78702b0](https://github.com/benbria/react-i18n-wrapper/commit/78702b0))
* travis ([0e99d59](https://github.com/benbria/react-i18n-wrapper/commit/0e99d59))


### Features

* `ignoreMissing` translate option ([844cfb9](https://github.com/benbria/react-i18n-wrapper/commit/844cfb9))

## [17.0.2](https://github.com/benbria/react-i18n-wrapper/compare/v17.0.1...v17.0.2) (2018-10-22)


### Bug Fixes

* Don't build source maps. ([b0088e9](https://github.com/benbria/react-i18n-wrapper/commit/b0088e9))
* Make withI18n preserve props of wrapped component. ([6cae4f5](https://github.com/benbria/react-i18n-wrapper/commit/6cae4f5))

## [17.0.1](https://github.com/benbria/react-i18n-wrapper/compare/v17.0.0...v17.0.1) (2018-10-19)


### Bug Fixes

* Allow multiple children in I18nProvider. ([e3e7977](https://github.com/benbria/react-i18n-wrapper/commit/e3e7977))

# [17.0.0](https://github.com/benbria/react-i18n-wrapper/compare/v16.0.0...v17.0.0) (2018-10-19)

### Features

* Rewrite in typescript, update to use new React context API. ([6f3d759](https://github.com/benbria/react-i18n-wrapper/commit/6f3d759))

### BREAKING CHANGES

* Rewrite in typescript, update to use new React context API.

# v16.0.0

* Upgrade to react v16.
* `Translate` now returns bare strings instead of strings in span tags by default.
