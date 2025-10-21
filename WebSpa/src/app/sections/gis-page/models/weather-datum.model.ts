/**
 * Represents a weather data model containing various meteorological attributes.
 */
export class WeatherDatumModel {
   date?: string;
   datasourceId?: number;
   lat?: number;
   lng?: number;
   temperature?: number;
   precipitation?: number;
   condition?: string;
   humidity?: number;
   minHumidity?: number;
   maxHumidity?: number;
   idCondition?: number;
   solar?: number;
   wind_speed?: number;
   wind_direction?: number;
   min_temperature?: number;
   max_temperature?: number;
   solar_radiation?: number;
}
