﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PublicLibrarySystem_API.Services;

namespace PublicLibrarySystem_API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly ITokenService _tokenService;
        public TokenController(ITokenService tokenService)
        {
            _tokenService = tokenService;
        }

        [HttpGet]
        [Route("GetToken")]
        public IActionResult GetToken(string userId)
        {
            try
            {
                var token = _tokenService.GenerateToken(userId);
                return Ok(token);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }
    }
}
