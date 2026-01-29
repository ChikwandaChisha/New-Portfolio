import type { Metadata } from "next";
import ContactContent from "@/components/ContactContent";

export const metadata: Metadata = {
    title: "Contact | Chikwanda Chisha",
    description: "Get in touch with me for collaborations or opportunities.",
};

export default function ContactPage() {
    return <ContactContent />;
}
