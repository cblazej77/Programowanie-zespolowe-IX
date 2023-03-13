package com.pz.login.model.enums;

public enum Tag {
    AGRICULTURE("Agrokultura"),
    ARCHITECTURE("Architektura"),
    BANKING("Bankowość"),
    SECURITY("Bezpieczeństwo"),
    BUSINESS("Biznes"),
    CONSTRUCTION("Budownictwo"),
    EDUCATION("Edukacja"),
    FITNESS("Fitness"),
    FLORISTRY("Florystyka"),
    PHOTOGRAPHY("Fotografia"),
    GASTRONOMY("Gastronomia"),
    GAMES("Gry"),
    IT("IT"),
    INTERNET("Internet"),
    COSMETICS_AND_BEAUTY("Kosmetyki i uroda"),
    SPACE("Kosmos"),
    FURNITURE("Meble"),
    FASHION("Moda"),
    AUTOMOTIVE("Motoryzacja"),
    REAL_ESTATE("Nieruchomości"),
    NONPROFIT("Nonprofit"),
    MEDICAL("Ochrona zdrowia"),
    LANDSCAPING("Ogród i krajobraz"),
    CHILDCARE("Opieka nad dziećmi"),
    POLITICS("Polityka"),
    LAW("Prawo"),
    PROGRAMMING("Programowanie"),
    INDUSTRIAL("Przemysł"),
    ACCOUNTING_AND_FINANCE("Rachunkowość i finanse"),
    ENTERTAINMENT("Rozrywka"),
    SPORTS("Sport"),
    RETAIL("Sprzedaż detaliczna"),
    CLEANING_AND_MAINTENANCE("Sprzątanie i konserwacja"),
    WEEDING("Ślub"),
    ENVIRONMENT("Środowisko"),
    ART_AND_DESIGN("Sztuka i design"),
    TECHNOLOGY("Technologia"),
    ANIMALS("Zwierzęta");

    private final String displayName;

    Tag(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    @Override
    public String toString() {
        return displayName;
    }

    public String[] getTags() {
        String[] tags = new String[Tag.values().length];
        for (int i = 0; i < Tag.values().length; i++) {
            tags[i] = Tag.values()[i].getDisplayName();
        }
        return tags;
    }
}
