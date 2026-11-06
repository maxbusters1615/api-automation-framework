--API TEST FRAMEWORK (part 1 only)--
Take-home assignment · Middle / Senior QA Automation Engineer

--Stack--
Test runner: Jest
HTTP client: Axios
Data utilities: Lodash
Test data generation: @faker-js/faker
Schema validation: AJV + ajv-formats
Schema files: js-yaml (YAML format)
Config: dotenv

--Public Services--
jsonplaceholder.typicode.com — REST API target for posts
dummyjson.com — auth simulation, users, pagination

1. Install
npm install

2. Add .env file with secrets (one-time link was sent into email)

3. Run all tests
npm run test
