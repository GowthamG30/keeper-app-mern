## Notate

Note taking application. This application is built using React for the frontend and Node.js for the backend, with MongoDB Atlas serving as the database. Below are the setup instructions for running the project locally on your machine.

---

### Prerequisites

##### Node.js Installation

Ensure you have Node.js installed with version at least v20.11.0. You can download and install the latest version of Node.js from [here](https://nodejs.org/en/).

##### Database Setup

After installing Node.js and setting up `npm`, you need to set up the database.

You have two options for setting up MongoDB:

1. **MongoDB Atlas (Preferred)**:

   - Create a MongoDB Atlas account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
   - Set up a new cluster and create a database.
   - Obtain the connection string for your database.
2. **Local MongoDB**:

   - Download and install MongoDB from [here](https://www.mongodb.com/try/download/community).
   - Follow the instructions to set up a local MongoDB server.

---

### Cloning the Repository and Installing Dependencies

##### Step 1: Clone the Repository

```bash
git clone https://github.com/GowthamG30/notate-app.git
cd notate-app
```

##### Step 2: Install Dependencies

###### Backend

In the project root directory, install backend dependencies:

```bash
npm install
```

###### Frontend

Navigate to the `frontend` folder and install frontend dependencies:

```bash
cd frontend
npm install
```

##### Step 3: Setting Up Environment Variables

* In the root directory, create a file named `.env`.
* In the `.env` file, add the MongoDB Connection String as shown in the example below:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.2kecy.mongodb.net/notateDB
```

### Usage

###### Backend

Start the Node.js backend server:

```bash
npm start
```

###### Frontend

Start the React frontend application:

```bash
cd frontend
npm start
```

The backend server will run on `http://localhost:5001` and the frontend on `http://localhost:3000`.

---
