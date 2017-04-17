namespace WebApplication.Models.Entities
{
    public class ApiResult
    {
        public string Message { get; set; }
        public bool Success { get; set; }
        public dynamic Result { get; set; }
    }
}