function postedAt(date) {
  const now = new Date();
  const posted = new Date(date);
  const diff = now - posted;
  const diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffInHours = Math.floor(diff / (1000 * 60 * 60));
  const diffInMinutes = Math.floor(diff / (1000 * 60));
  const diffInSeconds = Math.floor(diff / 1000);

  if (diffInDays > 0) return `${diffInDays} hari yang lalu`;
  if (diffInHours > 0) return `${diffInHours} jam yang lalu`;
  if (diffInMinutes > 0) return `${diffInMinutes} menit yang lalu`;
  if (diffInSeconds > 0) return `${diffInSeconds} detik yang lalu`;
  return 'baru saja';
}

export { postedAt };