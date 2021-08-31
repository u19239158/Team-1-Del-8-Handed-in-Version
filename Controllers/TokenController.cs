using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using NKAP_API_2.Models;
using System.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace NKAP_API_2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private const string SECRET_KEY = "NKAPSECURITY2021";
        public static readonly SymmetricSecurityKey SIGNING_KEY = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(TokenController.SECRET_KEY));

        public string GenerateToken(RegisterModel model)
        {
            var token = new JwtSecurityToken(claims: new Claim[] 
            {
            new Claim(ClaimTypes.Name, model.UserUsername),
            new Claim(ClaimTypes.Role, model.UserRoleName),
            },
            notBefore : new DateTimeOffset(DateTime.Now).DateTime,
            expires : new DateTimeOffset(DateTime.Now.AddMinutes(60)).DateTime,
            signingCredentials : new SigningCredentials(SIGNING_KEY,SecurityAlgorithms.HmacSha256)
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}