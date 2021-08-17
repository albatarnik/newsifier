import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { ThumbUpIcon, UserIcon } from "@heroicons/react/solid"

import { getInitialData, getArticle, getArticleComments } from "lib/helpers";

export default function Article({ article, comments }) {
  const router = useRouter();

  if (router.isFallback) return <p>Loading...</p>

  return (
    <>
      <Link href="/">
        <button className="mb-4 hover:underline">
          Back
        </button>
      </Link>

      <h1>
        {article?.title}
      </h1>
      {article?.content?.map((block, index) => {
        if (block.type === "paragraph") {
          return (
            <p key={index} className="break-words">{block.data.text}</p>
          )
        }
      })}
      <p className="font-bold underline">
        Comments
      </p>
      {comments?.length > 0 ?
        comments?.map((comment, index) => (
          <div key={index}>
            <div className="w-full flex justify-between">
              <div className="flex space-x-4 items-center">
                {!comment.user_avatar.includes('svg') ?
                  <Image
                    src={comment?.user_avatar}
                    width={24}
                    height={24}
                    className="rounded-full object-cover object-center"
                  />
                  :
                  <UserIcon className="h-6 w-6 text-black" />
                }
                <strong>{comment.username}</strong>
              </div>
              <p>{comment.date_and_time}</p>
            </div>
            <div className="ml-10 -mt-10 w-full">
              <p>{comment.content}</p>
              <div className="-mt-4 flex space-x-1 items-center">
                <ThumbUpIcon className="h-4 w-4" />
                <span className="text-sm">{comment.user_likes}</span>
              </div>
            </div>
          </div>
        ))
        :
        <p>No comments</p>
      }
    </>
  )
}

export async function getStaticPaths() {
  const articles = await getInitialData();

  const paths = articles?.flat().map(article => ({
    params: { articleId: article.id.toString() }
  }))

  return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
  const article = await getArticle(params.articleId)
  const comments = await getArticleComments(params.articleId)

  return {
    props: {
      article,
      comments,
    },
    revalidate: 60,
  }
}