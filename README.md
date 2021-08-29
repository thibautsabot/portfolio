Homepage : ISR because I want a static page but I still want the recent activity to update and not be stale for too long. But I don't need it to be perfectly up to date (so no SSR).

Github Feed : CSR (well the page skeleton is still SSR but we use SWR for client side fetching) because we are making multiple queries that takes a long time and I don't want the user to wait for all of them to complete to have something displayed. And I always want up to date infos.
The skeleton could be SSG but I am using SSR to get the discussions which is an authentifcated API.

Twitter Feed : SSR because I want to always be up to date and the API is authentificated.

Blog articles : SSG because they don't change often. I could use getStaticPaths to only generate the first X blog posts but because I don't have a lot of them, I can just build them all every time.