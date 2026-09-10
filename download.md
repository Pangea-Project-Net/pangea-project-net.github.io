---
layout: default
title: Download the Latest Release
permalink: /download/
---

## Latest Release

Stay up to date with the latest stable release of the PangeaNet App. The app is **closed source but provided free to the public**; if you'd like to help prioritize new platform support, please consider donating and filing a feature request. If you want access to the source, join Pangea Project as an official member and volunteer, pass the background check and agree to the mission statement and legal terms for the laws that apply to you. (AKA, depending on where you live in the world)

### Current Release (Alpha v0.1.5)

- **Version:** 0.1.5
- **Release Date:** 2026-09-07
- **Status:** Alpha — for trusted testers

### Download

- **Windows (x86_64)** – [Download installer](https://pangea-project.net/download/v0.1.5/PangeaNet-Alpha-v0.1.5-combined-installer.zip)
- **macOS (Intel/Apple Silicon)** – Not available yet. If you'd like macOS support, please [open an issue](https://github.com/pangea-project-net/pangea-project-net.github.io/issues/new) and consider [donating](/donate/) to help prioritize the work.
- **Linux (x86_64)** – Version 0.1.5 Build Coming Soon

---

## Release Notes

### Overview

I'll make a full overview later.



### Highlights

- **Workspace Management Revamp:** redesigned layout system with Auto, Fresh, and Advanced modes, plus auto-save-on-logout and named layout management.
- **Window Geometry Persistence:** fixed restore ordering so main window size/position persist correctly, plus hidden settings windows no longer pollute saved sessions.
- **Display Name Bug Fix:** display names are now correctly captured during registration, editable in settings, and shown in peer lists.
- **Page Caching / Re-hosting:** completed attachment downloads for cached pages, added re-hosting advertising when peers go offline, and prevented re-hosting loops.
- **UI Polish & Packaging:** Qt dialogs moved to `.ui` files, peers window cleanup, status bar/tooltips improvements, splash screen rendering fix, and Qt image plugins included in deploy packages.
- **Relays:** For peers that have port forwarding properly setup, they can act as encrypted relays to allow other peers to join the network even when their networks don't support a direct connection.

### Known Issues

- **NAT traversal** can remain inconsistent on complex router setups.
- **Streaming** is paused pending architecture improvements, though basic functionality works.
- **UserSettingsWindow** still mixes user-scoped and device-scoped settings and is scheduled for redesign.
- This is Alpha software; expect edge-case bugs. Please report findings to the private testers channel.

---

### Need help?

If you run into issues while downloading or installing, please [open an issue](https://github.com/pangea-project-net/pangea-project-net.github.io/issues/new) and we'll help you get up and running.
