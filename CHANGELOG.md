# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

# 2024-02-23

- Replaced FernMenu with FernDropdown for better accessibility and cleaner/consistent visual style. This affects the version dropdown and code sample dropdown.
- Hide Python Async example (for now) until we can provide a better selection state.
- When a language selection is changed, maintain the same visual scroll position by measuring the scroll position before and after the change.
- Added Go SDK to the code snippet language selection.

# 2024-02-22

Init changelog! 🙌

- Added line numbers to code samples.
- Added Content-Type toggle to endpoint that supports both application/json and multipart/form-data.