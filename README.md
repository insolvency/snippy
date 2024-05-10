# Snippy

Image uploader (very not finished)

![Snippy preview](preview.png)

## API Routes

 - POST `/auth/login`
 - PATCH `/auth/reset` (Authenticated - Allows API Key)
 - GET `/user/me` (Authenticated)
 - POST `/file/upload` (Authenticated - Allows API Key)

## Example Sharex Configuration

```json
{
  "Version": "14.1.0",
  "Name": "Snippy",
  "DestinationType": "ImageUploader",
  "RequestMethod": "POST",
  "RequestURL": "http://localhost:3000/file/upload",
  "Headers": {
    "Authorization": "Bearer TOKEN"
  },
  "Body": "MultipartFormData",
  "FileFormName": "files",
  "URL": "{json:files[0].imageUrl}",
  "DeletionURL": "{json:files[0].deleteUrl}"
}
```