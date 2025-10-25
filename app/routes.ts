import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    route("/runplanner", "routes/home.tsx"),
    route("/runplanner/tools", "routes/tools.tsx"),
] satisfies RouteConfig;
