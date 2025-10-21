/**
 * An enumeration of available data sources for GIS page.
 *
 * Enumeration members:
 *
 * - ERA5: 1
 * - Местные станции: 2
 * - Другие данные: 3
 */
export const GisFilterDataSourceTypes: { [id: number]: string } =
{
    1: 'ERA5',
    2: 'Местные станции',
    3: 'Другие данные'
};

/**
 * An enumeration of available data layer types for GIS page.
 *
 * Enumeration members:
 *
 * - Осадки: 1
 * - Температура: 2
 * - Количество осадков: 3
 * - Температурный режим: 4
 * - Отклонение осадков: 5
 * - Отклонение температуры: 6
 */
export const GisFilterDataLayerTypes: { [id: number]: string } =
{
    1: 'Осадки',
    2: 'Температура',
    3: 'Количество осадков',
    4: 'Температурный режим',
    5: 'Отклонение осадков',
    6: 'Отклонение температуры'
};