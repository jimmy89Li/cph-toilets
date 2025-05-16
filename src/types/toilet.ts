export type ToiletFeature = {
  type: 'Feature';
  id: string;
  distance?: number;
  geometry: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };
  properties: {
    id: number;
    toilet_lokalitet: string;
    vejnavn_husnummer: string;
    postnummer: string;
    toilet_betegnelse: string;
    toilettype_design: string;
    handicapadgang: 'Ja' | 'Nej';
    aabningstid_doegn: string;
    aabningsperiode: string;
    status: string;
    grafitti_ansvarlig: string;
    driftsbydel: string;
    utm_x: number;
    utm_y: number;
    longitude: number;
    latitude: number;
  };
};

export type ToiletApiResponse = {
  type: 'FeatureCollection';
  features: ToiletFeature[];
};

export type GeocodeCache = Record<string, string>;

export type NominatimResponse = {
  // optionally add more fields if needed
  display_name: string;
  address: {
    road?: string;
    quarter: string;
    suburb: string;
  };
};
