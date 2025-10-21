namespace Geo.Contracts;

public class GetByBoundingBoxRequest
{
    public double[] Extent { get; set; }

    public int Zoom { get; set; }
}
