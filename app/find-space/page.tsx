import type { Metadata } from "next";
import FindSpaceShell from "./FindSpaceShell";

export const metadata: Metadata = {
  title: "Find a Space — Spothub",
  description:
    "Browse verified vacant urban plots in Hyderabad for dark stores, cloud kitchens, and quick-commerce nodes.",
};

export default function FindSpacePage() {
  return <FindSpaceShell />;
}
