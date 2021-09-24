﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using NKAP_API_2.EF;

namespace NKAP_API_2.Models
{
 
    public class DeliveryShiftModel
    {
         
        [JsonProperty("shiftid")]
        public int ShiftId
        { get; set; }

        [JsonProperty("employeeshiftid")]
        public int EmployeeShiftId
        { get; set; }

        [JsonProperty("employeeid")]
        public int EmployeeID
        { get; set; }

        [JsonProperty("dateid")]
        public int DateID
        { get; set; }

        [JsonProperty("timeid")]
        public int TimeID
        { get; set; }

        [JsonProperty("dayoftheweek")]
        public DateTime DayOfTheWeek
        { get; set; }


        [JsonProperty("starttime")]
        public TimeSpan StartTime
        { get; set; }

        [JsonProperty("endtime")]
        public TimeSpan EndTime
        { get; set; }

        [JsonProperty("employeename")]
        public string EmployeeName
        { get; set; }

        [JsonProperty("employeesurname")]
        public string EmployeeSurname
        { get; set; }

        [JsonProperty("noofdeliveries")]
        public string NoOfDeliveries
        { get; set; }

        [JsonProperty("shiftfull")]
        public bool ShiftFull
        { get; set; }

        [JsonProperty("saleid")]
        public int SaleID
        { get; set; }

        [JsonProperty("deliveryid")]
        public int DeliveryId
        { get; set; }

        [JsonProperty("maxid")]
        public int MaxID
        { get; set; }

        [JsonProperty("maxnumber")]
        public int MaxNumber
        { get; set; }

        [JsonProperty("userusername")]
        public string UserUsername
        { get; set; }

        [JsonProperty("usersid")]
        public int UsersID
        { get; set; }

    }
}