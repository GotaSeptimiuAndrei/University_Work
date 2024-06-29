using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataEncryptionModule
{
    internal class SubstitutionCipher
    {
        private Dictionary<char, char> encryptionMap;

        public SubstitutionCipher(Dictionary<char, char> customEncryptionMap = null)
        {
            if (customEncryptionMap == null)
            {
                this.encryptionMap = GenerateRandomEncryptionMap();
            }
            else
            {
                this.encryptionMap = customEncryptionMap;
            }
        }

        private Dictionary<char, char> GenerateRandomEncryptionMap()
        {
            Random random = new Random();
            List<char> alphabet = Enumerable.Range(' ', 255).Select(i => (char)i).ToList();
            List<char> shuffledAlphabet = Shuffle(new List<char>(alphabet), random);
            Dictionary<char, char> returnMap = alphabet.Zip(shuffledAlphabet, (key, value) => new { key, value }).ToDictionary(x => x.key, x => x.value);
            return returnMap;
        }

        private List<T> Shuffle<T>(List<T> list, Random random)
        {
            int n = list.Count;
            //Fisher-Yates shuffle algorithm
            while (n > 1)
            {
                n--;
                int k = random.Next(n + 1);
                T value = list[k];
                list[k] = list[n];
                list[n] = value;
            }
            return list;
        }

        public string Encrypt(string plaintext)
        {
            StringBuilder encryptedText = new StringBuilder();
            foreach (char c in plaintext)
            {
                if (this.encryptionMap.ContainsKey(c))
                    encryptedText.Append(this.encryptionMap[c]);
                else
                    encryptedText.Append(c);
            }

            return encryptedText.ToString();
        }

        public string Decrypt(string ciphertext)
        {
            StringBuilder decryptedText = new StringBuilder();
            foreach (char c in ciphertext)
            {
                char charKey = this.encryptionMap.FirstOrDefault(x => x.Value == c).Key;
                if (charKey != '\0')
                {
                    decryptedText.Append(charKey);
                }
                else
                {
                    decryptedText.Append(c);
                }
            }

            return decryptedText.ToString();
        }
    }

    internal class Program
    {
        static void Main(string[] args)
        {
            Dictionary<char, char> customEncryptionMap = new Dictionary<char, char>
            {
                {'A', 'X'},
                {'B', 'Y'},
                {'C', 'Z'},
            
            };

            SubstitutionCipher cipher = new SubstitutionCipher();

            string plaintext = "hello world";

            string ciphertext = cipher.Encrypt(plaintext);
            Console.WriteLine("Encrypted Text: " + ciphertext);

            string decryptedText = cipher.Decrypt(ciphertext);
            Console.WriteLine("Decrypted Text: " + decryptedText);

            if (decryptedText == plaintext)
            {
                Console.WriteLine("Encryption and Decryption successful.");
            }
            else
            {
                Console.WriteLine("Encryption and Decryption failed.");
            }
            Console.Read();
        }
    }
}
