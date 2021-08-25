export const getArticles = async (pageNo) => {
  console.log(`\ngetArticles page ${pageNo}\n`);
  const articles = await fetch(`https://microservice.newsifier.com/api/v1/article/scopes/lat/1/${pageNo}`, {
    headers: {
      'X-Tenant': 'androidworld.newsifier.com'
    }
  })
    .then(res => res.json());

  return articles.data;
}

export const getArticle = async (articleId) => {
  console.log(`\ngetSingleArticle ID ${articleId}\n`);

  const article = await fetch(
    `https://androidworld.newsifier.com/api/v1/article-as-visitor/${articleId}?include=clapsCount,commentsCount`, {
    headers: {
      'X-Tenant': 'androidworld.newsifier.com',
      'Authorization': `Bearer ${process.env.TOKEN}`
    }
  })
    .then(res => res.json())

  return article.data;
}

export const getArticleComments = async (articleId) => {
  console.log(`\nget Comments of Article ID ${articleId}\n`);

  const comments = await fetch(
    `https://microservice.newsifier.com/api/v1/article/${articleId}/comments/0`, {
    headers: {
      'X-Tenant': 'androidworld.newsifier.com',
    }
  })
    .then(res => res.json());

  return comments.data
}

export const getInitialData = async () => {
  const firstPage = await getArticles(0);
  const secondPage = await getArticles(1);
  const thirdPage = await getArticles(2);

  return [firstPage, secondPage, thirdPage];
}