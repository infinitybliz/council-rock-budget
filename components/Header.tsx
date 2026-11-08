import Link from "next/link";

export default function Header() {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/money-in", label: "Money In" },
    { href: "/money-out", label: "Money Out" },
    { href: "/taxes", label: "Taxes" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 sticky top-0 z-10">
      <nav className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-300"
            >
              Council Rock Budget Explained
            </Link>
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}