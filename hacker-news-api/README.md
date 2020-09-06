# API Component (node/express/mongo)

### Clone the repository

1. Open your terminal and type:

```
git clone https://gitlab.com/luissanchezm86/HackerNewsServer.git
```

### Build the API image for Docker (optional)

1. Open the terminal and navigate to the `hacker-news-api` directory.
2. Build the API with `docker build -t hacker-news-api .`

### Install and run the client

1. On the `hacker-news-api` directory run the following command to install all dependencies:

```
npm install
```

2. An environment file is needed, create a `config` on the root directory

```
config/
  .env
```

3. Create a new file called `.env` where we are going to set the 2 needed environment variables
   The file should look like this:

```
DB_CONNECTION=mongodb://localhost:27017/your-mongo-db
PORT=4000
```

   Where `DB_CONNECTION` is the url of your database.

4. Now run we can the app with:

```
npm start
```

5. It will run on PORT 4000.

### Run local tests

There are a few tests availables, you can run them with the following command:

```
npm run test
```

### Tests

The tests use the following framework and libraries:

- [Mocha](https://mochajs.org/)
- [Chai](https://www.chaijs.com/)
- [Supertest](https://github.com/visionmedia/supertest)

There are 4 files with tests in total: 2 unit tests and 2 integration tests:

```
tests/
  async/ (Integration tests)
    hacker-news.job.test.js
    hits.router.test.js
  sync/ (Unit tests)
    hacker-news.router.test.js
    hits.service.test.js
```

### Availables endpoints

- GET all hits / posts / history -> http://localhost:4000/api/hits/
- GET hits by the given limit, default is 20 -> http://localhost:4000/api/hits/?limit=7
- GET a hit by the given id -> http://localhost:4000/api/hits/5f51d32d1b97f800111f6ef2
- DELETE a hit by the given id -> http://localhost:4000/api/hits/5f51d32d1b97f800111f6ef2

