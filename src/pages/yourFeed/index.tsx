// @ts-nocheck
import {useEffect} from 'react'
import {stringify} from 'query-string'
import {useLocation} from 'react-router-dom'

import useFetch from 'hooks/useFetch'
import Feed from 'components/feed'
import Pagination from 'components/pagination'
import {getPaginator, limit} from 'utils'
import PopularTags from 'components/popularTags'
import Loading from 'components/loading'
import ErrorMessage from 'components/errorMessage'
import FeedToggler from 'components/feedTogler'

const YourFeed = () => {
  const location = useLocation()
  const {offset, currentPage} = getPaginator(location.search)
  const stringifiedParams = stringify({
    limit,
    offset,
  })
  const apiUrl = `/articles/feed?${stringifiedParams}`
  const [{response, isLoading, error}, doFetch] = useFetch(apiUrl)
  const url = location.pathname

  useEffect(() => {
    doFetch()
  }, [doFetch, currentPage])

  return (
    <div className="home-page">
      <div className="banner">
        <h1>Medium clone</h1>
        <p>A place to share knowledge</p>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggler />
            {isLoading && <Loading />}
            {error && <ErrorMessage />}
            {!isLoading && response && (
              <>
                <Feed articles={response.articles} />
                <Pagination
                  total={response.articlesCount}
                  limit={limit}
                  url={url}
                  currentPage={currentPage}
                />
              </>
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

export default YourFeed
