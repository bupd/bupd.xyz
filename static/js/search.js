(function () {
  const input = document.querySelector("#site-search");
  const results = document.querySelector("#search-results");
  const status = document.querySelector("#search-status");

  if (!input || !results || !status) {
    return;
  }

  const normalize = (value) => value.toLowerCase().trim();

  const render = (items, query) => {
    results.textContent = "";

    if (!query) {
      status.textContent = "Type to search posts and pages.";
      return;
    }

    if (items.length === 0) {
      status.textContent = `No results for "${query}".`;
      return;
    }

    status.textContent = `${items.length} result${items.length === 1 ? "" : "s"} for "${query}".`;

    for (const item of items) {
      const article = document.createElement("article");
      article.className = "post-card";

      const meta = document.createElement("div");
      meta.className = "post-card__date";
      meta.textContent = item.date || item.section || "page";

      const body = document.createElement("div");
      const title = document.createElement("h2");
      title.className = "post-card__title";
      const link = document.createElement("a");
      link.href = item.url;
      link.textContent = item.title;
      title.appendChild(link);

      const summary = document.createElement("p");
      summary.className = "post-card__summary";
      summary.textContent = item.summary || "";

      body.appendChild(title);
      body.appendChild(summary);
      article.appendChild(meta);
      article.appendChild(body);
      results.appendChild(article);
    }
  };

  fetch("/index.json")
    .then((response) => response.json())
    .then((items) => {
      status.textContent = "Type to search posts and pages.";

      input.addEventListener("input", () => {
        const query = normalize(input.value);
        const tokens = query.split(/\s+/).filter(Boolean);
        const matches = items.filter((item) => {
          const haystack = normalize([
            item.title,
            item.summary,
            item.section,
            ...(item.tags || []),
          ].join(" "));
          return tokens.every((token) => haystack.includes(token));
        });

        render(matches.slice(0, 20), query);
      });
    })
    .catch(() => {
      status.textContent = "Search index could not be loaded.";
    });
}());
