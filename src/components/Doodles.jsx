// Hand-drawn style SVG doodles used across the site.

export function Heart({ size = 32, color = 'var(--pink)', stroke = 'var(--ink)', className = '', style }) {
  return (
    <svg className={className} style={style} width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path
        d="M16 28 C 6 20, 2 14, 4 9 C 6 4, 13 4, 16 10 C 19 4, 26 4, 28 9 C 30 14, 26 20, 16 28 Z"
        fill={color}
        stroke={stroke}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M8 10 C 8.5 8.5, 9.5 7.8, 11 7.6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function Paw({ size = 28, color = 'var(--ink)', className = '', style }) {
  return (
    <svg className={className} style={style} width={size} height={size} viewBox="0 0 32 32" fill={color}>
      <ellipse cx="16" cy="21" rx="7" ry="6" />
      <ellipse cx="7" cy="13" rx="3" ry="4" />
      <ellipse cx="13" cy="8" rx="3" ry="4" />
      <ellipse cx="20" cy="8" rx="3" ry="4" />
      <ellipse cx="26" cy="13" rx="3" ry="4" />
    </svg>
  )
}

export function Star({ size = 24, color = 'var(--yellow)', className = '', style }) {
  return (
    <svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2 L14.6 8.6 L21.5 9 L16.2 13.4 L18 20.3 L12 16.4 L6 20.3 L7.8 13.4 L2.5 9 L9.4 8.6 Z"
        fill={color}
        stroke="var(--ink)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Sparkle({ size = 20, color = 'var(--ink)', className = '', style }) {
  return (
    <svg className={className} style={style} width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M10 1 V19 M1 10 H19 M4 4 L16 16 M16 4 L4 16" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

// A sitting doodle cat with blinking eyes and a wagging tail.
export function Cat({ size = 140, body = '#fff', accent = 'var(--pink)', className = '', style, mood = 'happy' }) {
  return (
    <svg className={`cat ${className}`} style={style} width={size} height={size} viewBox="0 0 140 140" fill="none">
      <g className="cat-tail">
        <path
          d="M98 112 C 125 110, 132 88, 120 72 C 114 64, 106 68, 110 76"
          stroke="var(--ink)"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          d="M98 112 C 125 110, 132 88, 120 72 C 114 64, 106 68, 110 76"
          stroke={body}
          strokeWidth="5"
          strokeLinecap="round"
        />
      </g>
      {/* body */}
      <path
        d="M40 128 C 30 100, 40 76, 70 74 C 100 76, 110 100, 100 128 Z"
        fill={body}
        stroke="var(--ink)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M58 128 C 58 118, 62 114, 64 128" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M76 128 C 78 114, 82 118, 82 128" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
      {/* ears */}
      <path d="M38 50 L34 16 L60 34 Z" fill={body} stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" />
      <path d="M102 50 L106 16 L80 34 Z" fill={body} stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" />
      <path d="M40 40 L38 24 L51 33 Z" fill={accent} />
      <path d="M100 40 L102 24 L89 33 Z" fill={accent} />
      {/* head */}
      <ellipse cx="70" cy="54" rx="38" ry="30" fill={body} stroke="var(--ink)" strokeWidth="3" />
      {/* eyes */}
      {mood === 'happy' ? (
        <g className="cat-eyes">
          <path d="M50 52 Q 55 46, 60 52" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
          <path d="M80 52 Q 85 46, 90 52" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
        </g>
      ) : (
        <g className="cat-eyes blink">
          <ellipse cx="55" cy="51" rx="4" ry="5" fill="var(--ink)" />
          <ellipse cx="85" cy="51" rx="4" ry="5" fill="var(--ink)" />
          <circle cx="56.5" cy="49" r="1.4" fill="#fff" />
          <circle cx="86.5" cy="49" r="1.4" fill="#fff" />
        </g>
      )}
      {/* blush */}
      <ellipse cx="46" cy="62" rx="6" ry="3.5" fill={accent} opacity=".6" />
      <ellipse cx="94" cy="62" rx="6" ry="3.5" fill={accent} opacity=".6" />
      {/* nose + mouth */}
      <path d="M67 58 L73 58 L70 61 Z" fill={accent} stroke="var(--ink)" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M70 61 Q 70 66, 65 66 M70 61 Q 70 66, 75 66" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
      {/* whiskers */}
      <path
        d="M36 58 L22 55 M36 63 L22 65 M104 58 L118 55 M104 63 L118 65"
        stroke="var(--ink)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

// A cat hugging a heart — for section headers.
export function CatHeart({ size = 90, className = '', style }) {
  return (
    <svg className={className} style={style} width={size} height={size} viewBox="0 0 100 100" fill="none">
      <path d="M22 40 L20 14 L40 28 Z" fill="#fff" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M78 40 L80 14 L60 28 Z" fill="#fff" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
      <ellipse cx="50" cy="42" rx="30" ry="22" fill="#fff" stroke="var(--ink)" strokeWidth="2.5" />
      <path d="M38 42 Q 41 38, 44 42 M56 42 Q 59 38, 62 42" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="34" cy="49" rx="4" ry="2.5" fill="var(--pink)" opacity=".7" />
      <ellipse cx="66" cy="49" rx="4" ry="2.5" fill="var(--pink)" opacity=".7" />
      <path d="M47 48 Q 50 52, 53 48" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M50 94 C 30 80, 24 70, 28 62 C 32 55, 44 56, 50 66 C 56 56, 68 55, 72 62 C 76 70, 70 80, 50 94 Z"
        fill="var(--pink)"
        stroke="var(--ink)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M24 66 C 28 62, 32 64, 32 70" stroke="var(--ink)" strokeWidth="2.5" fill="#fff" strokeLinecap="round" />
      <path d="M76 66 C 72 62, 68 64, 68 70" stroke="var(--ink)" strokeWidth="2.5" fill="#fff" strokeLinecap="round" />
    </svg>
  )
}

export function Squiggle({ width = 180, color = 'var(--pink)', className = '' }) {
  return (
    <svg className={className} width={width} height="16" viewBox="0 0 180 16" fill="none">
      <path
        d="M2 8 C 12 0, 22 16, 32 8 S 52 0, 62 8 S 82 16, 92 8 S 112 0, 122 8 S 142 16, 152 8 S 172 0, 178 8"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}
