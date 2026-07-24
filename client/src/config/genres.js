export const MEZMURE_GENRES = [
  'ንስሐ-Nisiha',
  'ምስጋና Misgana',
  'ውዳሴ Wudase',
  "Werbe-ገዕዝ (Ge'ez)",
];

const genreBySongName = {
  Merkebe: 'ምስጋና Misgana',
  'Le-Getaye': 'ምስጋና Misgana',
  'Tekle Haimanot': 'ውዳሴ Wudase',
  'Selam Eleki': 'ውዳሴ Wudase',
  'Misgananew Siraye': 'ምስጋና Misgana',
  'Yalante Lene': 'ምስጋና Misgana',
  'Kibre Kidusan': 'ውዳሴ Wudase',
  'Inte Be Mider': "Werbe-ገዕዝ (Ge'ez)",
  'Hore Eyesus': "Werbe-ገዕዝ (Ge'ez)",
  'Metsa Kale Endemena': "Werbe-ገዕዝ (Ge'ez)",
  'Sibhat Le Egziabher': "Werbe-ገዕዝ (Ge'ez)",
  'Oh Erite Helina': "Werbe-ገዕዝ (Ge'ez)",
  Bemenu: "Werbe-ገዕዝ (Ge'ez)",
  'Gabriel New Alu': 'ውዳሴ Wudase',
  'Moged Simetayn': 'ምስጋና Misgana',
  ፈራሁ: 'ንስሐ-Nisiha',
  'ሰባቱ መንጦላይት': 'ውዳሴ Wudase',
};

const legacyGenreFallback = {
  Yensiha: 'ንስሐ-Nisiha',
  Woreb: "Werbe-ገዕዝ (Ge'ez)",
  Chebchebo: 'ምስጋና Misgana',
};

export function getMezmureGenre(song) {
  if (!song) return '';

  const currentGenre = song.genre?.trim();
  if (MEZMURE_GENRES.includes(currentGenre)) {
    return currentGenre;
  }

  const songName = song.songName?.trim();
  return genreBySongName[songName]
    || legacyGenreFallback[currentGenre]
    || currentGenre
    || MEZMURE_GENRES[0];
}

export function withMezmureGenre(song) {
  if (!song) return song;

  return {
    ...song,
    genre: getMezmureGenre(song),
  };
}

export function withMezmureGenres(songs) {
  return Array.isArray(songs) ? songs.map(withMezmureGenre) : songs;
}
