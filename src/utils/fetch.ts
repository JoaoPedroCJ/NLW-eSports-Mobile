const baseurl = "http://192.168.0.160:3333";

const makeRequest = <T>(url: string, options = {}): Promise<T> =>
  fetch(`${baseurl}${!url.startsWith("/") && "/"}${url}`, options).then(data => data.json());

export const api = {
  get: <T>(
    url: string,
    options = {
      method: "GET",
    }
  ) => makeRequest<T>(url, options),
  post: <T>(
    url: string,
    options = {
      method: "POST",
    }
  ) => makeRequest<T>(url, options),
};
