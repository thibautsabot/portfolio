interface ResponseError extends Error {
  status?: number;
  info?: any
}

const fetcher = async url => {
  const res = await fetch('https://api.github.com/' + url)

  if (!res.ok) {
    const error: ResponseError = new Error('An error occurred while fetching the data.')

    error.info = await res.json()
    error.status = res.status
    throw error
  }

  return res.json()
}


export { fetcher };
