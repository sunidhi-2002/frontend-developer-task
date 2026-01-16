

Frontend Developer Task - School Dashboard



&nbsp;Project Overview



This is a full-stack School Dashboard project with React frontend and Node.js/Express backend.



&nbsp;Features



\* User registration and login

\* Dashboard showing user-specific data

\* Profile view and update

\* Secure backend APIs with JWT authentication



---



Technologies Used



\* Frontend: React, Tailwind CSS

\* Backend: Node.js, Express, MongoDB

\* Other Tools: Git, GitHub, VS Code, npm



---



How to Run Locally



&nbsp;1. Clone the repository



```bash

git clone https://github.com/sunidhi-2002/frontend-developer-task.git

cd frontend-developer-task

```



2\. Backend



```bash

cd backend

npm install

node index.js

```



\* Backend server will run on port 5000



&nbsp;3. Frontend



Open a new terminal and run:



```bash

cd frontend

npm install

npm start

```



\* Frontend runs on port 3000

\* Open browser at \[http://localhost:3000](http://localhost:3000)



---



Usage



1\. Register: Create a new account with username, email, and password

2\. Login: Use email and password to login

3\. Dashboard: Click "Get Dashboard" to see your dashboard message

4\. Profile: Click "Get Profile" to view your user info

5\. Logout: Click "Logout" to log out from the session



---



Backend API Endpoints



| Endpoint           | Method | Description                   | Protected |

| ------------------ | ------ | ----------------------------- | --------- |

| /api/auth/register | POST   | Register a new user           | No        |

| /api/auth/login    | POST   | Login and receive JWT token   | No        |

| /api/dashboard     | GET    | Get dashboard message         | Yes       |

| /api/users/profile | GET    | Get logged-in user profile    | Yes       |

| /api/users/profile | PUT    | Update logged-in user profile | Yes       |



Protected routes require an Authorization header with the JWT token:



```

Authorization: Bearer <your\_token\_here>

```



---



\## Notes



\* MongoDB must be running locally or via cloud (Atlas)

\* Logs appear in the backend terminal when actions are performed

\* Make sure frontend and backend ports do not conflict

\* Reviewers can test everything by following the steps above; no separate log files needed

&nbsp; ```



---



