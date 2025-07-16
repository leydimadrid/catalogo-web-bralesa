// Footer simple
export default function Footer() {
  return (
    <footer className="w-full py-4 bg-white border-t mt-8">
      <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm px-4">
        © {new Date().getFullYear()} Bralesa Accesorios. Todos los derechos
        reservados.
      </div>
    </footer>
  );
}
