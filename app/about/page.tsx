import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = {
    title: "About | Chikwanda Chisha",
    description: "Learn more about my background in Computer Science and Economics.",
};

export default function AboutPage() {
    return <AboutContent />;
}
