function MezmureLogo() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 64 64">
        <g className="logo-cross">
          <path d="M32 4l4 5-4 5-4-5z" />
          <path d="M20 16l5-4 5 4-5 4zM44 16l-5-4-5 4 5 4z" />
          <path d="M32 12l6 7-6 7-6-7z" />
          <path d="M32 25v10" />
        </g>
        <g className="logo-drum">
          <path d="M18 34c8-5 20-5 28 0l-4 21c-6 4-14 4-20 0z" />
          <path d="M19 36c7 4 19 4 26 0M22 53c6-4 14-4 20 0" />
          <path d="M24 35l4 4-4 4 4 4-4 5M40 35l-4 4 4 4-4 4 4 5M30 33l-1 22M34 33l1 22" />
        </g>
        <g className="logo-sound">
          <path d="M12 35c-4 4-4 10 0 14M7 31c-7 7-7 16 0 23" />
          <path d="M52 35c4 4 4 10 0 14M57 31c7 7 7 16 0 23" />
        </g>
      </svg>
    </span>
  );
}

export default MezmureLogo;
