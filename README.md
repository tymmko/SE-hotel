# 🏨 Hotel Management System – BIE-SWI Project

Welcome to the Hotel Management System 📮 developed as part of the BIE-SWI course. This full-stack project manages hotel room bookings, guests, bills, and staff actions with both a modern frontend and structured backend.

---

## 📆 Live Deployment

The project is deployed and available at:

👉 **[https://hotel-frontend.up.railway.app/rooms](https://hotel-frontend.up.railway.app/rooms)**

To test the application, you can use the following credentials:

* **Username**: `admintest`
* **Password**: `password`

---

## 📆 Tech Stack

* **Frontend**: React + Redux Toolkit + TypeScript
* **Backend**: Node.js + Express
* **Database**: PostgreSQL (via Railway)
* **CI/CD**: GitLab CI/CD
* **Docs**: Auto-generated with TypeDoc + GitLab Pages
* **Deployment**: 🚀 Railway (frontend and backend)

---

## ⚙️ CI/CD Pipeline (`.gitlab-ci.yml`)

Our GitLab pipeline is organized into the following stages:

| Stage        | Description                                                                                              |
| ------------ | -------------------------------------------------------------------------------------------------------- |
| 🧱 `install` | Installs backend and frontend dependencies                                                               |
| 🚪 `test`    | Runs frontend tests using Jest                                                                           |
| 📚 `docs`    | Generates TypeScript documentation using [TypeDoc](https://typedoc.org) and publishes it via GitLab Wiki |
| 🔨 `build`   | Builds the production frontend and prepares backend                                                      |
| 📦 `package` | Packages the backend and frontend into a downloadable zip                                                |
| 🚀 `release` | Publishes a GitLab release when a Git tag (e.g., `v1.0.0`) is pushed                                     |
| 🌐 `deploy`  | Deploys to Railway automatically from the `dev` branch                                                   |

---

## 🧾️ Documentation

The frontend logic and backend documentation is automatically generated and published here:

👉 [**GitLab Wiki**](https://gitlab.fit.cvut.cz/diazgand/bie-swi-hotel/-/wikis/home)

---

## 🛠️ Running Locally

```bash
# Backend
cd application/backend
npm install
npm run dev

# Frontend
cd application/frontend
npm install
npm start
```

---

## ℹ️  More Information

You can find detailed installation, setup instructions, and documentation in the 👉 [**project wiki**](https://gitlab.fit.cvut.cz/diazgand/bie-swi-hotel/-/wikis/home).

