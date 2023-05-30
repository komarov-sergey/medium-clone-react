// @ts-nocheck
import {useEffect} from 'react'
import {NavLink, useParams} from 'react-router-dom'

import useFetch from 'hooks/useFetch'
import UserArticle from 'pages/userProfile/components/userArticles'

const UserProfile = () => {
  const params = useParams()
  const slug = params.slug
  const location = useLocation()
  const url = location.pathname
  const isFavorites = location.pathname.includes('favorites')
  const apiUrl = `/profiles/${slug}`
  const [{response}, doFetch] = useFetch(apiUrl)

  useEffect(() => {
    doFetch()
  }, [doFetch])

  //cool stuff - not render if no response
  if (!response) {
    return null
  }

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img className="user-img" alt="" src={response.profile.image} />
              <h4>{response.profile.username}</h4>
              <p>{response.profile.bio}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="article-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <NavLink
                    to={`/profiles/${response.profile.username}`}
                    className="nav-link"
                  >
                    My Posts
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={`/profiles/${response.profile.username}/favorites`}
                    className="nav-link"
                  >
                    Favorites Posts
                  </NavLink>
                </li>
              </ul>
            </div>
            <UserArticle
              username={response.profile.username}
              location={location}
              isFavorites={isFavorites}
              url={url}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
