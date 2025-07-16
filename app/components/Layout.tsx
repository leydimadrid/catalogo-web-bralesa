// Layout principal del catálogo web
export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-pink-50">
      {/* Header */}
      {/* ... */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4">{children}</main>
      {/* Footer */}
      {/* ... */}
    </div>
  );
}
