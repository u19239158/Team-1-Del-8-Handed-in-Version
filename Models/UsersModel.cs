﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NKAP_API_2.Models
{
    public class UserModel
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
    }
}
