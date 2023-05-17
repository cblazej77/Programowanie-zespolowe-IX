package com.pz.designmatch.model.enums;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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

    public static City fromDisplayName(String text) {
        for (City city : City.values()) {
            if (city.displayName.equalsIgnoreCase(text)) {
                return city;
            }
        }
        return null;
    }

    public static List<String> getAvailableCities() {
        return Stream.of(City.values()).map(City::getDisplayName).collect(Collectors.toList());
    }

    public String getDisplayName() {
        return displayName;
    }
}
