import { getArticle } from '@/lib/api'
import Link from 'next/link'

export default function ArticlePage({params}: 
  { params: { slug: string } 
}) {
  // TODO: get `slug` and use to get article
  // please do not use hacky URL mutations
  // check Next.js docs :)
  // done mr dennis. 
  return getArticle(params.slug).then(function (articleContent) {
    let content = articleContent.split('\n').map(line => <p>{line}</p>);
    return (
      <main>
        <div>{content}</div>
        <Link href='/'>Go Back</Link>
      </main>
    );
  });
}
