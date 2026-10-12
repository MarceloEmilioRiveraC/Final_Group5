import type { Post } from '@domain/entities/Post';

interface PriceChangeProps {
  posts: Post[];
}

export const PriceChange = ({ posts }: PriceChangeProps) => {
  if (posts.length === 0) return null;

  // Calculate like changes (trending posts)
  const postsWithTrend = posts
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 5)
    .map((post) => ({
      ...post,
      change: Math.round((post.likes / (posts.length || 1)) * 100),
      trend: post.likes > 5 ? 'up' : 'down',
    }));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Trending Posts</h2>
      
      <div className="space-y-4">
        {postsWithTrend.map((post) => (
          <div key={post._id} className="flex items-end justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 truncate">{post.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{post.description}</p>
            </div>

            <div className="flex items-center gap-4 ml-4">
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-800">{post.likes}</p>
                <p className="text-xs text-gray-500">likes</p>
              </div>

              <div className={`text-right font-semibold ${post.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                <p>{post.trend === 'up' ? '↑' : '↓'} {post.change}%</p>
                <p className="text-xs">{post.trend}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
