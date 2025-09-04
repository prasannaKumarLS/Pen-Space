🖊️ Pen Space – AI-Powered Notes Application

Pen Space is a full-stack notes taking application with **AI-driven summarisation, categorisation, and document extraction**.  
It enables users to create, auto-save, and chat with their notes, with seamless integration into **Appian Cloud** for database, AI, and process management.  

## API Flow

React → Express → Appian

## 🚀 Tech Stack
- **Frontend**: React, React Quill (Rich Text Editor), Tailwind CSS  
- **Backend**: Node.js, Express  
- **Core Backend**: Appian (Database, APIs, AI, Process & Data Management, Document Storage)  
- **Authentication**: JWT  


## ✨ Features
- Create notes manually or upload documents → Extract, summarise & categorise using **Appian AI**  
- Auto-save with **debounce method** into Appian Cloud DB  
- Chat interface to query your notes using **Appian AI**  
- Export notes as **PDF** (using HTML to PDF smart service)  


## 📦 Deployment Guide

To use this application, you need to deploy the **Appian application** bundled in this repo and connect it with the frontend/backend.  

### 1. Appian Deployment
1. **Execute Database Scripts**  
   - Run the provided SQL scripts in your **Appian Cloud database**.  

2. **Import Appian Package**  
   - Download the `.zip` file from this repo.  
   - Import into the **target environment** via Appian Designer.  

3. **Authentication Setup**  
   - **Option A: API Key Authentication**  
     - Create an API key in **Admin Console** and assign it to a **Service Account**.  
     - Ensure the service account is added to the **All Users** group.  
   - **Option B: Basic Authentication**  
     - Use a valid **username and password**.  
     - Grant appropriate security roles for the user.  

## ⚙️ Local Setup

1.  **Fork the repository**: Fork the codebase to your local machine.
2.  **Install Dependencies**: Navigate to the client and server directories and install the required dependencies using a package manager like npm or yarn.
3.  **Configure Environment**:
    * Create a `.env` file in the root directory.
    * Using the provided template, replace the placeholder values with your actual authentication credentials and API endpoints.
4.  **Start the Server**: Run the server to fire up the application.

## ⚙️ Environment Configuration

Create `.env` files in both **client** and **server** folders.

### Client Template
```
VITE_SERVER_URL=http://localhost:3000
```

### Server Template 

```PORT=3000

APPIAN_BASE_URL=https://<your-appian-env>.appiancloud.com/suite/webapi/

APPIAN_API_KEY=your-appian-api-key

APPIAN_USERNAME=your-appian-username

APPIAN_PASSWORD=your-appian-password

SESSION_SECRET=your-session-secret-key

JWT_SECRET=your-jwt-secret-key

CORS_ORIGIN=http://localhost:5173
```


## 📝 Usage

Once the setup is complete:

* Create an account in the Notes application.
* Log in and start using the app.
