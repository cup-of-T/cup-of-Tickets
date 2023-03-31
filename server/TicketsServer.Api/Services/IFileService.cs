public interface IFileService
{
    public Task<string> UploadImage(IFormFile imageFile);
    public void DeleteImage(string imageUrl);
}