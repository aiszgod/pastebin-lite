# Pastebin Lite

Pastebin Lite is a minimal Pastebin-like web application that allows users to create, share, and automatically expire text pastes based on time or view limits.

<!-- <img width="1291" height="1073" alt="image" src="https://github.com/user-attachments/assets/ac01c0f1-fe9c-4c31-a4c8-4c4ba5cb00aa" />
: Main UI -->

## Features

- Create text pastes with a unique shareable URL.
- Optional time-based expiry (configured in minutes).
- Optional maximum view count per paste.
- Automatic unavailability when either expiry or view limit is reached.
- Dedicated HTML view for each paste.
- Health check endpoint to verify application and database status.
- Professional dark-themed UI optimized for code and text sharing.

<!-- <img width="1443" height="1077" alt="image" src="https://github.com/user-attachments/assets/36c83b3c-515b-422b-ba4b-2f3a10f01a60" />
-->
<!-- <img width="1103" height="1062" alt="image" src="https://github.com/user-attachments/assets/e4e70875-b28a-4a1f-a581-874273a5e707" />
 -->
<!-- <img width="1053" height="852" alt="image" src="https://github.com/user-attachments/assets/b7f49516-d4e2-4dd4-877b-b066dc9b6d67" />
: /api/health JSON -->

---

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: JavaScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB Atlas (M0 Free Tier)
- **Deployment**: Vercel
- **ID Generation**: `nanoid`
- **ODM**: Mongoose

---

## Live Demo

- **Deployed URL**: `[https://your-app-name.vercel.app](https://pastebin-lite-1-pqp4rxsbx-arvindsinghq05-8226s-projects.vercel.app/)`




