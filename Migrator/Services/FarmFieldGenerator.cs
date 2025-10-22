using System.Linq;

namespace AgroPlatform.Migrator.Services;

using NetTopologySuite.Geometries;
using NetTopologySuite.IO;
using System;
using System.Collections.Generic;

public class FarmFieldGenerator
{
    private readonly Random _random;
    private readonly WKTReader _wktReader;
    private readonly WKTWriter _wktWriter;
    private readonly Geometry _boundaryPolygon;

    public FarmFieldGenerator(string boundary)
    {
        _random = new Random();
        _wktReader = new WKTReader();
        _wktWriter = new WKTWriter();
        _boundaryPolygon = _wktReader.Read(boundary);

        if (!_boundaryPolygon.IsValid)
        {
            throw new ArgumentException("Переданный граничный полигон невалиден");
        }
    }

    public List<string> GenerateBulk(int count)
    {
        return Enumerable.Range(0, count).Select(x =>
        {
            return GenerateRandomField();
        }).ToList();
    }

    public string GenerateRandomField(
        double minArea = 50, // минимальная площадь поля в кв. метрах
        double maxArea = 100, // максимальная площадь поля
        int minVertices = 300,    // минимальное количество вершин
        int maxVertices = 400)    // максимальное количество вершин
    {
        while (true)
        {
            try
            {
                var center = GetRandomPointInBoundary();
                var field = GeneratePolygonAroundPoint(center, minArea, maxArea, minVertices, maxVertices);

                // Проверяем, что сгенерированное поле находится внутри границ
                if (_boundaryPolygon.Contains(field))
                {
                    return _wktWriter.Write(field);
                }
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.StackTrace);
            }
        }
    }

    private Point GetRandomPointInBoundary()
    {
        var envelope = _boundaryPolygon.EnvelopeInternal;
        Point point;

        do
        {
            var x = _random.NextDouble() * (envelope.MaxX - envelope.MinX) + envelope.MinX;
            var y = _random.NextDouble() * (envelope.MaxY - envelope.MinY) + envelope.MinY;
            point = new Point(x, y);
        } while (!_boundaryPolygon.Contains(point));

        return point;
    }

    private Polygon GeneratePolygonAroundPoint(
        Point center,
        double minArea,
        double maxArea,
        int minVertices,
        int maxVertices)
    {
        var vertices = _random.Next(minVertices, maxVertices + 1);
        var coordinates = new List<Coordinate>();

        // Вычисляем примерный радиус для достижения желаемой площади
        var targetArea = _random.NextDouble() * (maxArea - minArea) + minArea;
        var approximateRadius = Math.Sqrt(targetArea / Math.PI)/1000;

        // Генерируем точки по кругу с случайными отклонениями
        for (int i = 0; i < vertices; i++)
        {
            var angle = 2 * Math.PI * i / vertices;
            var distance = approximateRadius * (0.8 + 0.4 * _random.NextDouble()); // 20% случайное отклонение

            var x = center.X + distance * Math.Cos(angle);
            var y = center.Y + distance * Math.Sin(angle);

            coordinates.Add(new Coordinate(x, y));
        }

        // Замыкаем полигон
        coordinates.Add(coordinates[0]);

        var factory = new GeometryFactory();
        var ring = factory.CreateLinearRing(coordinates.ToArray());
        return factory.CreatePolygon(ring);
    }
}
