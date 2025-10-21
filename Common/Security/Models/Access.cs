namespace Common.Security.Models;

/// <summary>
/// Represents different levels of access permissions in the system.
/// </summary>
/// <remarks>
/// This enumeration supports bitwise combination of its member values using the [Flags] attribute.
/// It is commonly used to define and evaluate access controls for different operations.
/// </remarks>
[Flags]
public enum Access
{
    Read = 1,
    Create = 2,
    Delete = 4,
    Update = 8
}

/// <summary>
/// Provides extension methods for the Access enumeration.
/// </summary>
/// <remarks>
/// This class contains static methods to enhance the functionality of the Access enumeration
/// by adding utility methods for checking and evaluating access permissions.
/// </remarks>
public static class AccessExtensions
{
    /// <summary>
    /// Determines whether the specified flag is set in the current Access enumeration value.
    /// </summary>
    /// <param name="op">The Access enumeration value to check.</param>
    /// <param name="checkflag">The Access flag to verify if it is set in the enumeration.</param>
    /// <returns>True if the specified flag is set in the Access enumeration; otherwise, false.</returns>
    public static bool HasFlag(this Access op, Access checkflag)
    {
        return (op & checkflag) == checkflag;
    }
}