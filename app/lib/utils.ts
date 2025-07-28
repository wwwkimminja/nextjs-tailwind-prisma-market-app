export const formatToYen = (price: number) => {
  return price.toLocaleString('jp-JP');
};

export const formatToTimeAgo = (date: string) => {
  const dayInMs = 1000 * 60 * 60 * 24;

  const time = new Date(date).getTime();
  const now = new Date().getTime();
  const diff = Math.round((time - now) / dayInMs);

  const formatter = new Intl.RelativeTimeFormat('jp-JP');

  return formatter.format(diff, 'days');
};
