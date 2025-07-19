// src/app/posts/[slug]/page.tsx

import { PaginatedDocs, Post } from '@/interfaces';
import { fetchPayload } from '@/services/payload';
import { notFound } from 'next/navigation';

// Bu fonksiyon, Next.js'e hangi post sayfalarını önceden oluşturacağını söyler
export async function generateStaticParams() {
  const data = await fetchPayload<PaginatedDocs<Post>>('/api/posts?limit=100');
  return data.docs.map(({ slug }) => ({ slug }));
}

// Props için bir tip tanımı oluşturuyoruz
type Props = {
  params: {
    slug: string;
  };
};

// Sayfa Bileşeni
export default async function PostPage({ params }: Props) {
  const { slug } = params;

  // URL'deki slug'a göre tek bir post çekiyoruz
  const data = await fetchPayload<PaginatedDocs<Post>>(
    `/api/posts?where[slug][equals]=${slug}&depth=2` // depth=2, yazar ve kategori bilgilerini de getirir
  );
  console.log('Çekilen veri:', data);
  const post = data.docs[0];
  console.log('Yazar adı:', post.author.name);
  console.log('Yazar:', post.author);
  console.log('Yazar avatar:', post.author.avatar);
  console.log('Post kategori:', post.category);
  console.log('Yazar avatar URL:', post.author.avatar.url);
  console.log('Yazar avatar filename:', post.author.avatar.filename);
  console.log('Kategori adı:', post.category.name);
  // Eğer o slug'a ait bir post bulunamazsa, 404 sayfasına yönlendir
  if (!post) {
    return notFound();
  }

  return (
    <article className="p-8 md:p-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
      <div className="flex flex-wrap gap-x-4 gap-y-2 text-gray-400 mb-8">
        <div className="flex items-center gap-2">
          <img 
            src={post.author.avatar.url || post.author.avatar.filename} 
            alt={post.author.avatar.alt}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span>{post.author.name}</span>
        </div>
        <span>Kategori: {post.category.name}</span>
        <span>Yayınlanma: {new Date(post.createdAt).toLocaleDateString('tr-TR')}</span>
      </div>
      
      {/* Şimdilik içeriği sadece JSON olarak ekrana basalım. Bir sonraki adımda bunu HTML'e çevireceğiz. */}
      <div className="prose prose-invert max-w-none bg-gray-800 p-4 rounded-md">
        <h3 className="text-white">İçerik (Ham Veri):</h3>
        <pre>
          <code>
            {JSON.stringify(post.content, null, 2)}
          </code>
        </pre>
      </div>
    </article>
  );
};