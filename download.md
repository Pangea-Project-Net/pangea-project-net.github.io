---
layout: default
title: Download the Latest Release
permalink: /download/
---

## Latest Release

Stay up to date with the latest stable release of the PangeaNet App. The app is **closed source but provided free to the public**; if you'd like to help prioritize new platform support, please consider donating and filing a feature request. If you want access to the source, join Pangea Project as an official member and volunteer, pass the background check and agree to the mission statement and legal terms for the laws that apply to you. (AKA, depending on where you live in the world)

### Current Release (Alpha v0.1.4)

- **Version:** 0.1.4
- **Release Date:** 2026-06-29
- **Status:** Alpha — for trusted testers

### Download

- **Windows (x86_64)** – [Download installer](https://pangea-project.net/download/v0.1.4/PangeaNet-Alpha-v0.1.4-combined-installer.zip)
- **macOS (Intel/Apple Silicon)** – Not available yet. If you'd like macOS support, please [open an issue](https://github.com/pangea-project-net/pangea-project-net/issues/new) and consider [donating](/donate/) to help prioritize the work.
- **Linux (x86_64)** – [Download .deb](https://pangea-project.net/download/v0.1.4/PangeaNet-0.1.4.deb)

---

## Release Notes

### Overview

Note: This release is a release of 0.1.4 from the beginning of the month. There was a major bug that prevented Admins from being created that got through the testing and since that is the only change in this version I figured a re-release would be appropriate instead of a new version.

Alpha v0.1.4 is a workspace and UI polish release with a complete page-caching and re-hosting pipeline. This version also fixes display name handling, renames Super Admin to PangeaNet Admin across the app, and expands the automated test suite to 16/16 passing targets.

### Highlights

- **Workspace Management Revamp:** redesigned layout system with Auto, Fresh, and Advanced modes, plus auto-save-on-logout and named layout management.
- **Window Geometry Persistence:** fixed restore ordering so main window size/position persist correctly, plus hidden settings windows no longer pollute saved sessions.
- **Display Name Bug Fix:** display names are now correctly captured during registration, editable in settings, and shown in peer lists.
- **Page Caching / Re-hosting:** completed attachment downloads for cached pages, added re-hosting advertising when peers go offline, and prevented re-hosting loops.
- **Role Rename:** "Super Admin" is now "PangeaNet Admin" everywhere, and admin privilege verification is corrected.
- **Test Suite Expansion:** 16 passing CTest targets with new security, core logic, and infrastructure tests; Windows test binary renaming fix included.
- **UI Polish & Packaging:** Qt dialogs moved to `.ui` files, peers window cleanup, status bar/tooltips improvements, splash screen rendering fix, and Qt image plugins included in deploy packages.

### Known Issues

- **NAT traversal** can remain inconsistent on complex router setups.
- **Streaming** is paused pending architecture improvements, though basic functionality works.
- **UserSettingsWindow** still mixes user-scoped and device-scoped settings and is scheduled for redesign.
- This is Alpha software; expect edge-case bugs. Please report findings to the private testers channel.

---

### Need help?

If you run into issues while downloading or installing, please [open an issue](https://github.com/pangea-project-net/pangea-project-net/issues/new) and we'll help you get up and running.
