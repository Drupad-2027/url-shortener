import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "https://url-shortener-backend-k7ks.onrender.com";

export default function App() {

  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const shortenUrl = async () => {

    if (!longUrl) return;

    setLoading(true);

    try {

      const response = await fetch(
        `${API_BASE_URL}/shorten`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            longUrl: longUrl,
          }),
        }
      );

      const shortCode = await response.text();

      setShortUrl(
        `${API_BASE_URL}/${shortCode}`
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white flex flex-col">

      {/* HEADER */}

      <header className="flex justify-between items-center px-8 py-5 border-b border-white/10">

        <h1 className="text-2xl font-bold tracking-wide">
          URL Shortener
        </h1>

        <div className="flex gap-6 text-sm">

          <a
            href="https://github.com/Drupad-2027"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-400 transition"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/drupad-dhamdhere"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-400 transition"
          >
            LinkedIn
          </a>

        </div>

      </header>

      {/* MAIN */}

      <main className="flex-1 flex items-center justify-center px-5">

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-10 w-full max-w-2xl">

          <h1 className="text-5xl font-bold text-center mb-4">
            Shorten Your Links
          </h1>

          <p className="text-gray-300 text-center mb-10 text-lg">
            Fast. Reliable. Cloud-powered URL shortening service.
          </p>

          <div className="flex flex-col gap-5">

            <input
              type="text"
              placeholder="Paste your long URL here..."
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              className="w-full p-4 rounded-xl bg-black/30 border border-gray-600 text-white outline-none focus:border-blue-500 transition text-lg"
            />

            <button
              onClick={shortenUrl}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-semibold py-4 rounded-xl shadow-lg hover:scale-[1.02] disabled:opacity-50"
            >

              {loading ? "Generating..." : "Shorten URL"}

            </button>

            <p className="text-xs text-gray-400 text-center">
              First request may take 30–60 seconds because backend is hosted on Render free tier.
            </p>

            {shortUrl && (

              <div className="mt-5 bg-black/30 border border-green-500/30 rounded-2xl p-6">

                <p className="text-green-400 mb-3 font-semibold">
                  Short URL Generated
                </p>

                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 break-all hover:underline text-lg"
                >
                  {shortUrl}
                </a>

              </div>
            )}

          </div>

        </div>

      </main>

      {/* FOOTER */}

      <footer className="border-t border-white/10 py-5 text-center text-gray-400 text-sm">

        Built by Drupad Dhamdhere • Spring Boot • React • PostgreSQL • Redis • Docker

      </footer>

    </div>
  );
}