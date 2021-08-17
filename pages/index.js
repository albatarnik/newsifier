import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ThumbUpIcon, ChatAlt2Icon } from "@heroicons/react/outline"

import { getArticles } from "lib/helpers";

export default function Home(props) {
  const [articles, setArticles] = useState(props.articles);

  return (
    <div className="w-full m-auto py-10 prose lg:prose-lg">
      <h1>
        Latest News
      </h1>

      {articles?.map(article => (
        <Link key={article.id} href={article.id.toString()}>
          <div className="mb-8 flex space-x-10 cursor-pointer">
            <Image
              src={article.image}
              width={300}
              height={200}
              className="w-1/3 object-cover object-center rounded-lg"
            />
            <div className="w-2/3">
              <h4>{article.title}</h4>
              <p>
                door{" "}
                <span className="underline">
                  {article.author?.name}
                </span>
              </p>
              <div className="flex space-x-6 items-center">
                {/* COMMENTS */}
                <div className="flex space-x-1 items-center">
                  <ChatAlt2Icon className="h-6 w-6" />
                  <p>{article.comments_count}</p>
                </div>
                {/* CLAPS */}
                <div className="flex space-x-1 items-center">
                  <ThumbUpIcon className="h-6 w-6" />
                  <p>{article.claps_count}</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export async function getStaticProps() {
  const articles = await getArticles(0);

  return {
    props: {
      articles
    }
  }
}