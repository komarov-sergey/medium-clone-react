import React from 'react'

const BackendErrorMesages = ({backendErrors}) => {
  console.log('backendErrors', backendErrors)
  const errorMessages = Object.keys(backendErrors).map(name => {
    const messages = backendErrors[name].join(' ')
    return `${name} ${messages}`
  })
  return (
    <ul className='error-messages'>
      {errorMessages.map(errorMessage => (
        <li key={errorMessage}>{errorMessage}</li>
      ))}
    </ul>
  )
}

export default BackendErrorMesages