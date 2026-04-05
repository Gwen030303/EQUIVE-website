import Link from "next/link";
import { Horse } from "@phosphor-icons/react/dist/ssr/Horse";

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] bg-off-white flex items-center justify-center px-6">
      <div className="flex flex-col items-center text-center">
        <Horse size={80} weight="thin" className="text-taupe/30 mb-6" />
        <h1 className="font-headline text-8xl text-black leading-none">404</h1>
        <p className="font-sans text-sm text-taupe-dark mt-4">
          Pagina niet gevonden
        </p>
        <p className="font-sans text-sm text-taupe-dark mt-2 max-w-[32ch]">
          De pagina die je zoekt bestaat niet of is verplaatst.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center bg-black text-off-white rounded-full px-8 py-3.5 font-sans text-xs tracking-[0.15em] uppercase hover:bg-warm-dark transition-colors"
        >
          Terug naar Home
        </Link>
      </div>
    </div>
  );
}
