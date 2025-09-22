export const formatTime = (
  seconds: number,
  options?: { shorten?: boolean }
) => {
  try {
    const { shorten = false } = options || {};

    const days = Math.floor(seconds / (60 * 60 * 24));
    const hours = Math.floor((seconds % (60 * 60 * 24)) / (60 * 60));
    const mins = Math.floor((seconds % (60 * 60)) / 60);
    const secs = seconds % 60;

    if (shorten) {
      const parts = [];
      if (days) parts.push(`${days}d`);
      if (hours) parts.push(`${hours}h`);
      if (mins) parts.push(`${mins}m`);
      if (secs || parts.length === 0) parts.push(`${secs}sec`);
      return parts.join(" ");
    }

    const parts = [];
    if (days) parts.push(`${days} ${days === 1 ? "Day" : "Days"}`);
    if (hours) parts.push(`${hours} ${hours === 1 ? "Hour" : "Hours"}`);
    if (mins) parts.push(`${mins} ${mins === 1 ? "Minute" : "Minutes"}`);
    if (secs || parts.length === 0)
      parts.push(`${secs} ${secs === 1 ? "Second" : "Seconds"}`);
    return parts.join(" ");
  } catch (error) {
    console.error(error);
    return "-";
  }
};
