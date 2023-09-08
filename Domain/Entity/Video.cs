using System.ComponentModel.DataAnnotations;

namespace Data.Entity
{
    public class Video
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string PathVideo { get; set; }
    }
}
