package com.pz.login.model.enums;

public enum Category {
    LOGO_AND_IDENTITY("Logo i identyfikacja wizualna"),
    WEB_AND_MOBILE("Strony internetowe i aplikacje mobilne"),
    MARKETING_AND_ADVERTISEMENT("Marketing i reklama"),
    CLOTHING_AND_MERCHANDISE("Odzież i merchandising"),
    ART_AND_ILLUSTRATION("Sztuka i ilustracje"),
    PACKAGING_AND_LABELS("Opakowania i etykiety");
    private final String displayName;

    Category(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    @Override
    public String toString() {
        return displayName;
    }
}
