import Link from 'next/link'
import styles from './page.module.css'
import { getSlugs } from '@/lib/api'
import { postArticle } from '@/lib/api'
import { revalidatePath } from 'next/cache'

async function getLinks(): Promise<
  {
    name: string
    href: string
  }[]
> {
  // TODO: make this dynamically query
  // hint: `getSlugs`
  // done mr dennis. 
  try {
    const slugs = await getSlugs(); 

    const links = slugs.map(slug => {
      //formats the name pretty 
      const formattedName = slug.split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      const name = decodeURIComponent(formattedName);
      const href = `/articles/${slug}`;

      return { name, href };
    });

    return links;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Home() {
  const links = await getLinks()
  const handleArticleSave = async (formData: FormData) => {
    "use server";
  
    const title = formData.get('title');
    const content = formData.get('content')?.toString() || '';
  
    const processedTitle = title
      ? encodeURIComponent(title.toString().replace(/\s+/g, '-').toLowerCase())
      : '';
  
    postArticle(processedTitle, content);
  
    revalidatePath('/');
  };
  
  return (
    <>
      <main>
        <ul>
          {
            links.map(({name, href}) => (
              <li>
                <Link href={href}>{name}</Link>
              </li>
            ))
          }
        </ul>
      </main>

      {
        // TODO: use Next.js server actions to
        // ultimately `postArticle` in `api.ts`
        // there are also HTML attribute problems
      }
      <form className={styles.articleForm} action={handleArticleSave}>
        <input type='text' name='title' className={styles.articleEditor} required/>
        <textarea name='content' className={styles.articleEditor} />
        <button>Post Article</button>
      </form>
    </>
  )
}
