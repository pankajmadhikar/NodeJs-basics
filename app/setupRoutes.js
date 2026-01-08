import { authRoutes } from "./routes/auth.routes.js";
import { urlshortnerRoutes } from "./routes/urlshortner.routes.js";
import { userRoutes } from "./routes/user.routes.js";

export const setupRoutes = (app) => {
  app.use("/api/auth", authRoutes); // auth routes
  app.use("/api/urlshortner", urlshortnerRoutes); // urlshortner routes
  app.use("/api/user", userRoutes); // user routes
};
