import Image from "next/image";
import Link from "next/link";
import { Facebook, Github, Twitter } from "lucide-react";

export default function FooterSection() {
  return (
    <footer className="from-background to-background/90 mt-40 border-t border-white/10 bg-gradient-to-b">
      <main className="container mx-auto px-4 py-12">
        {/* top section */}
        <div className="flex flex-col justify-between gap-10 text-center lg:flex-row lg:text-start">
          <div className="place-items-center lg:place-items-start">
            <div className="mb-4 flex items-center gap-3">
              <Image
                src="/images/AniTrackLogo.png"
                alt="logo"
                width={36}
                height={36}
              />
              <h3 className="text-xl font-bold">AniTrack</h3>
            </div>
            <p className="text-muted-foreground w-80 text-sm leading-relaxed lg:w-96">
              Track your favorite anime, manga, and characters — explore
              seasonal releases and connect with the community.
            </p>
          </div>

          {/* explore */}
          <div>
            <h4 className="text-foreground mb-3 font-semibold">Explore</h4>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>
                <Link
                  href="/anime"
                  className="hover:text-accent-foreground transition-colors"
                >
                  Anime
                </Link>
              </li>
              <li>
                <Link
                  href="/manga"
                  className="hover:text-accent-foreground transition-colors"
                >
                  Manga
                </Link>
              </li>
              <li>
                <Link
                  href="/character"
                  className="hover:text-accent-foreground transition-colors"
                >
                  Character
                </Link>
              </li>
            </ul>
          </div>

          {/* community */}
          <div>
            <h4 className="text-foreground mb-3 font-semibold">Community</h4>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>
                <Link
                  href="#"
                  className="hover:text-accent-foreground transition-colors"
                >
                  Forums
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-accent-foreground transition-colors"
                >
                  Reviews
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-accent-foreground transition-colors"
                >
                  News
                </Link>
              </li>
            </ul>
          </div>

          {/* legal */}
          <div>
            <h4 className="text-foreground mb-3 font-semibold">Legal</h4>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>
                <Link
                  href="#"
                  className="hover:text-accent-foreground transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-accent-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-accent-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* bottom section */}
        <div className="text-muted-foreground mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 text-sm md:flex-row">
          <p>© {new Date().getFullYear()} AniTrack. All rights reserved.</p>

          <div className="flex gap-6">
            <Link
              href="#"
              className="hover:text-accent-foreground transition-colors"
            >
              <Twitter size={20} />
            </Link>
            <Link
              href="#"
              className="hover:text-accent-foreground transition-colors"
            >
              <Facebook size={20} />
            </Link>
            <Link
              href="#"
              className="hover:text-accent-foreground transition-colors"
            >
              <Github size={20} />
            </Link>
          </div>
        </div>
      </main>
    </footer>
  );
}
