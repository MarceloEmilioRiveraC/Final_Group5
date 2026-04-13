import { useState } from 'react';
import { Search, X, SlidersHorizontal, Heart } from 'lucide-react';
import type { Category, Product } from '@domain/entities/Category'
import { useCatalogue } from '@presentation/hooks/useCatalogue'

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Returns a safe image URL — skips broken/placeholder images */
function safeImage(images: string[]): string {
  const raw = images?.[0] ?? '';
  try {
    const cleaned = raw.startsWith('["') ? JSON.parse(raw)[0] : raw;
    if (cleaned.startsWith('http') && !cleaned.includes('placehold')) return cleaned;
  } catch {/* ignore */}
  // Fallback to a stylish gradient placeholder
  return '';
}

const GRADIENT_FALLBACKS = [
  'linear-gradient(135deg,#667eea,#764ba2)',
  'linear-gradient(135deg,#f093fb,#f5576c)',
  'linear-gradient(135deg,#4facfe,#00f2fe)',
  'linear-gradient(135deg,#43e97b,#38f9d7)',
  'linear-gradient(135deg,#fa709a,#fee140)',
  'linear-gradient(135deg,#a18cd1,#fbc2eb)',
];

function gradientFor(id: number) {
  return GRADIENT_FALLBACKS[id % GRADIENT_FALLBACKS.length];
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function Navbar() {
  return (
    <header className="sticky top-0 z-100 flex items-center justify-between px-10 h-[70px] bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-2xl text-purple-600">✦</span>
        <span className="text-2xl font-serif font-light tracking-widest text-gray-900">INSPIRER</span>
      </div>
      <nav className="flex gap-8">
        <a href="/" className="text-sm tracking-wide text-gray-500 hover:text-gray-900 transition-colors">Home</a>
        <a href="/catalogue" className="text-sm tracking-wide text-gray-900">Catalogue</a>
      </nav>
      <div className="flex gap-5">
        <button aria-label="Search" className="text-gray-600 hover:text-purple-600 transition-colors"></button>
        <button aria-label="Account" className="text-gray-600 hover:text-purple-600 transition-colors"></button>
        <button aria-label="Favourites" className="text-gray-600 hover:text-purple-600 transition-colors"></button>
        <button aria-label="Cart" className="text-gray-600 hover:text-purple-600 transition-colors"></button>
      </div>
    </header>
  );
}

function CategoryBar({
  categories,
  selected,
  onSelect,
}: {
  categories: Category[];
  selected: number | null;
  onSelect: (id: number | null) => void;
}) {
  return (
    <div className="flex gap-2 px-10 py-5 overflow-x-auto bg-white border-b border-gray-200 scroll-smooth scrollbar-hide">
      <button
        className={`flex-shrink-0 px-5 py-2 rounded-full border text-sm tracking-wider transition-all ${
          selected === null
            ? 'bg-purple-600 border-purple-600 text-white'
            : 'border-gray-300 text-gray-600 hover:border-purple-600 hover:text-purple-600'
        }`}
        onClick={() => onSelect(null)}
      >
        All Clothing
      </button>
      {categories.map((c) => (
        <button
          key={c.id}
          className={`flex-shrink-0 px-5 py-2 rounded-full border text-sm tracking-wider transition-all ${
            selected === c.id
              ? 'bg-purple-600 border-purple-600 text-white'
              : 'border-gray-300 text-gray-600 hover:border-purple-600 hover:text-purple-600'
          }`}
          onClick={() => onSelect(c.id)}
        >
          {c.name}
        </button>
      ))}
    </div>
  );
}

function ProductCard({ product, isTrending }: { product: Product; isTrending: boolean }) {
  const imgSrc = safeImage(product.images);
  const [imgError, setImgError] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
      <div
        className="relative w-full overflow-hidden bg-cover bg-center"
        style={{
          paddingTop: '130%',
          background: !imgSrc || imgError ? gradientFor(product.id) : undefined
        }}
      >
        {imgSrc && !imgError && (
          <img
            src={imgSrc}
            alt={product.title}
            className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={() => setImgError(true)}
          />
        )}

        {isTrending && (
          <span className="absolute top-3 left-3 bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded italic tracking-widest">
            ✦ TRENDING!
          </span>
        )}

        <button
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur transition-transform hover:scale-110 ${
            liked ? 'bg-red-50' : 'bg-white/85'
          }`}
          onClick={() => setLiked(!liked)}
          aria-label="Like"
        >
          <Heart size={16} fill={liked ? '#e11d48' : 'none'} color={liked ? '#e11d48' : 'currentColor'} />
        </button>
      </div>

      <div className="p-4">
        <p className="text-xs font-semibold text-purple-600 uppercase tracking-widest mb-1">{product.category.name}</p>
        <h3 className="text-sm font-normal leading-5 text-gray-900 mb-2 line-clamp-2">{product.title}</h3>
        <p className="text-sm font-semibold text-gray-800">${product.price.toLocaleString()}</p>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden">
      <div className="w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" style={{ paddingTop: '130%' }} />
      <div className="p-4">
        <div className="h-3 bg-gray-200 rounded mb-2 w-1/2"></div>
        <div className="h-3 bg-gray-200 rounded mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function CataloguePage() {
  const { categories, products, loading, loadingMore, error, hasMore, loadMore } = useCatalogue();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  // Filter products by category and search query
  const filtered = products.filter((p: Product) => {
    const matchesCategory = !selectedCategory || p.category.id === selectedCategory;
    const matchesSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLoadMore = async () => {
    await loadMore(selectedCategory || undefined);
  };

  return (
    <>
      <Navbar />

      {/* Inline search bar */}
      {showSearch && (
        <div className="flex items-center gap-3 px-10 py-3 bg-white border-b border-gray-200 animate-in slide-in-from-top">
          <Search size={16} className="text-gray-500" />
          <input
            autoFocus
            placeholder="Search clothing..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 text-sm border-b border-gray-300 outline-none focus:border-purple-600 transition-colors py-1"
          />
          <button onClick={() => { setShowSearch(false); setSearchQuery(''); }} className="text-gray-500 hover:text-gray-700">
            <X size={16} />
          </button>
        </div>
      )}

      <CategoryBar
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <main className="px-10 py-8 pb-16 bg-gray-50">
        <div className="flex items-center justify-between mb-7">
          <h1 className="text-2xl font-light tracking-wide text-gray-900">
            {selectedCategory
              ? categories.find((c: Category) => c.id === selectedCategory)?.name ?? 'Products'
              : 'All Clothing'}
          </h1>
          <button 
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:border-purple-600 hover:text-purple-600 transition-all"
            onClick={() => setShowSearch((s) => !s)}
          >
            <SlidersHorizontal size={15} />
            {showSearch ? 'Close' : 'Search'}
          </button>
        </div>

        {error && <p className="text-center text-red-500 py-12">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : filtered.length === 0
              ? <p className="col-span-full text-center text-gray-500 py-16">No products found.</p>
              : filtered.map((p: Product, i: number) => (
                  <ProductCard key={p.id} product={p} isTrending={i === 0} />
                ))
          }
        </div>

        {!loading && hasMore && !searchQuery && (
          <div className="text-center mt-10">
            <button 
              className="px-10 py-3 border-2 border-purple-600 text-purple-600 rounded-full font-medium hover:bg-purple-600 hover:text-white transition-all disabled:opacity-50 disabled:cursor-default"
              onClick={handleLoadMore} 
              disabled={loadingMore}
            >
              {loadingMore ? 'Loading…' : 'Load More'}
            </button>
          </div>
        )}
      </main>
    </>
  );
}