using Data.Entity;
using System.ComponentModel.DataAnnotations;

namespace API.DataTransferObject
{
    public class VideoDto
    {
        [Required]
        public string Titulo { get; set; }
        [Required]
        public IFormFile file { get; set; }


        public Video dtoToEntity()
        {
            Video video = new Video()
            {
                Titulo = Titulo
            };

            return video;
        }
    }
}
