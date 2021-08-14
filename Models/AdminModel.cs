using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using NKAP_API_2.EF;

namespace NKAP_API_2.Models
{
    public class AdminModel
    {
        [JsonProperty("adminid")]
        public int AdminID
        { get; set; }

        [JsonProperty("adminname")]
        public string AdminName
        { get; set; }

        [JsonProperty("adminsurname")]
        public string AdminSurName
        { get; set; }

        [JsonProperty("adminphonenumber")]
        public string AdminCellPhoneNumber
        { get; set; }

        [JsonProperty("adminemailaddress")]
        public string AdminEmailAddress
        { get; set; }

        [JsonProperty("title")]
        public virtual Title Title
        { get; set; }

        [JsonProperty("titleid")]
        public int TitleID
        { get; set; }


    }
}
