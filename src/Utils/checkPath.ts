import match from 'wildcard-match';

export function checkUrlPath(paths: string[], url: string): boolean {
  if (!paths?.length) {
    return true;
  }
  const isMatch = match(paths);
  return isMatch(url);
}
