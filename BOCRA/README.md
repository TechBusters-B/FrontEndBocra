# BOCRA

## Role Permission Matrix

| Feature                      | Citizen | Officer | Admin |
|------------------------------|:-------:|:-------:|:-----:|
| View own complaints          |    ✓    |    —    |   ✓   |
| Submit new complaint         |    ✓    |    —    |   ✓   |
| View all complaints          |    —    |    ✓    |   ✓   |
| Update complaint status      |    —    |    ✓    |   ✓   |
| Assign complaint to officer  |    —    |    ✓    |   ✓   |
| View own license apps        |    ✓    |    —    |   ✓   |
| Submit license application   |    ✓    |    —    |   ✓   |
| View all license apps        |    —    |    ✓    |   ✓   |
| Approve / Reject license     |    —    |    ✓    |   ✓   |
| Analytics dashboard          |    —    |    ✓    |   ✓   |
| Activity feed                |    —    |    ✓    |   ✓   |
| User management              |    —    |    —    |   ✓   |
| System settings              |    ✓    |    ✓    |   ✓   |

---

## REST API Contract

| Method | Endpoint                        | Role Access      | Description                        |
|--------|---------------------------------|------------------|------------------------------------|
| GET    | /api/complaints/                | All              | List complaints (filtered)         |
| POST   | /api/complaints/                | Citizen, Admin   | Submit new complaint               |
| GET    | /api/complaints/:id/            | All              | Get complaint detail               |
| PATCH  | /api/complaints/:id/            | Officer, Admin   | Update status / assignment         |
| POST   | /api/complaints/:id/attachments/| Citizen          | Upload attachment                  |
| GET    | /api/licenses/                  | All              | List license applications          |
| POST   | /api/licenses/                  | Citizen, Admin   | Submit license application         |
| GET    | /api/licenses/:id/              | All              | Get license detail                 |
| PATCH  | /api/licenses/:id/              | Officer, Admin   | Review / approve / reject          |
| GET    | /api/dashboard/stats/           | Officer, Admin   | KPI stats for dashboard            |
| GET    | /api/dashboard/activity/        | Officer, Admin   | Activity feed                      |
| GET    | /api/users/                     | Admin            | List users                         |
| POST   | /api/users/                     | Admin            | Create user                        |
| PATCH  | /api/users/:id/                 | Admin            | Update / disable user              |
| POST   | /api/auth/login/                | Public           | Obtain JWT token                   |
| POST   | /api/auth/refresh/              | Public           | Refresh JWT                        |

---

## Tech Stack

| Layer         | Technology                            |
|---------------|---------------------------------------|
| Frontend      | React 18 (functional + hooks)         |
| Routing       | React Router v6                       |
| State         | Context API + useReducer              |
| HTTP Client   | Axios with interceptors               |
| Charts        | Recharts (BarChart, PieChart, etc.)   |
| Styling       | CSS Variables + Tailwind CSS          |
| Build Tool    | Vite                                  |
| Font Stack    | Fraunces (display) + Instrument Sans  |
| Type Safety   | PropTypes / JSDoc (upgrade to TS)     |

---

## Environment Variables (.env)
```
VITE_API_URL=http://localhost:8000/api
VITE_APP_TITLE=BOCRA
VITE_MAX_UPLOAD_MB=10
VITE_SESSION_TIMEOUT_MINUTES=60
```
