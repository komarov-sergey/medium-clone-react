// @ts-nocheck
import {useEffect, Fragment} from 'react'
import {stringify} from 'query-string'
import {useLocation, useParams} from 'react-router-dom'

import useFetch from 'hooks/useFetch'
import Feed from 'components/feed'
import Pagination from 'components/pagination'
import {getPaginator, limit} from 'utils'
import PopularTags from 'components/popularTags'
import Loading from 'components/loading'
import ErrorMessage from 'components/errorMessage'
import FeedToggler from 'components/feedTogler'

const TagFeed = () => {
  const location = useLocation()
  const params = useParams()
  const tagName = params.slug

  const {offset, currentPage} = getPaginator(location.search)
  const stringifiedParams = stringify({
    limit,
    offset,
    tag: tagName,
  })
  const apiUrl = `/articles?${stringifiedParams}`
  const [{response, isLoading, error}, doFetch] = useFetch(apiUrl)
  const url = location.pathname

  useEffect(() => {
    doFetch()
  }, [doFetch, currentPage, tagName])

  return (
    <div className="home-page">
      <div className="banner">
        <h1>Medium clone</h1>
        <p>A place to share knowledge</p>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggler tagName={tagName} />
            {isLoading && <Loading />}
            {error && <ErrorMessage />}
            {!isLoading && response && (
              <Fragment>
                <Feed articles={response.articles} />
                <Pagination
                  total={response.articlesCount}
                  limit={limit}
                  url={url}
                  currentPage={currentPage}
                />
              </Fragment>
            )}
          </div>
          <div className="col-md-3">
            <PopularTags />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TagFeed
