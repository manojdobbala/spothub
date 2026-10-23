export type Listing = {
  id: number;
  title: string;
  locality: string;
  area: number; // sq yards
  rent: number; // monthly ₹
  propertyType: "Open Plot" | "Warehouse" | "Ground Floor" | "Mixed-use";
  tags: string[];
  verified: boolean;
  isochrone: string; // delivery radius label
  road: string;      // road access
  power: string;     // kVA
  lat: number;
  lng: number;
};

export const listings: Listing[] = [
  {
    id: 1,
    title: "Kondapur Main Road Plot",
    locality: "Kondapur",
    area: 300,
    rent: 180000,
    propertyType: "Open Plot",
    tags: ["Dark Store Ready", "GHMC C1"],
    verified: true,
    isochrone: "2.8 km",
    road: "40 ft road",
    power: "50 kVA",
    lat: 17.4647,
    lng: 78.3613,
  },
  {
    id: 2,
    title: "Gachibowli Ground Floor",
    locality: "Gachibowli",
    area: 250,
    rent: 210000,
    propertyType: "Ground Floor",
    tags: ["Cloud Kitchen", "FSSAI Pre-cleared"],
    verified: true,
    isochrone: "2.2 km",
    road: "60 ft road",
    power: "75 kVA",
    lat: 17.4401,
    lng: 78.3489,
  },
  {
    id: 3,
    title: "Madhapur Industrial Shed",
    locality: "Madhapur",
    area: 500,
    rent: 320000,
    propertyType: "Warehouse",
    tags: ["Dark Store Ready", "Loading Bay"],
    verified: true,
    isochrone: "3.0 km",
    road: "80 ft road",
    power: "100 kVA",
    lat: 17.4504,
    lng: 78.3908,
  },
  {
    id: 4,
    title: "Hitec City Mixed-use Space",
    locality: "Hitec City",
    area: 180,
    rent: 155000,
    propertyType: "Mixed-use",
    tags: ["Cloud Kitchen", "GHMC C1"],
    verified: false,
    isochrone: "2.5 km",
    road: "30 ft road",
    power: "30 kVA",
    lat: 17.4469,
    lng: 78.3787,
  },
  {
    id: 5,
    title: "Kukatpally Open Plot",
    locality: "Kukatpally",
    area: 400,
    rent: 140000,
    propertyType: "Open Plot",
    tags: ["Dark Store Ready"],
    verified: true,
    isochrone: "3.2 km",
    road: "40 ft road",
    power: "50 kVA",
    lat: 17.4849,
    lng: 78.3995,
  },
  {
    id: 6,
    title: "Banjara Hills Corner Plot",
    locality: "Banjara Hills",
    area: 220,
    rent: 260000,
    propertyType: "Open Plot",
    tags: ["Premium Location", "GHMC C1"],
    verified: true,
    isochrone: "2.0 km",
    road: "60 ft road",
    power: "60 kVA",
    lat: 17.4156,
    lng: 78.4347,
  },
  {
    id: 7,
    title: "Jubilee Hills Warehouse",
    locality: "Jubilee Hills",
    area: 350,
    rent: 290000,
    propertyType: "Warehouse",
    tags: ["Dark Store Ready", "Loading Bay"],
    verified: false,
    isochrone: "2.7 km",
    road: "50 ft road",
    power: "80 kVA",
    lat: 17.4314,
    lng: 78.4085,
  },
  {
    id: 8,
    title: "Miyapur Ground Floor Space",
    locality: "Miyapur",
    area: 160,
    rent: 95000,
    propertyType: "Ground Floor",
    tags: ["Cloud Kitchen", "FSSAI Pre-cleared"],
    verified: true,
    isochrone: "2.4 km",
    road: "30 ft road",
    power: "25 kVA",
    lat: 17.4961,
    lng: 78.3551,
  },
];

export const LOCALITIES = ["All Areas", "Kondapur", "Gachibowli", "Madhapur", "Hitec City", "Kukatpally", "Banjara Hills", "Jubilee Hills", "Miyapur"];
export const PROPERTY_TYPES = ["All Types", "Open Plot", "Warehouse", "Ground Floor", "Mixed-use"];
export const USE_CASES = ["All Uses", "Dark Store", "Cloud Kitchen"];
