package com.pz.designmatch.Images;

import com.pz.designmatch.model.user.PortfolioImages;
import com.pz.designmatch.repository.ArtistProfileRepository;
import com.pz.designmatch.repository.PortfolioImagesRepository;
import com.pz.designmatch.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@RestController
@RequestMapping("/artist/images")
public class ImageController {
    public static final String apiVersionAccept = "application/json";
    private final ImageService imageService;
    private final ArtistProfileRepository artistProfileRepository;
    private final UserRepository userRepository;
    private final PortfolioImagesRepository portfolioImagesRepository;

    @Autowired
    public ImageController(ImageService imageService, ArtistProfileRepository artistProfileRepository,
                           UserRepository userRepository, PortfolioImagesRepository portfolioImagesRepository) {
        this.imageService = imageService;
        this.artistProfileRepository = artistProfileRepository;
        this.userRepository = userRepository;
        this.portfolioImagesRepository = portfolioImagesRepository;
    }



    @PostMapping(value = "/uploadImages", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = apiVersionAccept)
    public ResponseEntity<String> uploadImageOrBannerProfile(@RequestParam String username, @RequestParam("image") MultipartFile multipartFile,
                                                             @RequestParam(name = "isBanner", defaultValue = "false") boolean isBanner
    ) throws IOException {
        //String filename = cleanPath(multipartFile.getOriginalFilename());
//        String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
//        Optional<ArtistProfile> artistProfile = artistProfileRepository.findByUser_Username(username);
        //artistProfile.setProfileImageUrl(filename);
        //ArtistProfile savedArtistProfile = artistProfileRepository.save(artistProfile);
        String imagePath = imageService.uploadProfileImage(username, multipartFile, isBanner);
        //String uploadDir = "artist-profile/" + savedArtistProfile.getId();
        //FileUploadUtil.saveFile(uploadDir, filename, multipartFile);
        return ResponseEntity.ok(imagePath);
    }

    @PostMapping(value = "/uploadPortfolioImage", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = apiVersionAccept)
    public ResponseEntity<String> uploadPortfolioImage(@RequestParam String username,
                                                       @RequestParam("image") MultipartFile multipartFile,
                                                       @RequestParam String name,
                                                       @RequestParam String description) throws IOException {
        String imagePath = imageService.uploadPortfolioImage(username, multipartFile, name, description);
        //String uploadDir = "artist-profile/" + savedArtistProfile.getId();
        //FileUploadUtil.saveFile(uploadDir, filename, multipartFile);
        return ResponseEntity.ok(imagePath);
    }

    @GetMapping(value = "/getProfileImage", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<String> getProfileImage(@RequestParam String username,
                                                  @RequestParam(name = "isBanner", defaultValue = "false") boolean isBanner) throws IOException {
//        Optional<ArtistProfile> artistProfile = artistProfileRepository.findByUser_Username(username);
//        ArtistProfile existingProfile = artistProfile.get();
//        String imagePath = existingProfile.getProfileImageUrl();
        String imagePath = imageService.getProfileImage(username, isBanner);
        String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
        String imageUrl = baseUrl + imagePath;
        return ResponseEntity.ok(imageUrl);
    }
//    @GetMapping(value = "/getPortfolioImage")
//    public ResponseEntity<byte[]> getPortfolioImage(@RequestParam Long id) throws IOException {
////        Optional<ArtistProfile> artistProfile = artistProfileRepository.findByUser_Username(username);
////        ArtistProfile existingProfile = artistProfile.get();
////        String imagePath = existingProfile.getProfileImageUrl();
//        byte[] imageBytes = artistProfileService.getPortfolioImage(id);
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.IMAGE_JPEG);
//        headers.setContentLength(imageBytes.length);
//        return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
////        String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
////        String imageUrl = baseUrl + imagePath;
////        return ResponseEntity.ok(imageUrl);
//    }

    @GetMapping(value = "/getPortfolioImage", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getPortfolioImage(@RequestParam Long id) throws IOException {
//        Optional<ArtistProfile> artistProfile = artistProfileRepository.findByUser_Username(username);
//        ArtistProfile existingProfile = artistProfile.get();
//        String imagePath = existingProfile.getProfileImageUrl();
        Optional<PortfolioImages> portfolioImages = portfolioImagesRepository.findById(id);
        String imagePath = portfolioImages.get().getImageUrl();
        Path path = Paths.get(imagePath);
        byte[] imageBytes = Files.readAllBytes(path);
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageBytes);
//        String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
//        String imageUrl = baseUrl + imagePath;
//        return ResponseEntity.ok(imageUrl);
    }
}
