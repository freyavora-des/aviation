export type Airport = {
  iata: string;
  name: string;
  city: string;
  country: string;
  lat: number;
  lon: number;
};

// Small curated list to power onboarding + autocomplete.
// Replace later with a full dataset / API.
export const AIRPORTS: Airport[] = [
  { iata: "ATL", name: "Hartsfield–Jackson Atlanta International", city: "Atlanta", country: "United States", lat: 33.6407, lon: -84.4277 },
  { iata: "LAX", name: "Los Angeles International", city: "Los Angeles", country: "United States", lat: 33.9416, lon: -118.4085 },
  { iata: "JFK", name: "John F. Kennedy International", city: "New York", country: "United States", lat: 40.6413, lon: -73.7781 },
  { iata: "EWR", name: "Newark Liberty International", city: "Newark", country: "United States", lat: 40.6895, lon: -74.1745 },
  { iata: "SFO", name: "San Francisco International", city: "San Francisco", country: "United States", lat: 37.6213, lon: -122.379 },
  { iata: "ORD", name: "O'Hare International", city: "Chicago", country: "United States", lat: 41.9742, lon: -87.9073 },
  { iata: "DFW", name: "Dallas/Fort Worth International", city: "Dallas–Fort Worth", country: "United States", lat: 32.8998, lon: -97.0403 },
  { iata: "DEN", name: "Denver International", city: "Denver", country: "United States", lat: 39.8561, lon: -104.6737 },
  { iata: "SEA", name: "Seattle–Tacoma International", city: "Seattle", country: "United States", lat: 47.4502, lon: -122.3088 },
  { iata: "MIA", name: "Miami International", city: "Miami", country: "United States", lat: 25.7959, lon: -80.287 },
  { iata: "BOS", name: "Boston Logan International", city: "Boston", country: "United States", lat: 42.3656, lon: -71.0096 },
  { iata: "IAD", name: "Washington Dulles International", city: "Washington", country: "United States", lat: 38.9531, lon: -77.4565 },
  { iata: "YYZ", name: "Toronto Pearson International", city: "Toronto", country: "Canada", lat: 43.6777, lon: -79.6248 },
  { iata: "YVR", name: "Vancouver International", city: "Vancouver", country: "Canada", lat: 49.1967, lon: -123.1815 },
  { iata: "LHR", name: "Heathrow", city: "London", country: "United Kingdom", lat: 51.47, lon: -0.4543 },
  { iata: "LGW", name: "Gatwick", city: "London", country: "United Kingdom", lat: 51.1537, lon: -0.1821 },
  { iata: "CDG", name: "Charles de Gaulle", city: "Paris", country: "France", lat: 49.0097, lon: 2.5479 },
  { iata: "AMS", name: "Schiphol", city: "Amsterdam", country: "Netherlands", lat: 52.3105, lon: 4.7683 },
  { iata: "FRA", name: "Frankfurt", city: "Frankfurt", country: "Germany", lat: 50.0379, lon: 8.5622 },
  { iata: "ZRH", name: "Zurich", city: "Zurich", country: "Switzerland", lat: 47.4581, lon: 8.5555 },
  { iata: "DXB", name: "Dubai International", city: "Dubai", country: "United Arab Emirates", lat: 25.2532, lon: 55.3657 },
  { iata: "DOH", name: "Hamad International", city: "Doha", country: "Qatar", lat: 25.2731, lon: 51.608 },
  { iata: "SIN", name: "Changi", city: "Singapore", country: "Singapore", lat: 1.3644, lon: 103.9915 },
  { iata: "HND", name: "Haneda", city: "Tokyo", country: "Japan", lat: 35.5494, lon: 139.7798 },
  { iata: "NRT", name: "Narita", city: "Tokyo", country: "Japan", lat: 35.7719, lon: 140.3929 },
  { iata: "ICN", name: "Incheon International", city: "Seoul", country: "South Korea", lat: 37.4602, lon: 126.4407 },
  { iata: "SYD", name: "Sydney Kingsford Smith", city: "Sydney", country: "Australia", lat: -33.9399, lon: 151.1753 },
  { iata: "MEL", name: "Melbourne", city: "Melbourne", country: "Australia", lat: -37.669, lon: 144.841 },
  { iata: "DEL", name: "Indira Gandhi International", city: "Delhi", country: "India", lat: 28.5562, lon: 77.1 },
  { iata: "BOM", name: "Chhatrapati Shivaji Maharaj International", city: "Mumbai", country: "India", lat: 19.0896, lon: 72.8656 },
];

