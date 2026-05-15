export const formatLink = (type: string, value: string | null): string | null => {
  if (!value) return null;
  if (type === 'email') return `mailto:${value}`;
  if (type === 'phone') return `tel:${value.replace(/[^0-9+]/g, '')}`;
  if (value.startsWith('http')) return value;
  return `https://${value}`;
};

export const parseResumeJson = (jsonString: string) => {
  try {
    const data = JSON.parse(jsonString);
    return { data, error: null };
  } catch (err: unknown) {
    return { data: null, error: err instanceof Error ? err.message : "Invalid JSON" };
  }
};
