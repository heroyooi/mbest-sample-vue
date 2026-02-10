const defaultHeaders = {
  Accept: "application/json"
};

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || "";
const baseUrl = rawBaseUrl.replace(/\/+$/, "");

const buildUrl = (url) => {
  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  if (!baseUrl) {
    return url;
  }

  if (url.startsWith("/")) {
    return `${baseUrl}${url}`;
  }

  return `${baseUrl}/${url}`;
};

const parseJsonSafely = async (response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

export const request = async (url, options = {}) => {
  const response = await fetch(buildUrl(url), {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {})
    }
  });

  const payload = await parseJsonSafely(response);

  if (!response.ok) {
    const message =
      payload?.error || payload?.message || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return payload;
};
