export const PriceChange = ({ posts }: PriceChangeProps) => {
  if (posts.length === 0) return null;

  const postsWithTrend = posts
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 5)
    .map((post) => ({
      ...post,
      change: Math.round((post.likes / (posts.length || 1)) * 100),
      trend: post.likes > 5 ? 'up' : 'down',
    }));

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#E8D0E8]">
      
      <h2 className="text-xl font-bold mb-5 text-[#2D1B4E]">
        🔥 Trending Posts
      </h2>

      <div className="space-y-4">
        {postsWithTrend.map((post) => (
          <div
            key={post.id}
            className="flex justify-between items-center p-4 rounded-xl border border-[#F0E4F5] hover:bg-[#F9F3FB] transition"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-[#2D1B4E] truncate">
                {post.title}
              </h3>
              <p className="text-sm text-[#6B4C7A] line-clamp-2">
                {post.description}
              </p>
            </div>

            <div className="flex items-center gap-4 ml-4">

              <div className="text-right">
                <p className="text-xl font-bold text-[#2D1B4E]">
                  {post.likes}
                </p>
                <p className="text-xs text-[#9D8FA3]">likes</p>
              </div>

              <div
                className={`text-sm font-semibold ${
                  post.trend === 'up'
                    ? 'text-green-500'
                    : 'text-red-500'
                }`}
              >
                {post.trend === 'up' ? '↑' : '↓'} {post.change}%
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};