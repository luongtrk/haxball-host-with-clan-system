# ⚽ Haxball Host With Clan System

![status](https://img.shields.io/badge/status-active-green)
## ⚙️ System Overview

This project is a heavily customized Haxball room server built on top of an original base (inspired by shelld3v), redesigned into a full-featured competitive system with Elo ranking, Clan-style matches, advanced Anti-CB physics, anti-toxic moderation, and dynamic match events.

## 🎮 Core Game Modes
- **Pick Mode:** Captain-based selection system with smart fail-safes (auto-skip AFK, punish leavers).
- **Random Mode:** Auto-balance teams based on player stats.
- **Penalty Shootout System:** Auto-transitions to a penalty map for tie-breakers.

## 🧠 Match System
- **Advanced Anti-CB (Anti-Defender) System:** Dynamic invisible walls prevent teams from parking the bus (auto-adapts to player radius).
- **AFK Detection:** Auto-moves inactive players to spectators (disabled in 1v1/Training).
- **Substitution System (!sub):** Live player replacements during matches.
- **Auto Restart:** Seamless transition between matches.

## 🏆 Rating & Clan System
- **Stats Tracking:** Goals, Assists, Touches, Clean sheets, and Own goals.
- **Elo System:** Performance-based point calculation and ranking titles.
- **Clan System:** Create clans, assign roles, custom tags/icons.
- **Clan Derby:** Automatically detects and triggers special themes when two rival clans face off.

## 🎆 Visual & Effects
- **VIP Goal Celebrations:** 14+ dynamic physics-based effects upon scoring (Tornado, Black Hole, Meteor Shower, Firework, Machine Gun, etc.) unlocked via player Stars.
- **RGB Kit System:** Dynamic color-changing kits during special matches.
- **Emoji Avatars:** Interactive avatars during match events (countdown, bombs, sleeping).

## 🛡️ Moderation & Admin System
- **Admin/Super Admin:** Secure login via Auth strings or passwords.
- **Anti-Toxic System:** Bad word filtering with warnings and Auto-Mute (10 mins) for repeat offenders.
- **VoteKick System:** Community-driven votekick with anti-abuse limits.
- **Leaver Punishment:** Players dodging Captain duty by leaving early lose pick priority.
- **Multi-Tab Friendly:** Allows users to play with multiple tabs safely.

## 📊 Commentary System
- Live goal commentary (e.g., Tap-in, Longshot, Speed of light).
- Score-based announcements (Double Kill, Hattrick, Poker).
- Penalty shootout feedback.

## 📡 Discord Integration
- **Match Logs:** Sends final match results and MVPs to Discord.
- **Chat Logs:** Real-time chat tracking.
- **Report System:** Players can report abusers directly to a Discord webhook.

## 🏟️ Custom Stadiums
- **5v5 Map:** Main competitive stadium with rounded corners and Anti-CB support.
- **3v3 Map:** For medium lobbies.
- **1v1 / 2v2 Map:** Optimized for small lobbies.
- **Penalty Map:** Exclusive for shootouts.
- **Training Map:** Infinite time, no lock, practice freely.
- 1v1 / 2v2 maps
