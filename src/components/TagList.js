import React from 'react'

const Taglist = ({tags}) => {
  return (
    <ul className="tag-list">
      { tags && tags.map(tag => (
        <li key={tag} className="tag-default tag-pill tag-outline">
          {tag}
        </li>
      ))}
    </ul>
  )
}


export default Taglist