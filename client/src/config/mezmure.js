export const LEGACY_MEZMURE_SOURCE =
  'Saint Louis Ethiopian Orthodox Church Youth Group/Choir';

export function getDisplayedMezmureSource(song) {
  if (!song) return '';

  if (Object.prototype.hasOwnProperty.call(song, 'source')) {
    return song.source?.trim() || '';
  }

  return LEGACY_MEZMURE_SOURCE;
}
