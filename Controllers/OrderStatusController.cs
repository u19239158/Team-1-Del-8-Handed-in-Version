using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using NKAP_API_2.EF;
using NKAP_API_2.Models;

namespace NKAP_API_2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderStatusController : ControllerBase
    {
        private NKAP_BOLTING_DB_4Context _db; //dependency injection for db
        public OrderStatusController(NKAP_BOLTING_DB_4Context db)
        { _db = db; }

    //    [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin,Employee")]
        [Route("GetOrderStatus")] //route
        [HttpGet] 
        //get Order Statuses (Read)
        public IActionResult get()
        {
            var OrderStatuses = _db.OrderStatuses.ToList();
            return Ok(OrderStatuses);
                
        }

    //    [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin,Employee")]
        [Route("GetOrderStatusByID/{id}")] //route
        [HttpGet]
        //get Order Statuses by ID (Read)
        public IActionResult get(int id)
        {
            var OrderStatus = _db.OrderStatuses.Find(id);
            return Ok(OrderStatus);
        }

    //    [Route("GetOrderStatusByDescription/{description}")] //route
        [HttpGet]
        //get Order Statuses by ID (Read)
        public IActionResult get(string description)
        {
            var OrderStatus = _db.OrderStatuses.FirstOrDefault(od => od.OrderStatusDescription == description);
            return Ok(OrderStatus);
        }

        [Route("CreateOrderStatus")] //route
        [HttpPost]
        //Add Order Status
        //Create a Model for table
        public IActionResult CreateOrderStatus(OrderStatusModel model) //reference the model
        {
            OrderStatus order = new OrderStatus();
            order.OrderStatusDescription = model.OrderStatusDescription; //attributes in table
            _db.OrderStatuses.Add(order);
            _db.SaveChanges();

            return Ok(order);
        }

        [Route("UpdateOrderStatus")] //route
        [HttpPut]
        //Update Order Status
        public IActionResult UpdateOrderStatus(OrderStatusModel model)
        {
            var order = _db.OrderStatuses.Find(model.OrderStatusID);
            order.OrderStatusDescription = model.OrderStatusDescription;
            _db.OrderStatuses.Attach(order); //Attach Record
            _db.SaveChanges();

            return Ok(order);
        }

        [Route("DeleteOrderStatus/{orderstatusid}")] //route
        [HttpDelete]
        //Delete Order Status
        public IActionResult DeleteOrderStatus(int orderstatusid)
        {
            var order = _db.OrderStatuses.Find(orderstatusid);
            _db.OrderStatuses.Remove(order); //Delete Record
            _db.SaveChanges();

            return Ok(order);
        }
    }
}