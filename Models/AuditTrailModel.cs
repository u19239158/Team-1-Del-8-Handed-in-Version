using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NKAP_API_2.Models
{
    public class AuditTrailModel
    {
        [JsonProperty("audittrailid")]
        public int AuditTrailID
        { get; set; }

        [JsonProperty("audittraildescription")]
        public string AuditTrailDescription
        { get; set; }

        [JsonProperty("audittraildate")]
        public DateTime AuditTrailDate
        { get; set; }

        [JsonProperty("audittrailtime")]
        public TimeSpan AuditTrailTime
        { get; set; }

    }
}
