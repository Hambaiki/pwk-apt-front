export const generateSearchParams = (
  params: Record<string, string | number | boolean | undefined>,
) => {
  const searchParams = new URLSearchParams();
  for (const key in params) {
    const value = params[key];
    if (value !== undefined) {
      searchParams.append(key, String(value));
    }
  }
  return searchParams;
};
