using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using T1_TalentOB.Models;

namespace T1_TalentOB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly MvptalentObContext _context;

        public SalesController(MvptalentObContext context)
        {
            _context = context;
        }


        public class SalesViewDetailDto
        {
            public long SalesId { get; set; }
            public string CustomerName { get; set; } = null!;
            public string StoreName { get; set; } = null!;
            public string ProductName { get; set; } = null!;
            public decimal ProductPrice { get; set; }
            public string OrderDateTime { get; set; }
        }

        public class SalesCreateDto
        {

            public int ProductId { get; set; }
            public int CustomerId { get; set; }
            public int StoreId { get; set; }

        }


        // GET: api/Sales
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sale>>> GetSales()
        {
            if (_context.Sales == null)
            {
                return NotFound();
            }
            var sales = await _context.Sales
                .Include(sale => sale.Customer)
                .Include(sale => sale.Product)
                .Include(sale => sale.Store)
                .ToListAsync();

            IEnumerable<SalesViewDetailDto> lstSaleItem = null;
            lstSaleItem = sales.Select(x => new SalesViewDetailDto
            {
                ProductName = x.Product.Name,
                ProductPrice = Math.Round(x.Product.Price, 2),  // change to 2 decimal
                CustomerName = x.Customer.Name,
                StoreName = x.Store.Name,
                OrderDateTime = x.DateSold.ToString("dd/MM/yyyy HH:mm:ss"),
                SalesId = x.Id
            }).ToList();


            // Format JSON with line breaks and indentation (to show break in Postman)
            var jsonSettings = new JsonSerializerSettings
            {
                Formatting = Formatting.Indented
            };

            var formattedJson = JsonConvert.SerializeObject(lstSaleItem, jsonSettings);

            return Content(formattedJson, "application/json");



            return Ok(lstSaleItem);
            

        }


        // GET: api/Sales/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sale>> GetSale(int id)
        {
          if (_context.Sales == null)
          {
              return NotFound();
          }
            var sale = await _context.Sales.FindAsync(id);

            if (sale == null)
            {
                return NotFound();
            }

            return sale;
        }

        // PUT: api/Sales/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSale(int id, Sale sale)
        {
            if (id != sale.Id)
            {
                return BadRequest();
            }

            _context.Entry(sale).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SaleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Sales
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("create")]

        public async Task<ActionResult<Sale>> PostSale(SalesCreateDto sale)
        {
            if (_context.Sales == null)
            {
                return Problem("Entity set 'MvptalentObContext.Sales'  is null.");
            }
            Sale objSale = new Sale
            {
                StoreId = sale.StoreId,
                CustomerId = sale.CustomerId,
                ProductId = sale.ProductId,
                DateSold = DateTime.Now
            };
            //sale.DateSold = DateTime.Now;

            _context.Sales.Add(objSale);
            await _context.SaveChangesAsync();



            //// Return the response with details

            //return CreatedAtAction("GetSale", new { id = sale.Id }, sale);
            return Ok(objSale);
        }


        //public async Task<ActionResult<Sale>> PostSale(Sale sale)
        //{
        //    if (_context.Sales == null)
        //    {
        //        return Problem("Entity set 'MvptalentObContext.Sales'  is null.");
        //    }
        //    sale.DateSold = DateTime.Now;

        //    _context.Sales.Add(sale);
        //    await _context.SaveChangesAsync();



        //    // Return the response with details

        //    return CreatedAtAction("GetSale", new { id = sale.Id }, sale);
        //}



        // DELETE: api/Sales/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSale(int id)
        {
            if (_context.Sales == null)
            {
                return NotFound();
            }
            var sale = await _context.Sales.FindAsync(id);
            if (sale == null)
            {
                return NotFound();
            }

            _context.Sales.Remove(sale);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SaleExists(int id)
        {
            return (_context.Sales?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
