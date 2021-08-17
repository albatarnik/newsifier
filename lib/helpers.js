export const getArticles = async (pageNo) => {
  const articles = await fetch(`https://microservice.newsifier.com/api/v1/article/scopes/lat/1/${pageNo}`, {
    headers: {
      'X-Tenant': 'androidworld.newsifier.com'
    }
  })
    .then(res => res.json());

  return articles.data;
}

export const getArticle = async (articleId) => {
  const article = await fetch(
    `https://androidworld.newsifier.com/api/v1/article-as-visitor/${articleId}?include=clapsCount,commentsCount`, {
    headers: {
      'X-Tenant': 'androidworld.newsifier.com',
      'Authorization': 'Bearer m8tiFyxZrZD1NGWNAjSu7dpPV8hlJOMLOqS2sWCGXXFllxFsHmGwrD3oT2Son1kXaEM6iRL22nLsgBPp'
    }
  })
    .then(res => res.json())

  return article.data;
}

export const getArticleComments = async (articleId) => {
  const comments = await fetch(
    `https://microservice.newsifier.com/api/v1/article/${articleId}/comments/0`, {
    headers: {
      'X-Tenant': 'androidworld.newsifier.com',
    }
  })
    .then(res => res.json());

  return comments.data
}