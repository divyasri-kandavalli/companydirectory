# Companies Directory

A **React.js frontend** application with a **Node.js + Express + MongoDB backend** that displays a list of companies with search, filter, sorting, and pagination features.

---

## Features

- Display companies in a **card/grid layout**
- **Search** companies by name
- **Filter** by **location** and **industry**
- **Sort** by name, location, or industry (ascending/descending)
- **Pagination** with next/previous buttons using **MUI icons**
- **Loading state** with GIF
- **Error state** with retry/back option
- **No results state** with GIF and reset option
- **Responsive design** using **Tailwind CSS**
- Uniform card width and height for consistent layout

---

## Project Structure

Companies-Directory/
├─ backend/ # Node.js + Express + MongoDB API
│ ├─ index.js
│ ├─ package.json
│ └─ ...other backend files
├─ frontend/ # React.js application
│ ├─ package.json
│ ├─ src/
│ │ ├─ components/
│ │ │ ├─ CompanyList.js
│ │ │ └─ CompanyCard.js
│ │ └─ App.js
│ └─ ...other frontend files
└─ README.md


---

## Getting Started

### Backend

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file with:

MONGO_URI=your_mongodb_connection_string
PORT=5000

4. Start the backend server:

```bash
npm run dev
```

Backend runs at: http://localhost:5000

API Endpoints:

GET /api/companies → Fetch all companies

POST /api/companies → Add a new company

## Body example: 

json

{
  "name": "Frontline Edutech",
  "location": "Hyderabad",
  "industry": "Education"
}


---

### Frontend


1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the React app:

```bash
npm start
```

Frontend runs at: http://localhost:3000

---

## How It Works

Frontend fetches company data from backend using Axios

Users can:

Search by name

Filter by location or industry

Sort results ascending/descending

Navigate pages using pagination controls

Proper loading, error, and no results states enhance user experience

Tailwind CSS and Material UI icons provide a responsive and clean UI


---

## Author

Divya Kandavalli

GitHub: https://github.com/divyasri-kandavalli