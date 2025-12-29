# Pastebin Lite

Pastebin Lite is a minimal Pastebin-like web application that allows users to create, share, and automatically expire text pastes based on time or view limits.

<!-- <img width="1510" height="1149" alt="image" src="https://github.com/user-attachments/assets/3a4894db-1be8-479b-8e63-806cdec48e1d" />
: Main UI -->

## Features

- Create text pastes with a unique shareable URL
- Optional time-based expiry (configured in minutes)
- Optional maximum view count per paste
- Automatic unavailability when either expiry or view limit is reached
- Dedicated HTML view for each paste
- Health check endpoint to verify application and database status
- Professional dark-themed UI optimized for code and text sharing

<!-- <img width="1239" height="987" alt="image" src="https://github.com/user-attachments/assets/98db31bb-e528-4927-9d1b-c631109f8db6" />
: Paste created + link -->
<!-- <img width="871" height="836" alt="image" src="https://github.com/user-attachments/assets/b2991596-eb5e-4006-86a9-3cab149adb61" />
: 404 for expired/overused paste -->
<!-- <img width="989" height="797" alt="image" src="https://github.com/user-attachments/assets/7d8bccda-3751-4c74-895d-6d913dd1c113" />
: /api/health JSON -->

---

## Live Demo

🔗 **Deployed URL**: [https://pastebin-lite-1-pqp4rxsbx-arvindsinghq05-8226s-projects.vercel.app/](https://pastebin-lite-1-pqp4rxsbx-arvindsinghq05-8226s-projects.vercel.app/)

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

## API Design

### Health Check

Checks if the application and database are reachable.

