import React, { useEffect, useState } from 'react';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import Local from '../assets/Local.svg';

import mapIcon from '../utils/mapIcon';

import '../styles/pages/orphanagesMap.css';
import api from '../services/api';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const OrphanagesMap: React.FC = () => {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([])

  useEffect(() => {
    api.get<Orphanage[]>('orphanages').then(res => setOrphanages(res.data))
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={Local} alt="Happy Logo"/>

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>João Pessoa</strong>
          <span>Paraíba</span>
        </footer>
      </aside>

      <Map
        center={[-7.0808606, -34.8293001]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} /> */}

        {orphanages.map(orphanage => (
          <Marker
            key={orphanage.id}
            position={[orphanage.latitude, orphanage.longitude]}
            icon={mapIcon}
          >
            <Popup closeButton={false} minWidth={240} maxHeight={240} className="map-popup">
              {orphanage.name}
              <Link to={`/orphanages/${orphanage.id}`}>
                <FiArrowRight size={20} color='#fff' />
              </Link>
            </Popup>
          </Marker>
        ))}
      </Map>

      <Link to="/orphanages/create" className="create-orphanages">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;