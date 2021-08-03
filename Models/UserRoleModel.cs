using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NKAP_API_2.Models
{
    public class UserRoleModel
    {
        [JsonProperty("userroleid")]
        public int UserRoleID
        { get; set; }

        [JsonProperty("userroledescription")]
        public string UserRoleDescription
        { get; set; }

        [JsonProperty("userrolename")]
        public string UserRoleName
        { get; set; }
    }
}
