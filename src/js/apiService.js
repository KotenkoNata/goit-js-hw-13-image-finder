import { alert } from "./notify";

export default {
  authKey: "19850325-9735dd30f950df293b2a187bf",
  prevQuery: null,
  page: 1,
  per_page: 12,
  baseUrl: `https://pixabay.com/api/`,

  getFetch(query) {
    if (!query || this.prevQuery === query) {
      this.page += 1;
    } else {
      this.page = 1;
      this.prevQuery = query;
    }

    let url = `${this.baseUrl}?image_type=photo&orientation=horizontal&q=${this.prevQuery}&page=${this.page}&per_page=${this.per_page}&key=${this.authKey}`;

    let options = {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
      },
    };

    return fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        alert(`Loaded ${this.per_page} images from ${data.total}`);

        return data.hits.map((hit) => {
          return { page: this.page, ...hit };
        });
      });
  },
};
