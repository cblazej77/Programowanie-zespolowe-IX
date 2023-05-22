package com.pz.designmatch.util;

import org.springframework.core.io.ClassPathResource;
import org.springframework.util.StreamUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

public class ImageUtils {
    public static byte[] getImageFromPath(String imagePath) {
        ClassPathResource imageResource = new ClassPathResource("uploads" + imagePath);
        InputStream inputStream;
        try {
            inputStream = imageResource.getInputStream();
            return StreamUtils.copyToByteArray(inputStream);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static String generateImagePath(MultipartFile image) {
        Path uploadsPath;
        try {
            uploadsPath = Paths.get(Objects.requireNonNull(ImageUtils.class.getClassLoader().getResource("uploads/images")).toURI());
            Files.createDirectories(uploadsPath);
        } catch (URISyntaxException | IOException e) {
            throw new RuntimeException("Nie udało się utworzyć katalogu uploads", e);
        }

        if (image.isEmpty()) {
            throw new IllegalArgumentException("Nie wybrano pliku");
        }

        String fileName = Objects.requireNonNull(image.getOriginalFilename(), "Nazwa pliku nie może być pusta");
        String extension = StringUtils.getFilenameExtension(fileName);
        List<String> allowedExtensions = Arrays.asList("jpg", "jpeg", "png");
        if (!allowedExtensions.contains(Objects.requireNonNull(extension).toLowerCase())) {
            throw new IllegalArgumentException("Plik musi mieć rozszerzenie jpg, jpeg lub png");
        }

        String newFileName = fileName + "_" + System.currentTimeMillis() + "." + extension;
        Path destinationPath = uploadsPath.resolve(newFileName);
        File dest = destinationPath.toFile();

        try {
            image.transferTo(dest);
        } catch (IOException e) {
            throw new RuntimeException("Nie udało się uploadwoać pliku", e);
        }

        return "/images/" + newFileName;
    }
}
