import { json, LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getPosts } from '~/services/posts.server'
import { Post as PostComponent } from '~/components/Post'

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPosts>>
}

export const loader: LoaderFunction = async () => {
  const data: LoaderData = { posts: await getPosts() }

  return json(data)
}

export default function Index() {
  const { posts } = useLoaderData<LoaderData>()
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Welcome to Remix</h1>
      <>I am newwwwwwwww!</>
      <ul>
        {posts.map((post) => (
          <li key={post.title}>
            <PostComponent
              header={post?.title}
              authorName={post?.author?.email}>
              {post.body}
            </PostComponent>
          </li>
        ))}
      </ul>
    </div>
  )
}
