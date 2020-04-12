// export const BASIC_URL = "";
export const BASIC_URL = process.env.NODE_ENV === 'production' 
    ? ""
    : "http://localhost:5000";

export const GOOGLE_MAP_KEY = "YOUR_GOOGLEMAP_KEY";
export const GOOGLE_MAP_DEFAULT_LAT = -27.224030;
export const GOOGLE_MAP_DEFAULT_LNG = -55.926448;
export const GOOGLE_MAP_LANGUAGE = "es";
