package com.pz.designmatch.model.enums;

import lombok.Getter;

@Getter
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

    public static Category fromDisplayName(String displayName) {
        for (Category category : Category.values()) {
            if (category.displayName.equalsIgnoreCase(displayName)) {
                return category;
            }
        }
        return null;
    }

    public String getDisplayName() {
        return displayName;
    }
}
