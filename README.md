# User Git Viewer
## Application provides API that allows to retrieve user repositories and branches data. 
### For now, only github service is supported.
## Usage

Package requires [Node.js](https://nodejs.org/) v16+ to run.
Application created using [nest.js](https://nestjs.com/) and could be run locally using built-in nest server or via docker.
Cloudformation scripts provided to build infrastructure on AWS. Prerequsit for that to build and push docker image to AWS ECR.

Don't forget to provide github Personal access token in .env file

## Installation

```bash
$ npm install
```

## Running the app via built-in server

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running the app via docker

```bash
# build an image
$ docker build -t git-app .

# run container
$ docker run -p80:80 --env-file .env git-app
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
