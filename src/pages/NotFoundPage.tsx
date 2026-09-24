import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
      <h1 className="text-2xl font-bold text-gray-800">404 — Page not found</h1>
      <p className="text-sm text-gray-400">
        The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="text-sm text-blue-600 hover:underline">
        ← Back to Dashboard
      </Link>
    </div>
  );
}

export default NotFoundPage;