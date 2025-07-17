export default function nl2br(content) {
  if (!content) {
    return false;
  }
  return content.replace(/\n\n\n/gi, "\n\n\n<br>");
}
