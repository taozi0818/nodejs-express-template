# Template for Node.js Application

## Desc

This is a template based on Express framework for Node.js application.

You can use it to set up a application quickly and conveniently.

## Overview

- Version: Node.js 8 + 

- Grammar: ES6

- Framework: Express

- ORM: Sequelize (Use PostgreSQL DB in Template)

- Code linting tool: Eslint

## Structure

```
├── api
│   ├── controllers # your all Controllers, name them with XxxController.js.
│   ├── models # your all data models.
│   ├── routers # your all router files.
│   └── services # your all serivces, name them with XxxService.js.
├── bin # some execute scripts and index file for projects.
├── config # all config files.
├── db
│   └── migrations # save files for your all database migrations. It's recommanded that name them with date.
├── middlewares # all middlewares.
└── util # some util for your projects.

```

## Usage

### Install dependencies

```bash
npm install
```

### Start up

- With pm2. Make sure you have installed `pm2` globally already. Server will startup with `production` environment.

```bash
pm2 start ecosystem.json
```

- Without pm2

```bash
NODE_ENV=$env node bin/www
```

## CHANGE LOG

[CHANGE LOG](https://github.com/taozi0818/nodejs-express-template/blob/master/CHANGELOG.md)
