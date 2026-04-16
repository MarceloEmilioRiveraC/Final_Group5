import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, SlidersHorizontal, Heart, ShoppingCart, Trash2, BarChart3 } from 'lucide-react';
import type { Category, Product } from '@domain/entities/Category'
import { useCatalogue } from '@presentation/hooks/useCatalogue'
import { postsApi } from '@infrastructure/services/postsAPI'
import { useAuth } from '@app/providers/AuthProvider'

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
  const navigate = useNavigate();
  
  return (
    <header className="sticky top-0 z-100 flex items-center justify-between px-10 h-[70px] bg-white border-b border-amber-100 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-2xl text-purple-600">✦</span>
        <span className="text-2xl font-light tracking-widest text-gray-900">INSPIRER</span>
      </div>
      <nav className="flex gap-8 items-center">
        <a href="/" className="text-sm tracking-wider text-gray-500 transition-colors hover:text-gray-900">Home</a>
        <a href="/catalogue" className="text-sm tracking-wider text-gray-900 transition-colors hover:text-gray-900">Catalogue</a>
        <button onClick={() => navigate('/stats')} className="flex items-center gap-2 text-sm tracking-wider text-gray-500 transition-colors hover:text-purple-600">
          <BarChart3 size={18} />
          Statistics
        </button>
      </nav>
      <div className="flex gap-4">
        <button aria-label="Search" className="transition-colors text-gray-600 hover:text-purple-600"></button>
        <button aria-label="Account" className="transition-colors text-gray-600 hover:text-purple-600"></button>
        <button aria-label="Favourites" className="transition-colors text-gray-600 hover:text-purple-600"></button>
        <button aria-label="Cart" className="transition-colors text-gray-600 hover:text-purple-600"></button>
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
    <div className="flex gap-2 px-10 py-5 overflow-x-auto bg-white border-b border-amber-100 scrollbar-hide">
      <button
        className={`flex-shrink-0 px-5 py-2 rounded-full border border-gray-300 text-sm tracking-wider cursor-pointer transition-all ${
          selected === null
            ? 'bg-purple-600 border-purple-600 text-white'
            : 'bg-transparent text-gray-700 hover:border-purple-600 hover:text-purple-600'
        }`}
        onClick={() => onSelect(null)}
      >
        All Clothing
      </button>
      {categories.map((c) => (
        <button
          key={c.id}
          className={`flex-shrink-0 px-5 py-2 rounded-full border border-gray-300 text-sm tracking-wider cursor-pointer transition-all ${
            selected === c.id
              ? 'bg-purple-600 border-purple-600 text-white'
              : 'bg-transparent text-gray-700 hover:border-purple-600 hover:text-purple-600'
          }`}
          onClick={() => onSelect(c.id)}
        >
          {c.name}
        </button>
      ))}
    </div>
  );
}

