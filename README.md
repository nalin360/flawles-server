# Flawles Server

This is the backend server for the Flawles application.

## Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Set up your environment variables using `.env` file. Refer to `.env.example` for required variables.
4. Run `npm run build` to compile TypeScript to JavaScript.
5. Start the server using `npm start`.

## Scripts

- `npm run build`: Compile TypeScript to JavaScript.
- `npm start`: Start the server.
- `npm run dev`: Start the server with nodemon for development.
- `npm test`: No test specified yet.

## Dependencies

- `compression`: For compressing HTTP responses.
- `cookie-parser`: For parsing cookies.
- `cors`: For enabling CORS (Cross-Origin Resource Sharing).
- `dotenv`: For loading environment variables from a .env file.
- `express`: Web framework for Node.js.
- `mongoose`: MongoDB object modeling tool designed to work in an asynchronous environment.

## Dev Dependencies

- `@types/body-parser`: TypeScript definitions for body-parser.
- `@types/compression`: TypeScript definitions for compression.
- `@types/cookie-parser`: TypeScript definitions for cookie-parser.
- `@types/cors`: TypeScript definitions for cors.
- `@types/express`: TypeScript definitions for express.
- `ts-node`: TypeScript execution and REPL for Node.js.
- `typescript`: TypeScript language server.

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.
