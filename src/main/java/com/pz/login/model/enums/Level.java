package com.pz.login.model.enums;

public enum Level {
    JUNIOR ("Junior"),
    MID ("Mid"),
    SENIOR ("Senior");

    private final String displayName;

    Level(String displayName) {
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
