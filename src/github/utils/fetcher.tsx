interface ResponseError extends Error {
  status?: number;
  info?: any;
}

const fetcher = async (url) => {
  const res = await fetch("https://api.github.com/" + url, {
    ...(process.env.NEXT_PUBLIC_DEV_GITHUB_TOKEN && {
      // This token is only in .env.local and should not be set in the Vercel panel.
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_DEV_GITHUB_TOKEN}`,
      },
    }),
  });

  if (!res.ok) {
    const error: ResponseError = new Error(
      "An error occurred while fetching the data."
    );

    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

export { fetcher };
