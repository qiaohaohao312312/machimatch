import type { Neighborhood } from '../types'

// This component renders OFF-SCREEN and is captured by html2canvas.
// Keep styles simple — avoid backdrop-filter, SVG masks, etc.

interface Props {
  neighborhood: Neighborhood
}

const S = {
  card: {
    width: '540px',
    background: '#F5EEE4',
    padding: '52px 44px 44px',
    fontFamily: '"Nanum Pen Script", cursive',
    boxSizing: 'border-box' as const,
    minHeight: '960px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0px',
  },
  wordmark: {
    fontFamily: '"Nanum Pen Script", cursive',
    fontSize: '20px',
    color: '#1D5C6B',
    letterSpacing: '0.04em',
    marginBottom: '32px',
  },
  name: {
    fontFamily: '"Kaisei Tokumin", Georgia, serif',
    fontSize: '38px',
    color: '#2C2825',
    lineHeight: 1.15,
    marginBottom: '6px',
  },
  district: {
    fontFamily: '"Nanum Pen Script", cursive',
    fontSize: '18px',
    color: '#2C282570',
    marginBottom: '28px',
  },
  divider: {
    height: '1px',
    background: '#2C282518',
    marginBottom: '28px',
  },
  opening: {
    fontFamily: '"Nanum Pen Script", cursive',
    fontSize: '20px',
    color: '#2C2825',
    lineHeight: 1.65,
    marginBottom: '24px',
  },
  time: {
    fontFamily: '"Nanum Pen Script", cursive',
    fontSize: '22px',
    color: '#1D5C6B',
    lineHeight: 1,
    marginBottom: '6px',
  },
  momentText: {
    fontFamily: '"Nanum Pen Script", cursive',
    fontSize: '19px',
    color: '#2C2825',
    lineHeight: 1.65,
    marginBottom: '20px',
  },
  tagsRow: {
    display: 'flex' as const,
    flexWrap: 'wrap' as const,
    gap: '8px',
    marginTop: '8px',
    marginBottom: '32px',
  },
  tag: {
    border: '1.5px solid #1D5C6B',
    borderRadius: '999px',
    padding: '4px 14px',
    fontFamily: '"Nanum Pen Script", cursive',
    fontSize: '16px',
    color: '#1D5C6B',
  },
  footer: {
    marginTop: 'auto',
    paddingTop: '24px',
    borderTop: '1px solid #2C282518',
    fontFamily: '"Nanum Pen Script", cursive',
    fontSize: '16px',
    color: '#2C282840',
    letterSpacing: '0.03em',
  },
}

export default function ShareCard({ neighborhood: n }: Props) {
  // Show opening + first 2 moments to keep card readable
  const moments = n.dayMoments.slice(0, 2)

  return (
    <div style={S.card}>
      <div style={S.wordmark}>machimatch</div>

      <div style={S.name}>{n.name}</div>
      <div style={S.district}>
        {n.district ? `${n.district}  ·  ` : ''}{n.city}
      </div>

      <div style={S.divider} />

      <div style={S.opening}>{n.dayOpening}</div>

      {moments.map((m, i) => (
        <div key={i}>
          <div style={S.time}>{m.time}</div>
          <div style={S.momentText}>{m.text}</div>
        </div>
      ))}

      <div style={S.tagsRow}>
        {n.tags.map(tag => (
          <span key={tag} style={S.tag}>{tag}</span>
        ))}
      </div>

      <div style={S.footer}>machimatch.app</div>
    </div>
  )
}
