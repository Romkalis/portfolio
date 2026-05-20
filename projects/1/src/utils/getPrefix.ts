export default function getPrefix(prefix: string) {
  switch(prefix) {
    case 'de': return '';
    case 'en': return 'en/';
    case 'it': return 'it/';
  }
}
