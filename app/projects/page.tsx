import type { Metadata } from "next";
import ProjectsContent from "@/components/ProjectsContent";

export const metadata: Metadata = {
    title: "Projects | Chikwanda Chisha",
    description: "Showcase of my recent projects in web development and software engineering.",
};

export default function ProjectsPage() {
    return <ProjectsContent />;
}
