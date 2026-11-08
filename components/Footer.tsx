import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 mt-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Independent, unofficial site. Not affiliated with Council Rock School District.
          </p>
          <nav className="flex items-center gap-6">
            <Link
              href="/about"
              className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              About & Sources
            </Link>
            <a
              href="https://files-backend.assets.thrillshare.com/documents/asset/uploaded_file/5923/Crsd/d9487f12-c71e-4bc6-aac7-d57ee9a4ba2c/Signed-Final-GFB.pdf?disposition=inline"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              View Source PDF
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}