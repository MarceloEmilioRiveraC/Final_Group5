import { useState } from 'react';
import { Search, X, SlidersHorizontal, Heart, ShoppingCart } from 'lucide-react';
import type { Category, Product } from '@domain/entities/Category'
import { useCatalogue } from '@presentation/hooks/useCatalogue'
import { postsApi } from '@infrastructure/services/postsAPI'
import '@shared/utils/catalogue.css'

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
    <header className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">✦</span>
        <span className="brand-name">INSPIRER</span>
      </div>
      <nav className="navbar-links">
        <a href="/">Home</a>
        <a href="/catalogue" className="active">Catalogue</a>
      </nav>
      <div className="navbar-icons">
        <button aria-label="Search"></button>
        <button aria-label="Account"></button>
        <button aria-label="Favourites"></button>
        <button aria-label="Cart"></button>
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
    <div className="category-bar">
      <button
        className={`cat-pill ${selected === null ? 'active' : ''}`}
        onClick={() => onSelect(null)}
      >
        All Clothing
      </button>
      {categories.map((c) => (
        <button
          key={c.id}
          className={`cat-pill ${selected === c.id ? 'active' : ''}`}
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
  const [likeLoading, setLikeLoading] = useState(false);
  const [buyLoading, setBuyLoading] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [buyCount, setBuyCount] = useState(0);

  const handleLike = async () => {
    if (likeLoading) return;
    setLikeLoading(true);
    try {
      await postsApi.likePost(String(product.id));
      setLiked(true);
      setLikeCount(likeCount + 1);
    } catch (err) {
      console.error('Failed to like product:', err);
    } finally {
      setLikeLoading(false);
    }
  };

  const handleBuy = async () => {
    if (buyLoading) return;
    setBuyLoading(true);
    try {
      await postsApi.buyPost(String(product.id));
      setBuyCount(buyCount + 1);
    } catch (err) {
      console.error('Failed to buy product:', err);
    } finally {
      setBuyLoading(false);
    }
  };

  return (
    <div className="product-card">
      <div
        className="card-image"
        style={!imgSrc || imgError ? { background: gradientFor(product.id) } : undefined}
      >
        {imgSrc && !imgError && (
          <img
            src={imgSrc}
            alt={product.title}
            onError={() => setImgError(true)}
          />
        )}

        {isTrending && (
          <span className="trending-badge">✦ TRENDING!</span>
        )}

        <button
          className={`like-btn ${liked ? 'liked' : ''}`}
          onClick={handleLike}
          disabled={likeLoading}
          aria-label="Like"
        >
          <Heart size={16} fill={liked ? '#e11d48' : 'none'} />
          {likeCount > 0 && <span className="count">{likeCount}</span>}
        </button>
      </div>

      <div className="card-info">
        <p className="card-category">{product.category.name}</p>
        <h3 className="card-title">{product.title}</h3>
        <p className="card-price">${product.price.toLocaleString()}</p>
        
        <div className="card-stats">
          <span className="stat-item">♥ {likeCount}</span>
          <span className="stat-item">🛒 {buyCount}</span>
        </div>

        <button
          className={`buy-btn ${buyLoading ? 'loading' : ''}`}
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
    <div className="product-card skeleton">
      <div className="card-image skeleton-img" />
      <div className="card-info">
        <div className="skel-line short" />
        <div className="skel-line" />
        <div className="skel-line short" />
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
        <div className="search-bar-wrap">
          <Search size={16} color="#888" />
          <input
            autoFocus
            placeholder="Search clothing..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={() => { setShowSearch(false); setSearchQuery(''); }}>
            <X size={16} />
          </button>
        </div>
      )}

      <CategoryBar
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <main className="catalogue-page">
        <div className="catalogue-header">
          <h1>
            {selectedCategory
              ? categories.find((c: Category) => c.id === selectedCategory)?.name ?? 'Products'
              : 'All Clothing'}
          </h1>
          <button className="filter-btn" onClick={() => setShowSearch((s) => !s)}>
            <SlidersHorizontal size={15} />
            {showSearch ? 'Close' : 'Search'}
          </button>
        </div>

        {error && <p className="error-msg">{error}</p>}

        <div className="product-grid">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : filtered.length === 0
              ? <p className="no-results">No products found.</p>
              : filtered.map((p: Product, i: number) => (
                  <ProductCard key={p.id} product={p} isTrending={i === 0} />
                ))
          }
        </div>

        {!loading && hasMore && !searchQuery && (
          <div className="load-more-wrap">
            <button className="load-more-btn" onClick={handleLoadMore} disabled={loadingMore}>
              {loadingMore ? 'Loading…' : 'Load More'}
            </button>
          </div>
        )}
      </main>
    </>
  );
}