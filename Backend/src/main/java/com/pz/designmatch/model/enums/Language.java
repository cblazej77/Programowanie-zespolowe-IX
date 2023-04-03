package com.pz.designmatch.model.enums;

import java.util.List;
import java.util.stream.Collectors;

public enum Language {
    POLISH("Polski"),
    ENGLISH("Angielski"),
    GERMAN("Niemiecki"),
    FRENCH("Francuski"),
    SPANISH("Hiszpański"),
    ITALIAN("Włoski"),
    RUSSIAN("Rosyjski"),
    CHINESE("Chiński");
    private final String displayName;

    Language(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    public static Language fromDisplayName(String text) {
        for (Language language : Language.values()) {
            if (language.displayName.equalsIgnoreCase(text)) {
                return language;
            }
        }
        return null;
    }

    public static List<String> getDisplayNames() {
        return List.of(Language.values()).stream().map(Language::getDisplayName).collect(Collectors.toList());
    }
}
