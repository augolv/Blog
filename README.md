<h1 align="center" style="font-weight: bold;">Blog Fullstack 💻</h1>

<p align="center">
 <a href="#tech">Technologies</a> • 
 <a href="#started">Getting Started</a> • 
 <a href="#routes">API Endpoints</a> • 
 <a href="#screenshots">Screenshots</a> • 
 <a href="#contribute">Contribute</a>
</p>

<p align="center">
    <b>I developed this project to put into practice the theory I learned about authentication with JWT and consolidate my knowledge of front and back in a single project.</b>
</p>

<h2 id="tech">💻 Technologies</h2>

- **Backend**:
  - Node.js
  - Express
  - PostgreSQL (Neon)
  - JWT
  - Bcrypt.js
- **Frontend**:
  - React
  - Vite
  - React Router DOM
  - Axios
- **Tools**:
  - Git
  - npm

<h2 id="started">🚀 Getting Started</h2>

Here’s how to run the project locally on your machine.

<h3>Prerequisites</h3>

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Git](https://git-scm.com/)
- [Neon Account](https://neon.tech/) (for PostgreSQL database)

<h3>Cloning</h3>

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/blog-de-estudos.git
```

<h3>Config .env Variables</h3>

The project uses environment variables for configuration. Use the `.env.example` files in both `backend/` and `frontend/` as references to create your own `.env` files.

- **Backend (`backend/.env`)**:

```yaml
DB_URL=your-neon-postgresql-connection-string
JWT_SECRET=your-secret-key-for-jwt
```

- **Frontend (`frontend/.env`)**:

```yaml
VITE_API_URL=http://localhost:3000
```

1. Navigate to `backend/` and create `.env` based on `.env.example`.
2. Navigate to `frontend/` and create `.env` based on `.env.example`.

<h3>Starting the Backend</h3>

```bash
cd backend
npm install
npm start
```

The backend will run on `http://localhost:3000`.

<h3>Starting the Frontend</h3>

In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`.

<h2 id="routes">📍 API Endpoints</h2>

Below are the main routes of the API and their expected request/response bodies.

| route                          | description                                                                             |
| ------------------------------ | --------------------------------------------------------------------------------------- |
| <kbd>POST /auth/register</kbd> | registers a new user see [request details](#post-auth-register-detail)                  |
| <kbd>POST /auth/login</kbd>    | authenticates a user and returns a token see [request details](#post-auth-login-detail) |
| <kbd>GET /posts</kbd>          | retrieves all posts see [response details](#get-posts-detail)                           |
| <kbd>GET /posts/:id</kbd>      | retrieves a specific post by ID see [response details](#get-posts-id-detail)            |
| <kbd>POST /posts</kbd>         | creates a new post (protected) see [request details](#post-posts-detail)                |
| <kbd>PUT /posts/:id</kbd>      | updates an existing post (protected) see [request details](#put-posts-id-detail)        |
| <kbd>DELETE /posts/:id</kbd>   | deletes a post (protected) see [request details](#delete-posts-id-detail)               |

<h3 id="post-auth-register-detail">POST /auth/register</h3>

**REQUEST**

```json
{
  "nome": "John Doe",
  "email": "john.doe@example.com",
  "senha": "password123"
}
```

**RESPONSE**

```json
{
  "message": "User registered successfully"
}
```

<h3 id="post-auth-login-detail">POST /auth/login</h3>

**REQUEST**

```json
{
  "email": "john.doe@example.com",
  "senha": "password123"
}
```

**RESPONSE**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

<h3 id="get-posts-detail">GET /posts</h3>

**RESPONSE**

```json
[
  {
    "id": "uuid-1234",
    "titulo": "First Post",
    "conteudo": "This is the content of the first post.",
    "autor_id": "uuid-5678"
  },
  {
    "id": "uuid-5678",
    "titulo": "Second Post",
    "conteudo": "This is the content of the second post.",
    "autor_id": "uuid-5678"
  }
]
```

<h3 id="get-posts-id-detail">GET /posts/:id</h3>

**RESPONSE**

```json
{
  "id": "uuid-1234",
  "titulo": "First Post",
  "conteudo": "This is the content of the first post.",
  "autor_id": "uuid-5678"
}
```

<h3 id="post-posts-detail">POST /posts</h3>

**REQUEST** (Requires `Authorization: Bearer <token>` header)

```json
{
  "titulo": "My New Post",
  "conteudo": "This is the content of my new post."
}
```

**RESPONSE**

```json
{
  "message": "Post created successfully"
}
```

<h3 id="put-posts-id-detail">PUT /posts/:id</h3>

**REQUEST** (Requires `Authorization: Bearer <token>` header)

```json
{
  "titulo": "Updated Post",
  "conteudo": "This is the updated content of the post."
}
```

**RESPONSE**

```json
{
  "message": "Post updated successfully"
}
```

<h3 id="delete-posts-id-detail">DELETE /posts/:id</h3>

**REQUEST** (Requires `Authorization: Bearer <token>` header)

**RESPONSE**

```json
{
  "message": "Post deleted successfully"
}
```

<h2 id="screenshots">📸 Screenshots</h2>

Here are some screenshots of the blog in action (to be added after frontend completion):

- **Home Page**: _TBD_
- **Login Page**: _TBD_
- **Register Page**: _TBD_
- **Post Creation Page**: _TBD_

<h2 id="contribute">📫 Contribute</h2>

Contributions are welcome! Here’s how you can contribute to this project:

1. Clone the repository:
   ```bash
   git clone https://github.com/augolv/Blog
   ```
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) pattern for commits.
4. Open a Pull Request describing your changes, including screenshots if there are visual updates, and wait for review!

<h3>Helpful Resources</h3>

- [📝 How to Create a Pull Request](https://www.atlassian.com/git/tutorials/making-a-pull-request)
- [💾 Conventional Commits Pattern](https://www.conventionalcommits.org/en/v1.0.0/)
