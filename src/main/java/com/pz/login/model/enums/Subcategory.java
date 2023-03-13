package com.pz.login.model.enums;

public enum Subcategory {
    LOGO(Category.LOGO_AND_IDENTITY, "Logo"),
    IDENTITY(Category.LOGO_AND_IDENTITY, "Identyfikacja wizualna"),
    BUISNESS_CARD(Category.LOGO_AND_IDENTITY, "Wizytówka"),
    WEBPAGE(Category.WEB_AND_MOBILE, "Strona internetowa"),
    WORDPRESS_THEME(Category.WEB_AND_MOBILE, "Motyw WordPress"),
    ICON_OR_BUTTON(Category.WEB_AND_MOBILE, "Ikona lub przycisk"),
    MOBILE_APP(Category.WEB_AND_MOBILE, "Aplikacja mobilna"),
    BANNER(Category.MARKETING_AND_ADVERTISEMENT, "Baner"),
    FLYER(Category.MARKETING_AND_ADVERTISEMENT, "Broszura"),
    POSTER(Category.MARKETING_AND_ADVERTISEMENT, "Plakat"),
    INFOGRAPHIC(Category.MARKETING_AND_ADVERTISEMENT, "Infografika"),
    CARWRAP(Category.MARKETING_AND_ADVERTISEMENT, "Okleina samochodowa"),
    MENU(Category.MARKETING_AND_ADVERTISEMENT, "Menu"),
    T_SHIRT(Category.CLOTHING_AND_MERCHANDISE, "T-shirt"),
    CLOTHING(Category.CLOTHING_AND_MERCHANDISE, "Inne ubrania"),
    ACCESORY(Category.CLOTHING_AND_MERCHANDISE, "Akcesorium"),
    CUP(Category.CLOTHING_AND_MERCHANDISE, "Kubek"),
    STICKER(Category.CLOTHING_AND_MERCHANDISE, "Naklejka, magnes lub przypinka"),
    ILLUSTRATION(Category.ART_AND_ILLUSTRATION, "Ilustracja lub grafika"),
    ALBUM_COVER(Category.ART_AND_ILLUSTRATION, "Okładka albumu"),
    MASCOT(Category.ART_AND_ILLUSTRATION, "Maskotka"),
    TATTOO(Category.ART_AND_ILLUSTRATION, "Tatuaż"),
    MODEL_3D(Category.ART_AND_ILLUSTRATION, "Model 3D"),
    PACKAGING(Category.PACKAGING_AND_LABELS, "Opakowanie"),
    LABEL(Category.PACKAGING_AND_LABELS, "Etykieta");
    private final Category category;
    private final String displayName;

    Subcategory(Category category, String displayName) {
        this.category = category;
        this.displayName = displayName;
    }

    public Category getCategory() {
        return category;
    }

    public String getDisplayName() {
        return displayName;
    }

    @Override
    public String toString() {
        return displayName;
    }
}
