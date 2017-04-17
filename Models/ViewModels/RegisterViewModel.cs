namespace WebApplication.Models.ViewModels
{
    public class RegisterViewModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public bool AcceptTerms { get; set; }
        public int State { get; set; }
        public string[] Work { get; set; }
    }
}