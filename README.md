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
node bin/www NODE_ENV=$env
```
