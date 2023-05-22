package com.pz.designmatch.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PortfolioEntryResponse {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("name")
    private String name;

    @JsonProperty("description")
    private String description;

    public PortfolioEntryResponse(Long id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}
