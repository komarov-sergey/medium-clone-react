// @ts-nocheck
import {useEffect, useState, useContext} from 'react'
import _ from 'lodash'
import {redirect} from 'react-router-dom'

import ArticleForm from 'components/articleForm'
import useFetch from 'hooks/useFetch'
import {CurrentUserContext} from 'contexts/currentUser'

const EditArticle = ({match}) => {
  const slug = match.params.slug
  const apiUrl = `/articles/${slug}`
  const [{response: fetchArticleResponse}, doFetchArticle] = useFetch(apiUrl)
  const [
    {response: updateArticleResponse, error: updateArticleErrror},
    doUpdateArticle,
  ] = useFetch(apiUrl)
  const [initialValues, setInitialValues] = useState(null)
  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false)
  const [currentUserState] = useContext(CurrentUserContext)

  const handleSubmit = (article) => {
    doUpdateArticle({
      method: 'put',
      data: {
        article,
      },
    })
  }

  useEffect(() => {
    doFetchArticle()
  }, [doFetchArticle])

  useEffect(() => {
    if (!fetchArticleResponse) {
      return
    }

    const initVals = _.pick(fetchArticleResponse.article, [
      'title',
      'description',
      'body',
      'tagList',
    ])

    setInitialValues(initVals)
  }, [fetchArticleResponse])

  useEffect(() => {
    if (!updateArticleResponse) {
      return
    }
    setIsSuccessfullSubmit(true)
  }, [updateArticleResponse])

  if (currentUserState.isLoggedIn === false) {
    return redirect('/')
  }

  if (isSuccessfullSubmit) {
    return redirect(`/articles/${slug}`)
  }

  return (
    <ArticleForm
      onSubmit={handleSubmit}
      errors={(updateArticleErrror && updateArticleErrror.errors) || {}}
      initialValues={initialValues}
    />
  )
}

export default EditArticle
