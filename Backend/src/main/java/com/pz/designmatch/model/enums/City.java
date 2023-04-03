package com.pz.designmatch.model.enums;

import java.util.List;
import java.util.stream.Collectors;

public enum City {
    REMOTE("Zdalnie"),
    WARSZAWA("Warszawa"),
    KRAKOW("Kraków"),
    WROCLAW("Wrocław"),
    LODZ("Łódź"),
    POZNAN("Poznań"),
    GDANSK("Gdańsk"),
    SZCZECIN("Szczecin"),
    BYDGOSZCZ("Bydgoszcz"),
    LUBLIN("Lublin");
    private final String displayName;

    City(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    public static City fromDisplayName(String text) {
        for (City city : City.values()) {
            if (city.displayName.equalsIgnoreCase(text)) {
                return city;
            }
        }
        return null;
    }

    public static List<String> getDisplayNames() {
        return List.of(City.values()).stream().map(City::getDisplayName).collect(Collectors.toList());
    }

}
