import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Run Planner" },
    { name: "description", content: "Welcome to Run Planner!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
