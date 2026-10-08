---
layout: default
title: Download the Latest Release
permalink: /download/
---

## Latest Release

Stay up to date with the latest stable release of the PangeaNet App. The app is **closed source but provided free to the public**; if you'd like to help prioritize new platform support, please consider donating and filing a feature request. If you want access to the source, join Pangea Project as an official member and volunteer, pass the background check and agree to the mission statement and legal terms for the laws that apply to you. (AKA, depending on where you live in the world)

### Current Release (Alpha v0.1.6)

- **Version:** 0.1.6
- **Release Date:** 2026-10-08
- **Status:** Alpha — for trusted testers

### Download

- **Windows (x86_64)** – [Download installer](https://pangea-project.net/download/v0.1.6/PangeaNet-Alpha-v0.1.6-combined-installer.zip)
- **macOS (Intel/Apple Silicon)** – Not available yet. If you'd like macOS support, please [open an issue](https://github.com/pangea-project-net/pangea-project-net.github.io/issues/new) and consider [donating](/donate/) to help prioritize the work.
- **Linux (x86_64)** – Not available yet. Please [open an issue](https://github.com/pangea-project-net/pangea-project-net.github.io/issues/new) if you'd like to help prioritize Linux support.

---

## Release Notes

### v0.1.6 — Governance and usability

This governance-focused release adds proposals for global and community rules, direct and representative voting, multi-step delegation, and voting history. It also improves window navigation, About information, discovery-registration recovery, and the ability to run Debug and Release builds side by side.

#### Highlights

- **Rules proposals and voting:** eligible Admins and community moderators can propose rules revisions with configurable durations and passing thresholds. Direct ballots can be private or public with a statement; representative ballots are public and require reasoning.
- **Representative delegation:** select a representative by scope, form multi-step delegation chains, and review represented users. Cycle prevention and proposal-specific protections prevent duplicate vote weight.
- **Voting workspace:** review open proposals, rules, and voting history in the new Votes tile, with pending-vote badges and system-tray notifications.
- **Improved navigation and discovery:** feature tiles bring existing windows forward, and the client can recover a missing discovery registration after a successful check.
- **Debug/Release isolation and login reliability:** the two build tracks can run side by side with separate local resources, and remembered login no longer requires opening Admin first.

**Governance is an alpha feature.** Automated coverage is in place, but live multi-device validation remains pending. Private ballots are hidden from public observers, but are not fully anonymous from the proposal author, who can decrypt them to finalize the tally. Keep the proposal author online through voting close while testing.

### Previous Release: v0.1.5 — Connectivity and stability

The previous release added relay-assisted connectivity and fully automatic updates, and focused on reliability across the peer network and community collaboration.

#### Highlights

- **Relay-assisted connections:** peers behind restrictive firewalls or routers can connect through a relay when direct connections fail; NAT traversal may still be inconsistent on some networks.
- **Automatic updates:** update detection, download, and restart can proceed without manual click-through.
- **Community access and sync:** improved permissions, purging of cached pages when access is lost, synchronized role changes, and an opt-in community-page auto-sync control.
- **Blockchain sync and stability:** deterministic genesis, chain-gap detection, validator synchronization, and fixes for a recurring UI freeze.
- **Pages editor improvements:** smoother page opening, a manual refresh control for downloaded content, and fixes for formatting and loading issues.

### Known Limitations

- NAT traversal can still be inconsistent on complex networks.
- Streaming remains paused pending performance and architecture improvements.
- This is Alpha software; expect edge-case bugs. Please report findings to the private testers channel.

---

### Need help?

If you run into issues while downloading or installing, please [open an issue](https://github.com/pangea-project-net/pangea-project-net.github.io/issues/new) and we'll help you get up and running.
