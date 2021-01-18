import { errorMessage, successMessage } from "./notify";

export default {
  authKey: "19850325-9735dd30f950df293b2a187bf",
  prevQuery: null,
  page: 1,
  perPage: 12,
  baseUrl: `https://pixabay.com/api/`,

  getFetch(query) {
    if (!query || this.prevQuery === query) {
      this.page += 1;
    } else {
      this.page = 1;
      this.prevQuery = query;
    }

    const url = `${this.baseUrl}?image_type=photo&orientation=horizontal&q=${this.prevQuery}&page=${this.page}&per_page=${this.perPage}&key=${this.authKey}`;

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
        const { page, perPage } = this;
        const { total, hits } = data;

        if (data.total === 0) {
          errorMessage(`No result was found for query [${this.prevQuery}]`);
        } else {
          successMessage(`Loaded ${this.perPage} images from ${total}`);
        }

        const hasMore = total - perPage * page > 0;

        return { hasMore, page, ...data };
      });
  },
};
