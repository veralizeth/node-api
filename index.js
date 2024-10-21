const express = require('express');
const app = express();
const port = 3000;

// To parce incomming JSON requests. 
app.use(express.json());

// Simple route
app.get('/', (req, res) => {
    res.send("Hello World");
});


const repositories = [
    {
        "id": 1,
        "name": "frontend-project",
        "owner": "dominique-nieto",
        "description": "A frontend project built using React.js",
        "objects": [
            {
                "object_id": 101,
                "type": "file",
                "name": "index.html",
                "size_kb": 10,
                "last_modified": "2024-10-20T15:30:00Z",
                "commit_id": "abc123",
                "url": "https://api.example.com/repos/1/files/index.html"
            },
            {
                "object_id": 102,
                "type": "file",
                "name": "app.js",
                "size_kb": 25,
                "last_modified": "2024-10-20T16:00:00Z",
                "commit_id": "def456",
                "url": "https://api.example.com/repos/1/files/app.js"
            }
        ]
    },
    {
        "id": 2,
        "name": "backend-api",
        "owner": "dominique-nieto",
        "description": "A Node.js backend API for handling data",
        "objects": [
            {
                "object_id": 201,
                "type": "commit",
                "message": "Initial commit",
                "author": "dominique-nieto",
                "timestamp": "2024-09-15T10:45:00Z",
                "url": "https://api.example.com/repos/2/commits/abc789"
            },
            {
                "object_id": 202,
                "type": "file",
                "name": "server.js",
                "size_kb": 30,
                "last_modified": "2024-10-10T14:00:00Z",
                "commit_id": "ghi789",
                "url": "https://api.example.com/repos/2/files/server.js"
            }
        ]
    },
    {
        "id": 3,
        "name": "mobile-app",
        "owner": "dominique-nieto",
        "description": "A mobile application built with React Native",
        "objects": [
            {
                "object_id": 301,
                "type": "commit",
                "message": "Added authentication module",
                "author": "dominique-nieto",
                "timestamp": "2024-10-05T09:30:00Z",
                "url": "https://api.example.com/repos/3/commits/jkl123"
            },
            {
                "object_id": 302,
                "type": "file",
                "name": "AuthScreen.js",
                "size_kb": 18,
                "last_modified": "2024-10-05T09:45:00Z",
                "commit_id": "mno456",
                "url": "https://api.example.com/repos/3/files/AuthScreen.js"
            }
        ]
    }
]


app.get('/repository/:id/object/:object_id', async (req, res) => {
    try {
        const { id, object_id } = req.params;

        console.log(id, object_id);

        let repository = repositories?.find(repo => repo.id === Number(id));

        if(!repository) {
            res.status(404).send({message: 'Repository not found'}); 
        }

        let requestedObject = repository.objects.filter((obj) => obj.object_id === Number(object_id));

        if(requestedObject.length) {
            res.status(200).send(requestedObject);
        } else {
            res.status(404).send({ message: "Object not found" });
        }
    } catch (error) {
        console.error('Error retrieving', error);
        res.status(500).send({ message: 'An error occurred while retrieving the object.' });
    }
})

// Start the server
app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
})
