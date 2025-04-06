import Link from "next/link";
import { Instagram, Github, Twitter } from "lucide-react";

export default function FooterSection() {
  return (
    <footer className="border-b bg-white py-12 dark:bg-transparent">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-wrap justify-between gap-6">
          <span className="text-muted-foreground order-last block text-center text-sm md:order-first">
            Made by Krish
          </span>
          <div className="order-first flex flex-wrap justify-center gap-6 text-sm md:order-last">
            <Link
              href="https://www.instagram.com/krishpint0/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary block duration-150"
            >
              <Instagram className="h-5 w-5" aria-label="Instagram" />
            </Link>
            <Link
              href="https://github.com/krishpinto"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary block duration-150"
            >
              <Github className="h-5 w-5" aria-label="GitHub" />
            </Link>
            <Link
              href="https://x.com/krishpint0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary block duration-150"
            >
              <Twitter className="h-5 w-5" aria-label="Twitter" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
