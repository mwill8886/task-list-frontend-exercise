# Project

Write a task tracker app in React. The app can be as simple or sophisticated as you determine but must include the following functionality:

1. Add tasks

2. Mark tasks complete

3. Delete tasks

4. Set reminders

5. Authenticare a user to have user-specific tasks (can be custom or Microsoft SSO)

6. Write to a sqlite database file to store users as well as tasks (2 separate models with FK relation)

7. You choose back-end / ORM

8. Save to public GitHub repo and send link


## Frontend Setup

The client is bundled using `vite`, run the following commands from the root of the project.

First install the dependencies using
```
npm install
```

Start up a local dev instance of the project on `localhost:5173`
```
npm run dev
``` 

## Important Notes

Due to personal time constraints I was only able to build out the frontend aspects of this take home challenge and was not able to get to the backend elements including the below, but I would be willing to discuss anything around these elements that you might have questions about. 
- backend service with api
- sqlite database + user & tasks tables
- authentication system

I used a `MUI` to handle styling and just give me some prebuilt components to help speed things up and I used `redux` for state management and treated it as a datastore with the basic CRUD operations you asked for but I did not setup persistance. 