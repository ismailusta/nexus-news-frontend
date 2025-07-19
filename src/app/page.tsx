import Link from 'next/link';
import { PaginatedDocs, Post } from '@/interfaces';
import { fetchPayload } from '@/services/payload';

export default async function HomePage() {
  const data = await fetchPayload<PaginatedDocs<Post>>(
    '/api/posts?sort=-createdAt&limit=10'
  );

  const posts = data.docs;

  return (
    <main className="p-8 md:p-12">
      <h1 className="text-4xl font-bold mb-8">Son Yazılar</h1>

      {posts && posts.length > 0 ? (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id}>
              <Link
                href={`/posts/${post.slug}`}
                className="block p-6 border rounded-lg hover:bg-gray-700 transition-colors"
              >
                <h2 className="text-2xl font-semibold">{post.title}</h2>
                <p className="text-sm text-gray-400 mt-2">
                  Yayınlanma: {new Date(post.createdAt).toLocaleDateString('tr-TR')}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Gösterilecek yazı bulunamadı.</p>
      )}
    </main>
  );
}