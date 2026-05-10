/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url
 * @param {object} options
 */
function fetchModel(url, options = {}) {
  return fetch(`https://2njxmt-8081.csb.app/api${url}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      return response.json();
    })
    .catch((error) => {
      console.error("Fetch error:", error);

      throw error;
    });
}

export default fetchModel;
