export const MEZMURE_GENRES = [
  'ንስሐ-Nisiha',
  'ምስጋና ውዳሴ Wudase',
  "Werbe-ገዕዝ (Ge'ez)",
  'የበዓል መዝሙር (Feast Day Hymns)',
  'የሰርግ–የጋብቻ መዝሙር (Wedding Mezmur)',
];

const genreBySongName = {
  Merkebe: 'ምስጋና ውዳሴ Wudase',
  'Le-Getaye': 'ምስጋና ውዳሴ Wudase',
  'Tekle Haimanot': 'ምስጋና ውዳሴ Wudase',
  'Selam Eleki': 'ምስጋና ውዳሴ Wudase',
  'Misgananew Siraye': 'ምስጋና ውዳሴ Wudase',
  'Yalante Lene': 'ምስጋና ውዳሴ Wudase',
  'Kibre Kidusan': 'ምስጋና ውዳሴ Wudase',
  'Inte Be Mider': "Werbe-ገዕዝ (Ge'ez)",
  'Hore Eyesus': "Werbe-ገዕዝ (Ge'ez)",
  'Metsa Kale Endemena': "Werbe-ገዕዝ (Ge'ez)",
  'Sibhat Le Egziabher': "Werbe-ገዕዝ (Ge'ez)",
  'Oh Erite Helina': "Werbe-ገዕዝ (Ge'ez)",
  Bemenu: "Werbe-ገዕዝ (Ge'ez)",
  'Gabriel New Alu': 'ምስጋና ውዳሴ Wudase',
  'Moged Simetayn': 'ምስጋና ውዳሴ Wudase',
  ፈራሁ: 'ንስሐ-Nisiha',
  'ሰባቱ መንጦላይት': 'ምስጋና ውዳሴ Wudase',
};

const legacyGenreFallback = {
  Yensiha: 'ንስሐ-Nisiha',
  Woreb: "Werbe-ገዕዝ (Ge'ez)",
  Chebchebo: 'ምስጋና ውዳሴ Wudase',
  'ምስጋና Misgana': 'ምስጋና ውዳሴ Wudase',
  'ውዳሴ Wudase': 'ምስጋና ውዳሴ Wudase',
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
