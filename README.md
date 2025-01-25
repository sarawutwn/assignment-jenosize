
# Assignment Jenosize Co., LTD

This repository was created for a job interview at Jenosize Co., LTD. It uses the Node, TypeScript, Prisma, and MongoDB stack for development. The project includes a REST API for managing products and authentication with JWT for access.

# Start Project

After cloning this repository to your local machine, open the terminal and navigate to the project path. Create a .env file and enter the following information:

 ```env
SERVER_PORT=9999
SERVER_SECRET_KEY="21w09wOtlRod3boHjBTNvijQhJZYqOUgQ"
DATABASE_URL="mongodb+srv://admin:cqAABvWjSlAgoCMA@cluster0.tmztz.mongodb.net/assignment-jenosize?retryWrites=true&w=majority&appName=Cluster0"
```

Then, install the required packages by running:

```bash
npm install
npm run start
```

# Assignment 2 Script

For the second assignment, a function will be written to run a script. Therefore, it will not be accessible through the REST API.

You can view the code in the path /src/adapter/service/assignment.service.ts.

To see the performance results, use the following command to check the performance logs:

```bash
npm run assignment
```

This is an image of the test result of the program

![This is an image of the test result of the program](./assets/result-assignment-2.png)

# API Documents

http://127.0.0.1:9999/documents

![This is an image of the swagger pages.](./assets/swagger.png)