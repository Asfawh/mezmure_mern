const MAX_LINES_PER_SLIDE = 6;
const MAX_CHARACTERS_PER_SLIDE = 420;

export const isLyricsHeading = (line = '') => (
  /^(?:አዝ(?:ማች)?|chorus|refrain|verse|meaning|translation)(?=[\s.:፡።…—–-]|$)/iu
    .test(line.trim())
);

function normalizeLyrics(value = '') {
  return value
    .replace(/\r\n?/g, '\n')
    .replace(/አዝ(?:ማች)?[\s\-‑–—_·.።…]+(?=\n|$)/gu, '\n\nአዝ\n\n')
    .replace(/[ \t]{3,}/g, '\n\n')
    .replace(/([^\n])\s+(?=አዝ(?:ማች)?(?:[\s.:፡።…—–-]|$))/gu, '$1\n\n')
    .trim();
}

// Some imported mezmure entries contain an entire stanza in one physical line.
// Turn sentence boundaries (and very long unpunctuated runs) into display lines
// before pagination so a short song does not render as one oversized sentence.
function expandInlineLines(lines) {
  return lines.flatMap((line) => {
    const sentenceLines = line
      .split(/(?<=[።.!?])\s+/u)
      .map((part) => part.trim())
      .filter(Boolean);

    return sentenceLines.flatMap((sentence) => {
      if (sentence.length <= 120) return [sentence];

      const words = sentence.split(/\s+/u);
      const chunks = [];
      let chunk = '';
      words.forEach((word) => {
        const candidate = chunk ? `${chunk} ${word}` : word;
        if (chunk && candidate.length > 120) {
          chunks.push(chunk);
          chunk = word;
        } else {
          chunk = candidate;
        }
      });
      if (chunk) chunks.push(chunk);
      return chunks;
    });
  });
}

function splitLongSection(lines) {
  const slides = [];
  let currentSlide = [];
  let characterCount = 0;

  const saveSlide = () => {
    if (currentSlide.length === 0) return;
    slides.push(currentSlide);
    currentSlide = [];
    characterCount = 0;
  };

  lines.forEach((line) => {
    const startsNewSection = isLyricsHeading(line) && currentSlide.length > 0 && !isLyricsHeading(currentSlide[0]);
    const exceedsLineLimit = currentSlide.length >= MAX_LINES_PER_SLIDE;
    const exceedsCharacterLimit =
      currentSlide.length > 0 &&
      characterCount + line.length > MAX_CHARACTERS_PER_SLIDE;

    if (startsNewSection || exceedsLineLimit || exceedsCharacterLimit) {
      saveSlide();
    }

    currentSlide.push(line);
    characterCount += line.length;
  });

  saveSlide();
  return slides;
}

function foldLeadingTitle(slides, title = '') {
  const normalizedTitle = title.trim().toLocaleLowerCase();
  const firstLine = slides[0]?.[0]?.trim().toLocaleLowerCase();

  if (
    slides.length > 1 &&
    slides[0].length === 1 &&
    normalizedTitle &&
    firstLine === normalizedTitle
  ) {
    return [[...slides[0], ...slides[1]], ...slides.slice(2)];
  }

  return slides;
}

function mergeOpeningFragments(sections) {
  const opening = sections.slice(0, 3);
  if (
    opening.length === 3 &&
    opening.every((section) => section.length === 1 && !isLyricsHeading(section[0]))
  ) {
    return [[...opening[0], ...opening[1], ...opening[2]], ...sections.slice(3)];
  }
  return sections;
}

function mergeSingleLineRuns(sections) {
  const result = [];
  let run = [];

  const flush = () => {
    if (run.length >= 3) result.push(run.flat());
    else result.push(...run);
    run = [];
  };

  sections.forEach((section) => {
    if (section.length === 1 && !isLyricsHeading(section[0])) {
      run.push(section);
    } else {
      flush();
      result.push(section);
    }
  });
  flush();
  return result;
}

export function buildLyricsSlides(value = '', title = '') {
  const normalized = normalizeLyrics(value);
  if (!normalized) return [];

  const sections = mergeSingleLineRuns(mergeOpeningFragments(normalized
    .split(/\n\s*\n+/)
    .map((section) => section.trim())
    .filter(Boolean)
    .reduce((merged, section) => {
      const lines = section
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);
      const expandedLines = expandInlineLines(lines);
      const previous = merged[merged.length - 1];
      const isStandaloneHeading = expandedLines.length === 1 && isLyricsHeading(expandedLines[0]);

      // Keep a chorus/refrain marker with the lyrics that follow it instead of
      // allowing the marker to become a page by itself.
      if (isStandaloneHeading && previous) {
        merged.push(expandedLines);
      } else if (isStandaloneHeading && !previous) {
        merged.push(expandedLines);
      } else if (previous?.length === 1 && isLyricsHeading(previous[0])) {
        merged[merged.length - 1] = [...previous, ...expandedLines];
      } else {
        merged.push(expandedLines);
      }
      return merged;
    }, [])));

  // A chorus marker at the very end belongs to the stanza immediately above
  // it; never let a trailing marker render as a page by itself.
  const lastSection = sections[sections.length - 1];
  if (
    sections.length > 1 &&
    lastSection?.length === 1 &&
    isLyricsHeading(lastSection[0])
  ) {
    sections.splice(-2, 2, [...sections[sections.length - 2], ...lastSection]);
  }

  const slides = sections
    .flatMap((section) => splitLongSection(section))
    .filter((slide) => slide.length > 0);

  return foldLeadingTitle(slides, title);
}
