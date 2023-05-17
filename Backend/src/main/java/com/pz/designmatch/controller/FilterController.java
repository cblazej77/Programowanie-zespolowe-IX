package com.pz.designmatch.controller;

import com.pz.designmatch.dto.response.AvailableSkillsCategoriesResponse;
import com.pz.designmatch.model.enums.City;
import com.pz.designmatch.model.enums.Language;
import com.pz.designmatch.model.enums.Level;
import com.pz.designmatch.model.enums.Tag;
import com.pz.designmatch.util.AvailableCategoriesDtoBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.pz.designmatch.constants.Constants.apiVersionAccept;

@RestController
@RequestMapping("/api/filter")
public class FilterController {

    @GetMapping(value = "/getAvailableCategories", produces = apiVersionAccept)
    public ResponseEntity<AvailableSkillsCategoriesResponse> getAvailableCategories() {
        AvailableSkillsCategoriesResponse categoryOptionsDto = AvailableCategoriesDtoBuilder.getAvailableCategoriesDto();
        return ResponseEntity.ok(categoryOptionsDto);
    }

    @GetMapping(value = "/getAvailableCities", produces = apiVersionAccept)
    public ResponseEntity<List<String>> getAvailableCities() {
        List<String> cities = City.getAvailableCities();
        return ResponseEntity.ok(cities);
    }

    @GetMapping(value = "/getAvailableLevels", produces = apiVersionAccept)
    public ResponseEntity<List<String>> getAvailableLevels() {
        List<String> levels = Level.getAvailableLevels();
        return ResponseEntity.ok(levels);
    }

    @GetMapping(value = "/getAvailableTags", produces = apiVersionAccept)
    public ResponseEntity<List<String>> getAvailableTags() {
        List<String> tags = Tag.getAvailableTags();
        return ResponseEntity.ok(tags);
    }

    @GetMapping(value = "/getAvailableLanguages", produces = apiVersionAccept)
    public ResponseEntity<List<String>> getAvailableLanguages() {
        List<String> languages = Language.getAvailableLanguages();
        return ResponseEntity.ok(languages);
    }
}
