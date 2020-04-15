import React, {useEffect, useState, useContext} from 'react'
import {Redirect} from 'react-router-dom'

import ArticleForm from 'components/articleForm'
import useFetch from 'hooks/useFetch'
import {CurrentUserContext} from 'contexts/currentUser'

const CreateArticle = () => {
  const apiUrl = '/articles'
  const [{response, error}, doFetch] = useFetch(apiUrl)
  const [currentUserState] = useContext(CurrentUserContext)
  const initialValues = {
    title: '',
    description: '',
    tagList: [],
  }
  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false)

  const handleSubmit = (article) => {
    console.log('habdleSubmit', article)
    doFetch({
      method: 'post',
      data: {
        article,
      },
    })
  }

  useEffect(() => {
    if (!response) {
      return
    }

    setIsSuccessfullSubmit(true)
  }, [response])

  if (currentUserState.isLoggedIn === false) {
    return <Redirect to="/" />
  }

  if (isSuccessfullSubmit) {
    return <Redirect to={`/articles/${response.article.slug}`} />
  }

  return (
    <div>
      <ArticleForm
        errors={(error && error.errors) || {}}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default CreateArticle
