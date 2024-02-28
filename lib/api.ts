// uou won't need other imports
import fs from 'fs'
import path from 'path'

// gets path to `articles` dir in current working dir
const root = path.join(process.cwd(), 'articles')

export async function getSlugs(): Promise<string[]> {
  // TODO: return discovered slugs in filesystem from `root`
  // Okay Mr Dennis. Done. 
  const slugs = fs.readdirSync(root);
  return slugs.map((slug) => slug.split('.')[0]);
}

export async function getArticle(slug: string): Promise<string> {
  // TODO: get the text from a markdown file with the given `slug`
  // `slug` can be, e.g., `hello-world`, `the-success`, etc.
  //done mr dennis
  try {
    const articlePath = `${root}/${slug}.md`
    return fs.readFileSync(articlePath).toString()
  }
  catch(error){
    console.error(error)
    return "no article found (404?)"
  }
}

export async function postArticle(slug: string, content: string): Promise<boolean> {
  // TODO: create markdown file in filesystem with slug and content
  // return `true` on success
  // must handle any errors and exceptions -> should then return `false`
  //done mr dennis
  try {
    const articlePath = `${root}/${slug}.md`
    fs.writeFileSync(articlePath, content)
    return true
  }
  catch(error){
    console.error(error)
    return false
  }
}
