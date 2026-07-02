import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import type { Neighborhood } from '../types'

const TOKYO: [number, number] = [35.672, 139.700]

function pinIcon(rank: number, active: boolean) {
  const size = active ? 38 : 30
  const bg = active ? '#1D5C6B' : '#3A7F8F'
  const border = active ? 3 : 2
  const shadow = active ? '0 3px 12px rgba(0,0,0,0.35)' : '0 2px 6px rgba(0,0,0,0.2)'
  return L.divIcon({
    className: '',
    html: `<div style="
      width:${size}px;height:${size}px;border-radius:50%;
      background:${bg};color:#fff;
      display:flex;align-items:center;justify-content:center;
      font-family:'Nanum Pen Script',cursive;font-size:${active ? 18 : 15}px;
      border:${border}px solid #fff;
      box-shadow:${shadow};
      cursor:pointer;
      transform:${active ? 'scale(1.15)' : 'scale(1)'};
      transition:all .25s;
    ">${rank}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  })
}

function shopIcon(emoji: string) {
  return L.divIcon({
    className: '',
    html: `<div style="
      width:26px;height:26px;border-radius:50%;
      background:#fff;
      display:flex;align-items:center;justify-content:center;
      font-size:14px;line-height:1;
      border:2px solid #B5551E;
      box-shadow:0 2px 6px rgba(0,0,0,0.25);
      cursor:pointer;
    ">${emoji}</div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -13],
  })
}

interface Props {
  neighborhoods: Neighborhood[]
  activeIdx: number
  onSelect: (idx: number) => void
}

export default function NeighborhoodMap({ neighborhoods, activeIdx, onSelect }: Props) {
  // Compute bounds to fit all pins
  const coords = neighborhoods
    .map(n => n.coordinates)
    .filter((c): c is [number, number] => !!c)

  const bounds = coords.length > 0
    ? L.latLngBounds(coords.map(c => L.latLng(c[0], c[1]))).pad(0.25)
    : L.latLngBounds([L.latLng(TOKYO[0], TOKYO[1])])

  return (
    <MapContainer
      bounds={bounds}
      style={{ width: '100%', height: '100%' }}
      zoomControl={true}
      scrollWheelZoom={true}
      attributionControl={true}
    >
      {/* CartoDB Positron — clean minimal tiles, no API key */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>'
        subdomains="abcd"
        maxZoom={19}
      />

      {neighborhoods.map((n, i) => {
        if (!n.coordinates) return null
        return (
          <Marker
            key={n.id}
            position={n.coordinates}
            icon={pinIcon(i + 1, i === activeIdx)}
            eventHandlers={{ click: () => onSelect(i) }}
          />
        )
      })}

      {neighborhoods.flatMap(n =>
        (n.shops ?? []).map((shop, i) => (
          <Marker key={`shop-${n.id}-${i}`} position={shop.coordinates} icon={shopIcon(shop.emoji)}>
            <Popup>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 140 }}>
                <div style={{ fontSize: 48, lineHeight: 1, textAlign: 'center' }}>{shop.emoji}</div>
                <strong>{shop.name}</strong>
                <span style={{ fontSize: 12, opacity: 0.7 }}>{shop.category}</span>
              </div>
            </Popup>
          </Marker>
        ))
      )}
    </MapContainer>
  )
}
