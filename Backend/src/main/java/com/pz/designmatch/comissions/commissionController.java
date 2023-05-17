package com.pz.designmatch.comissions;

import com.pz.designmatch.artistFilter.ArtistProfileSpecification;
import com.pz.designmatch.dto.response.ShortProfileDto;
import com.pz.designmatch.exception.CommissionNotFound;
import com.pz.designmatch.model.Commission;
import com.pz.designmatch.model.enums.*;
import com.pz.designmatch.model.user.ArtistProfile;
import com.pz.designmatch.repository.CommissionRepository;
import com.pz.designmatch.service.ArtistProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.tags.form.TagWriter;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/commission")
public class commissionController {
    private final commissionService commissionService;
    public static final String apiVersionAccept = "application/json";

    @Autowired
    private CommissionRepository commissionRepository;

    public commissionController(com.pz.designmatch.comissions.commissionService commissionService, CommissionRepository commissionRepository) {
        this.commissionService = commissionService;
        this.commissionRepository = commissionRepository;
    }

    @PutMapping (value = "/UpdateCommission", produces = apiVersionAccept, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<commissionDto> createCommission(@RequestParam String title, @RequestBody commissionDto commissionDto) {
        try {
            commissionDto updateComm = commissionService.UpdateOrCreateCommissionByTitle(title, commissionDto);
            return ResponseEntity.ok(updateComm);
        } catch (Exception ex) {
            throw new RuntimeException("Internal server error (updating)");
        }
    }
    @PostMapping(value = "/CreateCommission", produces = apiVersionAccept, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<commissionDto> updateCommission(@RequestBody commissionDto commissionDto){
        try{
            commissionDto newComm = commissionService.CreateCommission(commissionDto);
            return ResponseEntity.ok(newComm);
        } catch (Exception ex){
            throw new RuntimeException("Internal server error (creation)");
        }
    }

    @GetMapping(value = "/getCommissions", produces = apiVersionAccept)
    public ResponseEntity<commissionDto> getCommissionByTitle(@RequestParam Long id){
        commissionDto commission = commissionService.getCommissionDtoByID(id);
        return ResponseEntity.status(HttpStatus.OK.value()).body(commission);
    }

    @PutMapping(value = "/setComplited", produces = apiVersionAccept)
    public ResponseEntity<commissionDto> setComplitedCommission(@RequestParam Long id){
        commissionDto commissionCompleted = commissionService.setCommissionComplited(id);
        return ResponseEntity.status(HttpStatus.OK.value()).body(commissionCompleted);
    }

    @PostMapping(value = "/filterCommissions", produces = apiVersionAccept, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Page<commissionDto>> filterCommissions(@RequestBody commissionFilterDto requstComm,
                                                                @RequestParam(defaultValue = "0", name = "page") int page,
                                                                @RequestParam(defaultValue = "10", name = "size") int size){
        Specification<Commission> specification = Specification.where(null);
        if (requstComm.getLevel() != null && !requstComm.getLevel().isEmpty()) {
            List<Level> levelList = new ArrayList<>();
            for (String level : requstComm.getLevel()) {
                Level level1 = Level.fromDisplayName(level);
                if (level1 != null) {
                    levelList.add(level1);
                } else {
                    System.out.println("Error value: " + level);
                }
            }
            specification = specification.and(commissionSpecification.hasLevel(levelList));
        }
        if (requstComm.getLocation() != null && !requstComm.getLocation().isEmpty()) {
            List<City> cityList = new ArrayList<>();
            for (String city : requstComm.getLocation()) {
                City city1 = City.fromDisplayName(city);
                if (city1 != null) {
                    cityList.add(city1);
                } else {
                    System.out.println("Error value: " + city);
                }
            }
            specification = specification.and(commissionSpecification.hasCity(cityList));
        }
        if (requstComm.getSkills() != null && !requstComm.getSkills().isEmpty()) {
            List<Skill> skillList = new ArrayList<>();
            for (String skillName : requstComm.getSkills()) {
                Skill skill = Skill.fromDisplayName(skillName);
                if (skill != null) {
                    skillList.add(skill);
                } else {
                    System.out.println("Error value: " + skillName);
                }
            }
            specification = specification.and(commissionSpecification.hasSkills(skillList));
        }
        if (requstComm.getLanguages() != null && !requstComm.getLanguages().isEmpty()) {
            List<Language> languageList = new ArrayList<>();
            for (String language : requstComm.getLanguages()) {
                Language lang = Language.fromDisplayName(language);
                if (lang != null) {
                    languageList.add(lang);
                } else {
                    System.out.println("Error value: " + language);
                }
            }
            specification = specification.and(commissionSpecification.hasLanguage(languageList));
        }
        if (requstComm.getTags() != null && !requstComm.getTags().isEmpty()) {
            List<Tag> tagList = new ArrayList<>();
            for (String tag : requstComm.getTags()) {
                Tag tag1 = Tag.fromDisplayName(tag);
                if (tag1 != null) {
                    tagList.add(tag1);
                } else {
                    System.out.println("Error value: " + tag);
                }
            }
            specification = specification.and(commissionSpecification.hasTag(tagList));
        }
        Pageable paging = PageRequest.of(page, size);
        Page<Commission> commissionPage = commissionRepository.findAll(specification, paging);
        Page<commissionDto> commissionDtos = commissionPage.map(commissionService::mapToCommissionDto);
        return ResponseEntity.ok(commissionDtos);
    }

}
