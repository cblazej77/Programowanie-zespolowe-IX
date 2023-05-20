package com.pz.designmatch.Images;

import com.pz.designmatch.model.user.ArtistProfile;
import com.pz.designmatch.model.user.PortfolioImages;
import com.pz.designmatch.repository.*;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.ServletContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;
import java.util.Optional;


@Service
public class ImageService {
    private final ServletContext servletContext;
    private final ArtistProfileRepository artistProfileRepository;
    private final PortfolioImagesRepository portfolioImagesRepository;

    @Autowired
    public ImageService(ServletContext servletContext, ArtistProfileRepository artistProfileRepository,
                        PortfolioImagesRepository portfolioImagesRepository) {
        this.servletContext = servletContext;
        this.artistProfileRepository = artistProfileRepository;
        this.portfolioImagesRepository = portfolioImagesRepository;
    }

    //private final String UPLOAD_DIR = "C:/Users/User/Desktop/project_Zesp/Programowanie-zespolowe-IX/Backend/src/main/resources/upload2/images";

    @Transactional
    public String uploadProfileImage(String username, MultipartFile image, boolean isBannerImage) throws IOException, URISyntaxException {
        URL resourceUrl = getClass().getClassLoader().getResource("upload2/images");
        assert resourceUrl != null;
        Path uploadsPath = Paths.get(resourceUrl.toURI());
        if (!Files.exists(uploadsPath)) {
            Files.createDirectories(uploadsPath);
        }
        Optional<ArtistProfile> artistProfile = (Optional<ArtistProfile>) Optional.ofNullable(artistProfileRepository.findByUser_Username(username)
                .orElseThrow(() -> new EntityNotFoundException("Artist profile with username" + username + "not found")));
        ArtistProfile existingProfile = artistProfile.get();
        String imagePath = isBannerImage ? existingProfile.getProfileBannerUrl() : existingProfile.getProfileImageUrl();
        if (image.isEmpty()) {
            throw new IllegalArgumentException("file not uploaded");
        }
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(image.getOriginalFilename()));
        if (fileName == null || fileName.isEmpty()) {
            throw new IllegalArgumentException("File name cannot be null");
        }
        String extension = StringUtils.getFilenameExtension(fileName);
        if (!extension.equals("jpg") && !extension.equals("JPG") && !extension.equals("JPEG") && !extension.equals("jpeg") && !extension.equals("png") && !extension.equals("PNG")) {
            throw new IllegalArgumentException("file must be jpg, jpeg or png");
        }
        String newFileName = fileName + "_" + System.currentTimeMillis() + "." + extension;
        Path destinationPath = uploadsPath.resolve(newFileName);
        File dest = destinationPath.toFile();
        try {
            image.transferTo(dest);
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload profile image", e);
        }
        String newImagePath = "/images/" + newFileName;
        if (isBannerImage) {
            existingProfile.setProfileBannerUrl(newImagePath);
        } else {
            existingProfile.setProfileImageUrl(newImagePath);
        }
        artistProfileRepository.save(existingProfile);
        return newImagePath;
    }

    @Transactional
    public String uploadPortfolioImage(String username, MultipartFile image, String name, String description) throws IOException, URISyntaxException {
        URL resourceUrl = getClass().getClassLoader().getResource("upload2/images");
        assert resourceUrl != null;
        Path uploadsPath = Paths.get(resourceUrl.toURI());
        if (!Files.exists(uploadsPath)) {
            Files.createDirectories(uploadsPath);
        }
        Optional<ArtistProfile> artistProfile = Optional.ofNullable(artistProfileRepository.findByUser_Username(username)
                .orElseThrow(() -> new EntityNotFoundException("Artist profile with username" + username + "not found")));
        ArtistProfile existingProfile = artistProfile.get();

        String fileName = StringUtils.cleanPath(Objects.requireNonNull(image.getOriginalFilename()));
        if (fileName == null || fileName.isEmpty()) {
            throw new IllegalArgumentException("File name cannot be null");
        }
        String extension = StringUtils.getFilenameExtension(fileName);
        if (!extension.equals("jpg") && !extension.equals("JPG") && !extension.equals("JPEG") && !extension.equals("jpeg") && !extension.equals("png") && !extension.equals("PNG")) {
            throw new IllegalArgumentException("file must be jpg, jpeg or png");
        }
        String newFileName = fileName + "_" + System.currentTimeMillis() + "." + extension;
        Path destinationPath = uploadsPath.resolve(newFileName);
        File dest = destinationPath.toFile();
        try {
            image.transferTo(dest);
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload profile image", e);
        }
        String newImagePath = "/images/" + newFileName;
        PortfolioImages newPortfolioImage = new PortfolioImages(existingProfile, newImagePath, name, description);
        portfolioImagesRepository.save(newPortfolioImage);
        return newImagePath;
    }
}


//    @Transactional
//    public String getProfileImage(String username, boolean isBannerImage) {
//        Optional<ArtistProfile> artistProfile = artistProfileRepository.findByUser_Username(username);
//        ArtistProfile existingProfile = artistProfile.get();
//        String imagePath = isBannerImage ? existingProfile.getProfileBannerUrl() : existingProfile.getProfileImageUrl();
//        if (imagePath == null || imagePath.isEmpty()) {
//            throw new EntityNotFoundException("Profile image for artist with username " + username + " not found");
//        }
//        return imagePath;
//    }

//    @Transactional
//    public byte[] getPortfolioImage(Long id) throws IOException {
//        Optional<PortfolioImages> portfolioImages = portfolioImagesRepository.findById(id);
//        if (portfolioImages.isEmpty()) {
//            throw new RuntimeException("Profile image for artist with username " + id + " not found");
//        }
//        String imagePath = portfolioImages.get().getImageUrl();
//        String realPath = servletContext.getRealPath(imagePath);
////        String absolutePath = servletContext.getRealPath("/uploads");
////        File uploadedFile = new File(absolutePath, "your_file_name");
//        Path imagePathObj = Paths.get(realPath);
//
//        return Files.readAllBytes(imagePathObj);
//    }



