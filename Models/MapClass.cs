using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace NKAP_API_2.Models
{
    public class MapClass
    {
        private static readonly HttpClient _httpClient = new HttpClient();

        public MapClass()
        {
            _httpClient.BaseAddress = new Uri("https://www.universal-tutorial.com/api/getaccesstoken");
            _httpClient.DefaultRequestHeaders.Add("user-email", "u19072912@tuks.co.za");
            _httpClient.DefaultRequestHeaders.Add("api-token", "o1ZCsVkfvqSKvM4sqwDQdOtwAf5Vw71o48 -WqIPqzf6eRBVQGkOV-eGXbigNECbxRuw");
        }

        public async Task Execute()
        {
            await GetToken();
        }

        public async Task<string> GetToken()
        {
            var response = await _httpClient.GetAsync("");
            response.EnsureSuccessStatusCode();

            var content = await response.Content.ReadAsStringAsync();
            //var companies = JsonSerializer.Deserialize<List<CompanyDto>>(content, _options);

            return content;
        }
    }
}
