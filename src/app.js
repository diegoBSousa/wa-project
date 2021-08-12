import express from 'express';

class App {
    constructor() {
        this.server = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        /**
         * Aceita formato JSON
         */
        this.server.use(express.json());
    }

    routes() {
        //this.server.use(routes);
    }
}