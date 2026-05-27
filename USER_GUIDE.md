---
layout: default
title: User Guide
permalink: /user-guide/
---

# PangeaNet — Starter Guide

**Version:** 0.1.3 Alpha | **Last Updated:** May 2026

Welcome to PangeaNet! This guide walks you through every feature available right now, from creating your account to sharing pages and participating in communities.

---

## Table of Contents

1. [Getting Started — Registration & Login](#1-getting-started--registration--login)
2. [The Main Window](#2-the-main-window)
3. [Pages — Your Personal Documents](#3-pages--your-personal-documents)
4. [Communities — Groups & Collaboration](#4-communities--groups--collaboration)
5. [Peers — Your Network](#5-peers--your-network)
6. [Following & Favorites](#6-following--favorites)
7. [Sharing Pages](#7-sharing-pages)
8. [User Settings](#8-user-settings)
9. [Updates](#9-updates)
10. [Tips & Troubleshooting](#10-tips--troubleshooting)

---

## 1. Getting Started — Registration & Login

### First Launch

When you open PangeaNet for the first time, you'll be greeted by the Welcome screen and then taken to the **Login** dialog.

If you don't have an account yet, click **Create Account** to create one.

### Creating an Account

![Screenshot: Registration dialog with username, display name, and password fields](/images/screenshots/02-registration-dialog.png)

1. Enter a **username** — this is your permanent identifier on the network.
2. Enter a **display name** — the friendly name others will see.
3. Create a **password** — this protects your account on this device.
4. Click **Create Account**.

PangeaNet generates a cryptographic identity for you behind the scenes. Your account is saved locally and recorded on the network's blockchain so it's recognized everywhere you log in.

> **Tip:** Choose a username you're happy with — it becomes part of your identity on the network and is harder to change later.

### Logging In

![Screenshot: Login dialog showing username and password fields](/images/screenshots/03-login-dialog.png)

Enter your username and password, then click **Login**. If you've logged in before, PangeaNet may offer auto-login so you jump straight to the main window.

### Logging Out

Click the **Logout** button at any time from the main window header. This ends your session and disconnects from the network. Your data stays on the device and will be ready when you log back in.

---

## 2. The Main Window

After logging in you'll see the **main tile window** — a row of large buttons (tiles) that each open a feature area:

![Screenshot: Main tile window showing all feature tiles and the header bar](/images/screenshots/04-main-window.png)

| Tile | What It Opens |
|---|---|
| **Pages Manager** | Your personal pages |
| **Communities** | Groups and shared spaces |
| **Peers** | People connected to you on the network |
| **Streaming** | Live streaming *(basic — improvements coming)* |
| **Settings** | Your account and device preferences |
| **Cached Pages** | The Pages from users that you are re-hosting |

At the top of the window you'll also find:
- **Logout** — logs you out of the application and brings up the login screen - 
- **Debug toggle** — reveals a diagnostic log panel for troubleshooting

The application also lives in your **system tray** (bottom-right taskbar area on Windows). You can minimize to tray and restore from there. Right-clicking the tray icon gives quick shortcuts including workspace layout management.

![Screenshot: System tray icon right-click menu showing layout shortcuts](/images/screenshots/05-system-tray-menu.png)

---

## 3. Pages — Your Personal Documents

Pages are PangeaNet's rich-text documents. Think of them like personal blog posts, notes, or wiki articles that you can share directly with others on the network.

### Opening the Pages Window

Click the **Pages Manager** tile on the main window.

![Screenshot: Pages window with the page list on the left and editor on the right](/images/screenshots/06-pages-window.png)

### Creating a Page

1. Click **New Page** (or **File > New Page**).
2. Give your page a title in the Title field.
3. Write your content in the editor below. The editor supports:
   - Custom Fonts and Size, Text color and background color
   - Text aligning, left center or right aligned
   - **Bold**, *italic*, underline, strikethrough
   - Headings and paragraph styles
   - Numbered and bulleted lists
   - Hyperlinks (including links to other PangeaNet pages)
   - Embedded images and video
   - Spell checking with red-underline suggestions (right-click a word for correction options)



### Saving a Page

- Press **Ctrl+S** to save at any time.
- Pages with unsaved changes show an indicator in the title bar.
- Pages auto-save once a minute as you type and five seconds after you stop typing.

### Finding Text

Press **Ctrl+F** to open a search bar within the page editor and jump to matching text.

### Organizing Pages

All your pages are listed in the left panel of the Pages Window. Click any page in the list to open it. You can adjust page permissions from the right-click menu.


### Importing & Exporting Pages

Use **File > Export** and **File > Import** to save pages to or load pages from files on your computer. This is useful for backing up your work or migrating pages from an older account.

### Pages Are Per-User

Each logged-in account has its own separate set of pages. Switching users shows only that user's pages.

---

## 4. Communities — Groups & Collaboration

Communities are groups organized around shared interests, projects, or topics. Any user can create one; members can share pages within it according to roles and permissions.

### Opening Communities

Communities are accessible through the **Communities** section inside the Pages window, or via a dedicated Communities tile if it appears in your layout.

![Screenshot: Communities list showing existing communities with Create Community button](/images/screenshots/09-communities-list.png)

### Creating a Community

Creating a community is reserved for PangeaNet Admins for the time being, we may open this up eventually but for now we don't have enough traffic to warrant community creation by non Admins.

### Joining a Community

Public communities appear in the community list. Click **Join** to become a member. For private communities, you'll need an invitation from a moderator or the creator.

### Community Roles

| Role | What They Can Do |
|---|---|
| **Creator** | Full control — settings, members, pages, deletion |
| **Moderator** | Manage members, create/edit community pages, moderate content |
| **Verified Member** | Read and contribute to community pages |
| **Public User** | View public content only |

### Community Pages

Communities have their own set of shared pages. Moderators and the creator can add, edit, and delete community pages. Members can view and (with permission) contribute.

To sync pages from peers in the community, click **Sync from Peers** in the community's page list.

![Screenshot: Community detail view showing the member list, role badges, and community pages](/images/screenshots/11-community-detail.png)

### Leaving a Community

Open the community details and click **Leave**. Your membership is removed and the action is recorded.

### Editing or Archiving a Community

Creators can edit the community name, description, and settings at any time. Communities can also be **Archived** (hidden from active lists but preserved) or **Deleted** (removed permanently).

---

## 5. Peers — Your Network

The **Peers** window shows everyone currently connected to you on the PangeaNet network.

### Viewing Connected Peers

Click the **Peers** tile. You'll see a list of connected users, their display names, and their connection status.

![Screenshot: Peers window showing a list of connected users with Follow and page-view buttons](/images/screenshots/12-peers-window.png)

### Viewing a Peer's Pages

Click on a peer in the list to see their shared pages. You can open and read any page they make available, and request content directly from their device.

### How You Connect to Peers

PangeaNet handles connections automatically:

- **Same local network (home/office Wi-Fi)**: Peers on the same network discover each other in seconds without any setup.
- **Different networks (internet)**: PangeaNet registers with a discovery server to help you find peers across the internet. Connection is usually automatic.
- **Peer-to-peer mesh**: The more peers you connect to, the more your device participates in the mesh and learns about others.

You don't need to configure anything. Just open the app and peers will appear as they connect.

> **Note:** Direct connections depend on your network setup. If you're behind a restrictive corporate firewall or certain mobile networks, connection may be less reliable. PangeaNet will automatically try relay fallback options.

---

## 6. Following & Favorites

### Following a Peer

In the Peers window, click **Follow** next to any user. Following records that connection on the blockchain, so your social graph travels with you across devices.

![Screenshot: Peers window with the Follow button highlighted next to a user entry](/images/screenshots/13-follow-button.png)

To unfollow, click **Unfollow** on the same user.

### Favoriting a Page

When viewing a peer's page, click the **Favorite** button (star icon). This:

![Screenshot: Page viewer dialog open with the Favorite (star) button visible in the toolbar](/images/screenshots/14-favorite-button.png)

1. Bookmarks the page for quick access.
2. Downloads a local copy of the page content.
3. Makes your device a re-hosting point for that page — if the original author is offline, other peers can still fetch the page from you.

To unfavorite, click the star again to remove it.

### Viewing Your Follows and Favorites

Your follows and favorites are accessible from the Peers and Pages windows respectively. They persist across sessions and devices because they're stored on the blockchain.

---

## 7. Sharing Pages

### Getting a Share Link

In the Pages window, open any page you've authored. Click **Copy Link** (or the share button). This copies a short **PN-PAGE code** to your clipboard — `PN-PAGE:*A hashed version of*username/page-title/pageId`.

![Screenshot: Pages window with the Copy Link button highlighted in the toolbar](/images/screenshots/15-copy-link-button.png)

Share this code with anyone on PangeaNet.

### Opening a Shared Link

![Screenshot: Open Link dialog with a PN-PAGE code pasted into the input field](/images/screenshots/16-open-link-dialog.png)

1. Click **Open Link** (or **File > Open Link**) in the Pages window.
2. Paste the PN-PAGE code.
3. PangeaNet requests the page content directly from the author (if they're online) or from any peer who has cached it.

### Links in Page Content

You can paste a PN-PAGE link directly into a page's rich-text editor. It becomes a clickable link — readers can click it to open that page without leaving the editor.

### Images and Video in Shared Pages

When you share a page that contains images or video, the files are transferred alongside the page content using PangeaNet's chunked file transfer system. Viewers see a placeholder while the files download, which automatically swaps in the real content once the transfer completes.

![Screenshot: Page displayed with a download-progress placeholder where an image is still loading](/images/screenshots/17-image-loading-placeholder.png)

---

## 8. User Settings

Click the **Settings** tile to open your settings.


### Account

- **Display Name**: The friendly name shown to other users. You can update it here.

### Device Settings

These settings apply to this machine only:
- **Auto-discovery**: Controls how often your app checks for new peers.
- **Shared files directory**: Where PangeaNet looks for files you want to make available.
- **Cache limit**: How much disk space the content re-hosting cache can use (default: 100 MB).

> **Note:** The Settings window is being improved in an upcoming update. A few legacy options visible now are being replaced with a cleaner layout.

### Workspace Layouts

PangeaNet remembers the arrangement of your windows. You can:
- **Save** the current window layout by name.
- **Load** a saved layout to restore a previous arrangement.
- **Manage** layouts from the system tray icon's right-click menu.

A "Default" layout is created automatically on first run to preserve your window positions.

---

## 9. Updates

PangeaNet updates itself through the peer network — Go to the Auto-Updates section of the settings screen to initiate a download of the latest version of PangeaNet.

### How It Works

When a new version is released, peers who already have it will announce the update to their connections. Your app downloads only the changed files in the background.

### Update Indicators


- **"Downloading X%"**: The update is transferring in the background.
- **"Ready to Install"**: Download complete — click to apply.

### Installing an Update

Click **Install Update** when the download completes. The app will close, apply the update, and reopen. The process takes only a few seconds.

### Sharing Updates

You can help other users update faster by enabling **Share Updates** in the update control area. This lets your device serve update files to peers who haven't received them yet.

---

## 10. Tips & Troubleshooting

### "I can't see any peers"

- Give it 30–60 seconds. Discovery takes a moment, especially over the internet.
- Make sure you're logged in — discovery only works with an active session.
- If you're on a corporate or heavily restricted network, some connection modes may not work. Try a different network if possible.

### "A peer's page isn't loading"

- The peer may be offline. If you or someone else has favorited the page, a cached copy may be available.
- Try clicking **Sync from Peers** in the community page list if it's a community page.


### Debug Console

If you're helping report an issue, click the **debug toggle** button in the main window header. This opens the Debug Console panel, which shows a live log of what the application is doing. You can share a log file from `logs/` in the application folder.

For ease of use you can also check the share with the support team option. Which will allow system Admins to download your logs as needed, soon I'll have direct messaging in place and we can initiate a more live support chat system for any online Admin or other support users.


---

## What's Coming Next

PangeaNet is actively developed. Features in progress include:


- **Encrypted Direct Messaging**: Secure messaging for users to talk to each other directly.
- **Streaming improvements**: The current basic streaming is being reworked for better performance and quality.

Check the release notes for details on what's been added in each version.

---

*Thanks for being an early tester of PangeaNet. Your feedback drives what gets built next.*
