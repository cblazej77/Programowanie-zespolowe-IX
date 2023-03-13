package com.pz.login.model.enums;

public enum City {
    REMOTE ("Zdalnie"),
    WARSZAWA ("Warszawa"),
    KRAKOW ("Kraków"),
    WROCLAW ("Wrocław"),
    LODZ ("Łódź"),
    POZNAN ("Poznań"),
    GDANSK ("Gdańsk"),
    SZCZECIN ("Szczecin"),
    BYDGOSZCZ ("Bydgoszcz"),
    LUBLIN ("Lublin");

    private final String displayName;

    City(String displayName) {
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
