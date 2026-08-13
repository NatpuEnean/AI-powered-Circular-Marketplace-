package com.example.backend.model;

public enum Role {
    USER("ROLE_USER"),
    SELLER("ROLE_SELLER"),
    NGO("ROLE_NGO");

    private final String authority;

    Role(String authority) {
        this.authority = authority;
    }

    public String getAuthority() {
        return authority;
    }
}
