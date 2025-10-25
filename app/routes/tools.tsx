import type { Route } from "./+types/home";
import { Tool } from "../tool/tool";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Run Planner" },
    { name: "description", content: "Planner Tool v0.0.1-alpha" },
  ];
}

export default function Tools() {
  return <Tool />;
}
