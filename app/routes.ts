import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/page.tsx"),
  route("login", "routes/login/page.tsx"),
  route("call/:uid/new", "routes/call/[uid]/new/page.tsx"),
  route("/schedule", "routes/schedule/page.tsx"),
  route("/calendar/new", "routes/calendar/new/page.tsx"),
] satisfies RouteConfig;
