namespace OtusHighload.Application.Services;

public class NameRandomizer
{
   static  List<string> vowels = new List<string> { "a", "e", "i", "o", "u" };

   static  List<string> consonants = new List<string>
    {
        "b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z"
    };

    private static bool IsVowel(char c)
    {
        return vowels.Contains(char.ToLower(c).ToString());
    }

    private static char GetRandomLetter(char original, Random random)
    {
        var isUpper = char.IsUpper(original);
        var isVowel = IsVowel(original);
        var sourceList = isVowel ? vowels : consonants;
        var newChar = sourceList[random.Next(sourceList.Count)][0];
        return isUpper ? char.ToUpper(newChar) : newChar;
    }

    public static string RandomizeName(string name)
    {
        if (string.IsNullOrEmpty(name) || name.Length < 2)
            return name;

        var random = new Random();
        var chars = name.ToCharArray();
        var positions = Enumerable.Range(0, name.Length)
            .OrderBy(x => random.Next())
            .Take(Math.Min(2, name.Length))
            .ToList();

        foreach (var pos in positions)
        {
            chars[pos] = GetRandomLetter(chars[pos], random);
        }

        return new string(chars);
    }
}
