﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NKAP_API_2.Models
{
    public class EmailResult
    {

        [JsonProperty("message")]
    public string message
    { get; set; }
}
}