function ProductCard({ product, isTrending, onDelete }: { product: Product; isTrending: boolean; onDelete?: (id: string | number) => void }) {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  
  const imgSrc = safeImage(product.images);
  const [imgError, setImgError] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [buyLoading, setBuyLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [buyCount, setBuyCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleLike = async () => {
    if (likeLoading) return;
    setLikeLoading(true);
    setError(null);
    try {
      const response = await postsApi.likePost(String(product.id));
      setLiked(true);
      // Update counts from API response instead of incrementing
      setLikeCount(response.likes ?? likeCount + 1);
    } catch (err) {
      console.error('Failed to like product:', err);
      setError('Failed to like product');
    } finally {
      setLikeLoading(false);
    }
  };

  const handleBuy = async () => {
    if (buyLoading) return;
    setBuyLoading(true);
    setError(null);
    try {
      const response = await postsApi.buyPost(String(product.id));
      // Update counts from API response instead of incrementing
      setBuyCount(response.bought ?? buyCount + 1);
    } catch (err) {
      console.error('Failed to buy product:', err);
      setError('Failed to buy product');
    } finally {
      setBuyLoading(false);
    }
  };

  const handleDelete = async () => {
    if (deleteLoading || !isAdmin) return;
    
    const confirmed = window.confirm('Are you sure you want to delete this product?');
    if (!confirmed) return;
    
    setDeleteLoading(true);
    setError(null);
    try {
      await postsApi.deletePost(String(product.id));
      onDelete?.(product.id);
    } catch (err) {
      console.error('Failed to delete product:', err);
      setError('Failed to delete product');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
      <div
        className="relative w-full pt-[130%] overflow-hidden bg-cover bg-center"
        style={!imgSrc || imgError ? { background: gradientFor(product.id) } : undefined}
      >
        {imgSrc && !imgError && (
          <img
            src={imgSrc}
            alt={product.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform hover:scale-105"
            onError={() => setImgError(true)}
          />
        )}

        {isTrending && (
          <span className="absolute top-3 left-3 bg-purple-600 text-white text-xs tracking-wider font-semibold py-1 px-2 rounded italic">
            ✦ TRENDING!
          </span>
        )}

        <button
          className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-transform backdrop-blur-sm ${
            liked ? 'bg-pink-50' : 'bg-white/85'
          } hover:scale-125 disabled:opacity-60 disabled:cursor-not-allowed`}
          onClick={handleLike}
          disabled={likeLoading}
          aria-label="Like"
          title="Like product"
        >
          <Heart size={16} fill={liked ? '#e11d48' : 'none'} />
          {likeCount > 0 && (
            <span className="absolute bottom-0 right-0 bg-rose-600 text-white text-xs font-semibold rounded-full w-[18px] h-[18px] flex items-center justify-center -mb-1 -mr-1">
              {likeCount}
            </span>
          )}
        </button>

        {isAdmin && (
          <button
            className="absolute top-2 left-2 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-transform backdrop-blur-sm bg-red-50 hover:bg-red-100 hover:scale-125 disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={handleDelete}
            disabled={deleteLoading}
            aria-label="Delete"
            title="Delete product (admin only)"
          >
            <Trash2 size={16} className="text-red-600" />
          </button>
        )}
      </div>

      <div className="p-3">
        <p className="text-xs tracking-widest uppercase text-purple-600 mb-1">{product.category.name}</p>
        <h3 className="text-sm font-normal leading-snug text-gray-900 mb-2 line-clamp-2">{product.title}</h3>
        <p className="text-sm font-semibold text-gray-800 mb-3">${product.price.toLocaleString()}</p>
        
        {error && <p className="text-xs text-red-500 mb-2">{error}</p>}
        
        <div className="flex gap-4 mb-2 text-xs text-gray-600">
          <span className="flex items-center gap-1">♥ {likeCount}</span>
          <span className="flex items-center gap-1">🛒 {buyCount}</span>
        </div>

        <button
          className={`w-full py-2 px-3 rounded-lg text-xs font-medium tracking-wider flex items-center justify-center gap-2 transition-all ${
            buyLoading
              ? 'bg-gray-100 text-gray-500 border border-gray-200'
              : 'border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white'
          } disabled:opacity-60 disabled:cursor-not-allowed`}
          onClick={handleBuy}
          disabled={buyLoading}
        >
          <ShoppingCart size={16} />
          {buyLoading ? 'Buying...' : 'Buy Now'}
        </button>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-sm">
      <div className="w-full pt-[130%] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
      <div className="p-3 space-y-2">
        <div className="h-3 bg-gray-200 rounded w-14 animate-pulse" />
        <div className="h-3 bg-gray-200 rounded animate-pulse" />
        <div className="h-3 bg-gray-200 rounded w-14 animate-pulse" />
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
  const [displayedProducts, setDisplayedProducts] = useState(products);

  // Filter to only show Clothing and Shoes
  const filteredCategories = categories.filter(c => 
    c.name === 'Clothing' || c.name === 'Shoes'
  );

  // Update displayed products when products change
  useEffect(() => {
    setDisplayedProducts(products);
  }, [products]);

  // Filter products by category and search query
  const filtered = displayedProducts.filter((p: Product) => {
    const matchesCategory = !selectedCategory || p.category.id === selectedCategory;
    const matchesSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLoadMore = async () => {
    await loadMore(selectedCategory || undefined);
  };

  const handleDeleteProduct = (productId: string | number) => {
    setDisplayedProducts(prev => prev.filter(p => String(p.id) !== String(productId)));
  };

  return (
    <>
      <Navbar />

      {/* Inline search bar */}
      {showSearch && (
        <div className="bg-white border-b border-amber-100 px-10 py-3 flex items-center gap-3 animate-slideDown">
          <Search size={16} color="#888" />
          <input
            autoFocus
            placeholder="Search clothing..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-purple-600 transition-colors"
          />
          <button onClick={() => { setShowSearch(false); setSearchQuery(''); }} className="text-gray-500 hover:text-gray-700">
            <X size={16} />
          </button>
        </div>
      )}

      <CategoryBar
        categories={filteredCategories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <main className="px-10 py-8 pb-16">
        <div className="flex items-center justify-between mb-7">
          <h1 className="text-2xl font-light tracking-wide text-gray-900">
            {selectedCategory
              ? categories.find((c: Category) => c.id === selectedCategory)?.name ?? 'Products'
              : 'All Clothing'}
          </h1>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm cursor-pointer transition-all hover:border-purple-600 hover:text-purple-600" onClick={() => setShowSearch((s) => !s)}>
            <SlidersHorizontal size={15} />
            {showSearch ? 'Close' : 'Search'}
          </button>
        </div>

        {error && <p className="text-center text-rose-500 py-12">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : filtered.length === 0
              ? <p className="col-span-full text-center py-16 text-gray-400">No products found.</p>
              : filtered.map((p: Product, i: number) => (
                  <ProductCard key={p.id} product={p} isTrending={i === 0} onDelete={handleDeleteProduct} />
                ))
          }
        </div>

        {!loading && hasMore && !searchQuery && (
          <div className="text-center mt-10">
            <button className="px-10 py-3 border-2 border-purple-600 rounded-full bg-transparent text-purple-600 text-sm tracking-wider cursor-pointer transition-all hover:bg-purple-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed" onClick={handleLoadMore} disabled={loadingMore}>
              {loadingMore ? 'Loading…' : 'Load More'}
            </button>
          </div>
        )}
      </main>
    </>
  );
}