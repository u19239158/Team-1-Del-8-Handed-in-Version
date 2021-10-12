using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace NKAP_API_2.Models
{
    public class MapClass
    {
        [JsonProperty("usersid")]
        public int UsersID
        { get; set; }

        [JsonProperty("userusername")]
        public string UserUsername
        { get; set; }

        [JsonProperty("userpassword")]
        public string UserPassword
        { get; set; }

        [JsonProperty("customerid")]
        public int CustomerID
        { get; set; }

        [JsonProperty("customername")]
        public string CustomerName
        { get; set; }

        [JsonProperty("customersurname")]
        public string CustomerSurname
        { get; set; }

        [JsonProperty("customercellphonenumber")]
        public string CustomerCellphoneNumber
        { get; set; }

        [JsonProperty("customeremailaddress")]
        public string CustomerEmailAddress
        { get; set; }

        [JsonProperty("customerbusinessname")]
        public string CustomerBusinessName
        { get; set; }

        [JsonProperty("customervatreg")]
        public string CustomerVatReg
        { get; set; }

        [JsonProperty("titleid")]
        public int TitleID
        { get; set; }

        [JsonProperty("userroleid")]
        public int UserRoleID
        { get; set; }

        [JsonProperty("userroledescription")]
        public string UserRoleDescription
        { get; set; }

        [JsonProperty("userrolename")]
        public string UserRoleName
        { get; set; }

        [JsonProperty("audittrailid")]
        public int AuditTrailId
        { get; set; }

        [JsonProperty("passwordhistoryid")]
        public int PasswordHistoryId
        { get; set; }

        [JsonProperty("passwordhistorytext")]
        public string PasswordHistoryText
        { get; set; }

        [JsonProperty("passwordhistorydate")]
        public DateTime PasswordHistoryDate
        { get; set; }

        [JsonProperty("token")]
        public string token
        { get; set; }

        [JsonProperty("otp")]
        public int otp
        { get; set; }

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
