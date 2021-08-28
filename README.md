Homepage : ISR because I want a static page but I still want the recent activity to update and not be stale for too long. But I don't need it to be perfectly up to date (so no SSR).

Twitter Feed : CSR (well the page is still SSG but we use SWR for client side fetching) because the twitter API takes a long time to respond and I don't want the user to wait for it to have something displayed. And I want up to date infos.

Github Feed : SSR because the github API is fast and I want to be up to date.

Blog articles : SSG because they don't change often. I could use getStaticPaths to only generate the first X blog posts but because I don't have a lot of them, I can just build them all every time.