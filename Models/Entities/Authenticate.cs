namespace CrawlerSite.Models.Entities
{
    public class Authenticate
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public string AuthToken { get; set; }
        public string UserId { get; set; }
    }
}