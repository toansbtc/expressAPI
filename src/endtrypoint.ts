/**
 * Required External Modules
 */
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import YT_router from "./router/YT_router"

dotenv.config();


/**
 * App Variables
 */
const app = express();
const port = process.env.PORT != null ? process.env.PORT : 3000;

/**
 *  App Configuration
 */
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use("/Youtube", YT_router);


/**
 * Start server on port
 */
const server = app.listen(port, () => {
  console.log(`app running on port ${port}`);
})


/**
 * Server Activation
 */

/**
 * Webpack HMR Activation
 */

type ModuleId = string | number;

interface WebpackHotModule {
  hot?: {
    data: any;
    accept(
      dependencies: string[],
      callback?: (updatedDependencies: ModuleId[]) => void,
    ): void;
    accept(dependency: string, callback?: () => void): void;
    accept(errHandler?: (err: Error) => void): void;
    dispose(callback: (data: any) => void): void;
  };
}

declare const module: WebpackHotModule;

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}