<h1 align="center" style="font-weight: bold;">Blog Fullstack 💻</h1>

<p align="center">
 <a href="#tech">Technologies</a> • 
 <a href="#started">Getting Started</a> • 
 <a href="#routes">API Endpoints</a> • 
 <a href="#screenshots">Screenshots</a> • 
 <a href="#contribute">Contribute</a>
</p>

<p align="center">
    <b>This project was built to consolidate my knowledge in fullstack development, JWT authentication, and CRUD operations using PostgreSQL</b>
</p>

## <h2 id="tech">💻 Technologies</h2>

- **Backend**:

  - Node.js
  - Express
  - PostgreSQL (Neon)
  - JWT (jsonwebtoken)
  - Bcrypt.js
  - Multer + Cloudinary (profile picture upload)

- **Frontend**:

  - React
  - Vite
  - React Router
  - Axios
  - Tailwind CSS

- **Tools**:

  - Git
  - npm

## <h2 id="started">🚀 Getting Started</h2>

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Git](https://git-scm.com/)
- [Neon Database](https://neon.tech/)

### Cloning

```bash
git clone https://github.com/augolv/Blog
```

### Config .env Variables

- **Backend (`backend/.env`)**:

```env
PORT=3000
DATABASE_URL=your-neon-connection-string
JWT_SECRET=your-jwt-secret
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

- **Frontend (`frontend/.env`)**:

```env
VITE_API_URL=http://localhost:3000
```

Runs at `http://localhost:3000`

### Starting the Backend

```bash
cd backend
npm install
npm run back
```

Runs at `http://localhost:3000`

### Starting the Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs at `http://localhost:5173`

### Starting Backend and Frontend together

```bash
cd backend
npm start
```

## <h2 id="routes">📍 API Endpoints</h2>

| Method | Route              | Description                            |
| ------ | ------------------ | -------------------------------------- |
| POST   | `/auth/register`   | Register a new user                    |
| POST   | `/auth/login`      | Authenticate user and return JWT token |
| GET    | `/posts`           | Retrieve all posts (with pagination)   |
| GET    | `/posts/:id`       | Retrieve a specific post by ID         |
| POST   | `/posts`           | Create a new post (protected)          |
| PUT    | `/posts/:id`       | Update an existing post (protected)    |
| DELETE | `/posts/:id`       | Delete a post (protected)              |
| GET    | `/users/:username` | Retrieve user profile by username      |
| PUT    | `/users/:id`       | Update user profile (protected)        |

### Example Request Bodies

#### POST /auth/register

```json
{
  "username": "john",
  "email": "john@example.com",
  "password": "password123"
}
```

#### POST /auth/login

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "token": "jwt-token-example"
}
```

#### GET /posts (example response)

```json
[
  {
    "id": "uuid-123",
    "title": "First Post",
    "content": "Content of the first post",
    "status": "published",
    "author_id": "uuid-456",
    "created_at": "2024-01-01",
    "updated_at": "2024-01-02"
  }
]
```

#### POST /posts (protected)

```json
{
  "title": "My New Post",
  "content": "This is my new post content.",
  "status": "published"
}
```

#### GET /users/\:username (example response)

```json
{
  "id": "uuid-456",
  "username": "john",
  "bio": "Developer",
  "profile_picture": "https://cloudinary.com/path-to-image.jpg"
}
```

#### PUT /users/\:id (protected)

Form-Data body:

- `username`: (string)
- `bio`: (string)
- `profile_picture`: (file, optional)

## <h2 id="screenshots">📸 Screenshots</h2>

> Screenshots will be added after frontend completion.

## <h2 id="contribute">📫 Contribute</h2>

Contributions are welcome! Here’s how you can contribute:

1. Fork the repository:

```bash
git clone https://github.com/augolv/Blog
```

2. Create a new branch:

```bash
git checkout -b feature/your-feature-name
```

3. Follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for commits.
4. Open a Pull Request and wait for review!

### Helpful Resources

- [📝 How to Create a Pull Request](https://www.atlassian.com/git/tutorials/making-a-pull-request)
- [💾 Conventional Commits Pattern](https://www.conventionalcommits.org/en/v1.0.0/)
