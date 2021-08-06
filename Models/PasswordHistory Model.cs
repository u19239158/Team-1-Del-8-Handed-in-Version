using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NKAP_API_2.Models
{
    public class PasswordHistory_Model
    {
        [JsonProperty("passwordhistoryid")]
        public int PasswordHistoryId
        { get; set; }

        [JsonProperty("passwordhistorytext")]
        public string PasswordHistoryText
        { get; set; }

        [JsonProperty("passwordhistorydate")]
        public DateTime PasswordHistoryDate
        { get; set; }

        [JsonProperty("usersid")]
        public int UsersId
        { get; set; }


    }
}
