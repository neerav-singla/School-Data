using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using School_Data.Models;

namespace School_Data.Controllers
{
    public class UploadFileController
    {
        [HttpPost]
        [Route("UploadFile")]
        public String UploadFile(FileModel fileModel)
        {
            try
            {
                string path = "";
                if(fileModel.Type == "teacher")
                {
                     path = Path.Combine("D:\\Task\\School Data\\School Data UI\\schooldata\\src\\TeacherImages", fileModel.file?.FileName ?? "");
                }
                else{
                     path = Path.Combine("D:\\Task\\School Data\\School Data UI\\schooldata\\src\\StudentImages", fileModel.file?.FileName ?? "");
                }
                using (Stream stream = new FileStream(path, FileMode.Create))
                {
                    fileModel?.file?.CopyTo(stream);
                }
                return fileModel?.file?.FileName ?? "";
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }
    }
}
