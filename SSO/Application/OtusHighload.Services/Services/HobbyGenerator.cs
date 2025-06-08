namespace OtusHighload.Application.Services;

public class HobbyGenerator
{

    private static string[] hobbies = new string[]
    {
        "Drama","Disc Jockey","Brazilian Jiu-Jitsu","Gardening","Aquascaping","Feng Shui Decorating","Aerial Silk","Card Game","Cooking","Entertaining","Community Activism","Bullet journal","Drawing","Conlanging","Breadmaking","Digital Art","Embroidery","Beatboxing","Knitting","Baking","E-Games","Diving","Photography","Astrology","Cardistry","Confectionery","Writing","Acroyoga","Clothesmaking","Chatting","Fashion","Ceramic","Candle Making","Decorating","Computer Programming","Campanology","Acting","Experimenting","Airbrush","Djembe","Cryptography","Fantasy Sport","Filmmaking","Book Restoration","Amateur Radio","Cheesemaking","Coloring book","Book Discussion Club","Communication","Fashion Designer","Blog","Couponing","Craft","Engraving","Animation","Reading","Collecting","Barbershop Music","Walking","Crocheting","Crossword","Creative Writing","Candy Making","Painting","Bowling","Dance","Electronics","3D Printing","Chess","Cross-stitch","Cue Sports","Beer Sommelier","Board game","Cosplay","Calligraphy","Diorama","Coffee Roasting","Anime","Cleaning","Construction"
    };

    public static string GetHobby()
    {
        return hobbies[new Random().Next(hobbies.Length)];
    }
}
