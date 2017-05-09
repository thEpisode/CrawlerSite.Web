using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using WebApplication.Models.Entities;
using WebApplication.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication.Services
{
    public class VoucherService
    {
        private ConnectionService _connection;

        public VoucherService()
        {
            _connection = new ConnectionService();
        }

        public async Task<dynamic> VerifyVoucher(string VoucherId)
        {
            string jsonResult =await _connection.SimplePostData("/Payment/Voucher/VerifyVoucher", String.Empty, HttpSimpleParameters.Of("VoucherId", VoucherId));
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> GenerateVoucher(object voucherData, string Token)
        {
            string jsonResult = await _connection.PostData("/Payment/Voucher/Generate", Token, voucherData);
            return JObject.Parse(jsonResult);
        }
    }
}