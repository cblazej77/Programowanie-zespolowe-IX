package com.pz.designmatch.model.enums;

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

    @Override
    public String toString() {
        return displayName;
    }

    public String[] getLanguages() {
        String[] languages = new String[Language.values().length];
        for (int i = 0; i < Language.values().length; i++) {
            languages[i] = Language.values()[i].getDisplayName();
        }
        return languages;
    }
}
