import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/page.tsx"),
  route("login", "routes/login/page.tsx"),
] satisfies RouteConfig;
