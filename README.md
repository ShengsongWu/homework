# Description

## Technology Architecture

This repo contains frontend and backend. The frontend was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). The backend uses [Nest](https://github.com/nestjs/nest) framework. Both parts are written in Typescript. For database, I use PostgreSQL.
The frontend listens on port 3000, the backend listens on port 8000. I use nginx to proxy the api requests. I use docker to start our apps.

## How to use

First, we can see a home page which contains a table and two buttons. The table will auto load forms data after the page is loaded. You can click the `reload` button to load forms again. Also you can click the pagination widges on the bottom right to view more forms.

We can click the `New` button on the top right to open a form builder drawer. In the drawer, there are two main fields, the form title and questions. we can click the `Add Question` button to add questin. After a question is added, we can change its type. Now we only support three types:Checkbox,Radio button,Multiple-choice dropdown. Then we should input the title. If we select a non-Checkbox type, we also need add options. These fields are all required.If we don't fill them and click the `check` icon on the right, error messages will show. After all fields are settled, we can click the `check` icon on the right to save our operation. If this question is not the first one, we can also specify the visibility. There are four dropdowns, you can decide how to use them based on you requirements. After everything is good, you can click the `submit` button on the top right of drawer. The form will be created and the drawer will be closed. The table will auto load the latest forms. When we are editing one question, other questions and the `Add Question` button will be disabled.

We can click the `edit` button to update a form. The operation is almost the same as creation.

We can click the `delete` button to delete a form.

We can click the table row to open a new page where we can view the form and do some tests. This page first show a title, then questions. We can check a checkbox or select one option from radios. Also we can test one question relies on another one. Many questions can rely on one question. Also, this dependencies can form a chain. If we cancel the topest question's visibilty, all the questions on the chain will be hidden.

### Prerequisite

When I was developing,I used these versions. But I think the latest version is also ok.

- macOS is preferred.
- Node.js v14.21.2,
- PostgreSQL 14
- Docker, Docker Desktop or Colima

### Running the app via Docker

In the project root directory, run `docker-compose up`. After the docker image has been created. Visit `http://localhost`.
The docker will create two services: PostgreSQL, and web application. The PostgreSQL listens on port 5432. The web application uses deamon process so that it can be restarted if encounters any errors.

### Running the app manually

Frontend:

```bash
# enter directory
$ cd frontend
# install dependencies
$ npm install
# development
$ npm run start
```

Backend:

```bash
# enter directory
$ cd backend
# install dependencies
$ npm install
# development
$ npm run start
```

### Test

Because of the time limitation, I only finished part of tests.

Frontend:

```bash
# unit tests.
$ npm run test

# for e2e tests. I use Cypress but it charges. So I didn't do this part.
```

Backend:

```bash
# enter directory
$ cd backend
# unit tests.
$ npm run test
# e2e tests
$ npm run test:e2e
```

### Documents

Change to backend directory, run `npm run start` and then open Browser, enter `http://localhost:8000/docs`.
You will see a swagger UI.

### Seed

For testing purpose, run `npm run start` and then open Browser, visit `http://localhost:8000/api/seed` we will create 20 sample forms for your test.

### ENV

Backend environments file located on `backend/.env`. The current env file is for development purpose. We should replace it for production deployment. When we start the application via docker, the backend load the `backend/.production_env` file. For sensitive configs, please inject them into the container environments.
If you start the application manually, you must change the `.env` file so that the database config is the same as your local machine.

### Lint

I use the default eslint from the two framework. But for frontend, I add Prettier and more rules which can be changed in package.json.

Also I use Github actions to check code styles for both frontend and backend.

### CI

I created a simple CI config which runs frontend and backend unit tests. If anyone submit a PR, these checks will run.
