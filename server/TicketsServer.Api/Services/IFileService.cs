public interface IFileService
{
    public Task<string> UploadImage(IFormFile imageFile);
}