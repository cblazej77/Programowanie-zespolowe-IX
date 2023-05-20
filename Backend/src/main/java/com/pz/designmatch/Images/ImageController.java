package com.pz.designmatch.Images;

import com.pz.designmatch.model.user.ArtistProfile;
import com.pz.designmatch.model.user.PortfolioImages;
import com.pz.designmatch.repository.ArtistProfileRepository;
import com.pz.designmatch.repository.PortfolioImagesRepository;
import com.pz.designmatch.repository.UserRepository;
import jakarta.servlet.ServletContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.*;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@RestController
@RequestMapping("/public/api/artist/images")
public class ImageController {
    private final ServletContext servletContext;
    public static final String apiVersionAccept = "application/json";
    private final ImageService imageService;
    private final ArtistProfileRepository artistProfileRepository;
    private final UserRepository userRepository;
    private final PortfolioImagesRepository portfolioImagesRepository;

    @Autowired
    public ImageController(ServletContext servletContext, ImageService imageService, ArtistProfileRepository artistProfileRepository,
                           UserRepository userRepository, PortfolioImagesRepository portfolioImagesRepository) {
        this.servletContext = servletContext;
        this.imageService = imageService;
        this.artistProfileRepository = artistProfileRepository;
        this.userRepository = userRepository;
        this.portfolioImagesRepository = portfolioImagesRepository;
    }



    @PostMapping(value = "/uploadImages", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = apiVersionAccept)
    public ResponseEntity<String> uploadImageOrBannerProfile(@RequestParam String username, @RequestParam("image") MultipartFile multipartFile,
                                                             @RequestParam(name = "isBanner", defaultValue = "false") boolean isBanner
    ) throws IOException, URISyntaxException {
        String imagePath = imageService.uploadProfileImage(username, multipartFile, isBanner);
        return ResponseEntity.ok(imagePath);
    }

    @PostMapping(value = "/uploadPortfolioImage", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = apiVersionAccept)
    public ResponseEntity<String> uploadPortfolioImage(@RequestParam String username,
                                                       @RequestParam("image") MultipartFile multipartFile,
                                                       @RequestParam String name,
                                                       @RequestParam String description) throws IOException, URISyntaxException {
        String imagePath = imageService.uploadPortfolioImage(username, multipartFile, name, description);
        return ResponseEntity.ok(imagePath);
    }

    @GetMapping(value = "/getProfileImage", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getProfileImage(@RequestParam String username,
                                                  @RequestParam(name = "isBanner", defaultValue = "false") boolean isBanner) throws IOException {
        Optional<ArtistProfile> profileImage = artistProfileRepository.findByUser_Username(username);
        String imagePath = isBanner ? profileImage.get().getProfileBannerUrl() : profileImage.get().getProfileImageUrl();
        ClassPathResource imageResource = new ClassPathResource("upload2" + imagePath);
        InputStream inputStream = imageResource.getInputStream();
        byte[] imageBytes = StreamUtils.copyToByteArray(inputStream);
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageBytes);
    }

    @GetMapping(value = "/getPortfolioImage", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getPortfolioImage(@RequestParam Long id) throws IOException {
        Optional<PortfolioImages> portfolioImages = portfolioImagesRepository.findById(id);
        String imagePath = portfolioImages.get().getImageUrl();
        ClassPathResource imageResource = new ClassPathResource("upload2" + imagePath);
        InputStream inputStream = imageResource.getInputStream();
        byte[] imageBytes = StreamUtils.copyToByteArray(inputStream);
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageBytes);

    }
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
