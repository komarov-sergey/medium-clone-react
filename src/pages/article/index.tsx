// @ts-nocheck
import {useEffect, useContext, useState} from 'react'
import {Link, redirect, useParams} from 'react-router-dom'

import useFetch from 'hooks/useFetch'
import Loading from 'components/loading'
import ErrorMessage from 'components/errorMessage'
import TagList from 'components/TagList'
import {CurrentUserContext} from 'contexts/currentUser'

const Article = () => {
  const params = useParams()
  const slug = params.slug
  const apiUrl = `/articles/${slug}`
  const [
    {
      fetchArticleIsLoading: fetchArticleIsLoading,
      response: fetchArticleResponse,
      error: fetchArticleError,
    },
    doFetch,
  ] = useFetch(apiUrl)
  const [{response: deleteArticleResponse}, doDeleteArticle] = useFetch(apiUrl)
  const [currentUserState] = useContext(CurrentUserContext)
  const [isSuccessfullDelete, setIsSuccessfullDelete] = useState(false)

  const isAuthor = () => {
    if (!fetchArticleResponse || !currentUserState.isLoggedIn) {
      return false
    }

    return (
      fetchArticleResponse.article.author.username ===
      currentUserState.currentUser.username
    )
  }

  useEffect(() => {
    doFetch()
  }, [doFetch])

  const deleteArticle = () => {
    doDeleteArticle({
      method: 'delete',
    })
  }

  useEffect(() => {
    if (!deleteArticleResponse) {
      return
    }
    setIsSuccessfullDelete(true)
  }, [deleteArticleResponse])

  if (isSuccessfullDelete) {
    return redirect('/')
  }

  return (
    <div className="article-page">
      <div className="banner">
        {!fetchArticleIsLoading && fetchArticleResponse && (
          <div className="container">
            <h1>{fetchArticleResponse.article.title}</h1>
            <div className="article-meta">
              <Link
                to={`/profiles/${fetchArticleResponse.article.author.username}`}
              >
                <img src={fetchArticleResponse.article.author.image} alt="" />
              </Link>
              <div className="info">
                <Link
                  to={`/profiles/${fetchArticleResponse.article.author.username}`}
                >
                  {fetchArticleResponse.article.author.username}
                </Link>
                <span className="date">
                  {fetchArticleResponse.article.createdAt}
                </span>
              </div>
              {isAuthor() && (
                <span>
                  <Link
                    className="btn btn-outline-secondary btn-sm"
                    to={`/articles/${fetchArticleResponse.article.slug}/edit`}
                  >
                    <i className="ion-edit"></i>
                    Edit Article
                  </Link>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={deleteArticle}
                  >
                    <i className="ion-trash-a"></i>
                    Delete article
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="container page">
        {fetchArticleIsLoading && <Loading />}
        {fetchArticleError && <ErrorMessage />}
        {!fetchArticleIsLoading && fetchArticleResponse && (
          <div className="row article-content">
            <div className="col-xs-12">
              <div>
                <p>{fetchArticleResponse.article.body}</p>
              </div>
              <TagList tags={fetchArticleResponse.article.taglist} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Article
