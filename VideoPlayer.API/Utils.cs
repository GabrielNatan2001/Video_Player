namespace API
{
    public static class Utils
    {
        public static async Task<string> Upload(IFormFile file, string fileName)
        {
            try
            {
                string path = System.IO.Directory.GetCurrentDirectory() + "\\Upload\\";
                path += fileName + ".mp4";

                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                return path;
            }
            catch (Exception e)
            {
                return "";
            }
        }
    }
}
