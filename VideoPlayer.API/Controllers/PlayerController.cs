using API;
using API.DataTransferObject;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repositories.Interface;

namespace VideoPlayer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayerController : ControllerBase
    {
        private readonly IVideoRepository _videoRepository;
        public PlayerController(IVideoRepository videoRepository)
        {
            _videoRepository = videoRepository;
        }

        [HttpGet]
        [Route("Player/{Id}")]
        public async Task<IActionResult> Player(int Id)   
        {
            var entity = await _videoRepository.GetById(Id);

            if (entity == null) return BadRequest();

            if (!System.IO.File.Exists(entity.PathVideo))
            {
                return NotFound("Vídeo não encontrado");
            }

            //Response.Headers.Add("Content-Disposition", "inline; filename=video-info.json");
            //Response.Headers.Add("Content-Length", entity.Titulo.Length.ToString());
            //Response.Headers.Add("Content-Type", "application/json");

            //await Response.WriteAsync(entity.Titulo);

            using (var videoStream = new FileStream(entity.PathVideo, FileMode.Open, FileAccess.Read, FileShare.Read, 4096, true))
            {
                Response.Headers.Add("Content-Disposition", "inline; filename=video.mp4");
                Response.Headers.Add("Content-Length", videoStream.Length.ToString());
                Response.Headers.Add("Content-Type", "video/mp4");

                await videoStream.CopyToAsync(Response.Body);
                await Response.Body.FlushAsync();
            }

            return new EmptyResult();
        }

        [HttpGet]
        [Route("GetAll")]
        public async Task<IActionResult> Get()
        {
            var result = await _videoRepository.GetAll();
            return Ok(result);
        }

        [HttpPost]
        [Route("Upload")]
        [DisableRequestSizeLimit]
        [RequestFormLimits(ValueLengthLimit = int.MaxValue, MultipartBodyLengthLimit = int.MaxValue)]
        public async Task<IActionResult> Upload([FromForm] VideoDto dto)   
        {
            if (!ModelState.IsValid) return BadRequest();

            var path = await Utils.Upload(dto.file, dto.Titulo);

            if (path.Equals("")) return BadRequest();

            var entity = dto.dtoToEntity();
            entity.PathVideo = path;

            await _videoRepository.Insert(entity);

            return Ok(path);
        }
    }
}
