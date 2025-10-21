using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace Common.Utility;

public interface ITokenCryptoService
{
    string EncryptUserId(Guid userId);
    Guid DecryptUserId(string encryptedToken);
}


public class TokenCryptoService : ITokenCryptoService
{
    private readonly byte[] _key;
    private readonly byte[] _iv;

    public TokenCryptoService(string encryptionKey)
    {
        // Используем SHA256 для получения ключа нужной длины из строки
        using (var sha256 = SHA256.Create())
        {
            _key = sha256.ComputeHash(Encoding.UTF8.GetBytes(encryptionKey));
            // Используем первые 16 байт для IV
            _iv = new byte[16];
            Array.Copy(_key, _iv, 16);
        }
    }

    public string EncryptUserId(Guid userId)
    {
        byte[] userIdBytes = userId.ToByteArray();

        using (Aes aes = Aes.Create())
        {
            aes.Key = _key;
            aes.IV = _iv;

            using (MemoryStream memoryStream = new MemoryStream())
            {
                using (ICryptoTransform encryptor = aes.CreateEncryptor())
                using (CryptoStream cryptoStream = new CryptoStream(memoryStream, encryptor, CryptoStreamMode.Write))
                {
                    cryptoStream.Write(userIdBytes, 0, userIdBytes.Length);
                }

                // Возвращаем зашифрованный токен в base64
                return Convert.ToBase64String(memoryStream.ToArray());
            }
        }
    }

    public Guid DecryptUserId(string encryptedToken)
    {
        byte[] cipherText = Convert.FromBase64String(encryptedToken);

        using (Aes aes = Aes.Create())
        {
            aes.Key = _key;
            aes.IV = _iv;

            using (MemoryStream memoryStream = new MemoryStream())
            {
                using (ICryptoTransform decryptor = aes.CreateDecryptor())
                using (CryptoStream cryptoStream = new CryptoStream(memoryStream, decryptor, CryptoStreamMode.Write))
                {
                    cryptoStream.Write(cipherText, 0, cipherText.Length);
                }

                return new Guid(memoryStream.ToArray());
            }
        }
    }
}
