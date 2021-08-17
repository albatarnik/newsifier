import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ThumbUpIcon, ChatAlt2Icon } from "@heroicons/react/outline"

import { getArticles, getInitialData } from "lib/helpers";

export default function Home(props) {
  const [loading, setLoading] = useState(false);

  const [pagesLoaded, setPagesLoaded] = useState(2);
  const [currPage, setCurrPage] = useState(0);
  const [paginationRange, setPaginationRange] = useState([currPage, currPage + 1, currPage + 2]);

  const [allArticles, setAllArticles] = useState(props.articles);
  const [currArticles, setCurrArticles] = useState(allArticles[0]);

  const handlePrev = () => {
    if (currPage > 0) setCurrPage(prev => prev - 1)
  }

  const handleNext = async () => {
    setLoading(true);

    const nextPage = currPage + 1;
    if (nextPage > pagesLoaded) {
      const nthPage = await getArticles(nextPage)

      let newArticles = { ...allArticles }
      newArticles[nextPage] = nthPage

      setAllArticles(newArticles);
      setPagesLoaded(prev => prev + 1);
    }
    setCurrPage(prev => prev + 1);
    setLoading(false);
  }

  const getPaginationRange = () => {
    if (currPage === 0) return [currPage, currPage + 1, currPage + 2]
    else return [currPage - 1, currPage, currPage + 1]
  }

  useEffect(() => {
    if (allArticles.hasOwnProperty(currPage)) {
      setCurrArticles(allArticles[currPage])
      setPaginationRange(getPaginationRange());
    }
  }, [currPage, allArticles])

  if (loading) return <p>Loading...</p>

  return (
    <>
      <h1>
        Latest News
      </h1>

      <div className="mb-4 w-full flex justify-between">
        <button
          disabled={currPage === 0}
          onClick={handlePrev}
          className={currPage === 0 ? 'text-gray-400 cursor-not-allowed' : ''}
        >
          Prev
        </button>
        <div className="flex space-x-4">
          {paginationRange?.map((pageNo, index) => (
            <button
              key={index}
              onClick={() => {
                if (pageNo > pagesLoaded) handleNext()
                else setCurrPage(pageNo)
              }}
              className={pageNo === currPage ? 'underline' : ''}
            >
              {pageNo + 1}
            </button>
          ))}
        </div>
        <button onClick={handleNext}>
          Next
        </button>
      </div>

      {currArticles?.map(article => (
        <Link key={article.id} href={article.id.toString()}>
          <div className={`
            mb-8 flex flex-wrap sm:flex-nowrap
            space-x-0 sm:space-x-10 
            cursor-pointer
          `}>
            <Image
              src={article.image}
              width={300}
              height={200}
              layout="intrinsic"
              className="w-full sm:w-1/3 object-cover object-center rounded-lg"
            />
            <div className="w-full sm:w-2/3">
              <h4>{article.title}</h4>
              <p>
                door{" "}
                <span>
                  {article.author?.name}
                </span>
              </p>
              <div className="-mt-5 sm:mt-0 flex space-x-6 items-center">
                {/* COMMENTS */}
                <div className="flex space-x-1 items-center">
                  <ChatAlt2Icon className="h-6 w-6" />
                  <p>{article.comments_count < 0 ? -1 * article.comments_count : article.comments_count}</p>
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
    </>
  )
}

export async function getStaticProps() {
  const articles = await getInitialData();

  return {
    props: {
      articles,
    },
    revalidate: 60,
  }
}