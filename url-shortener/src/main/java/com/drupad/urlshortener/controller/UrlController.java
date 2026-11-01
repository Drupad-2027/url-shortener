package com.drupad.urlshortener.controller;

import com.drupad.urlshortener.dto.UrlRequest;
import com.drupad.urlshortener.service.UrlService;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.ResponseEntity;
import java.net.URI;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/")
public class UrlController {

    private final UrlService service;

    public UrlController(UrlService service) {
        this.service = service;
    }

    // Create short URL
    @PostMapping("shorten")
    public String shorten(@RequestBody UrlRequest request) {

        return service.shortenUrl(request.getLongUrl());
    }

    // Redirect to original URL
    @GetMapping("{shortCode}")
    public ResponseEntity<Void> redirect(@PathVariable String shortCode) {

        String longUrl = service.getOriginalUrl(shortCode);

        return ResponseEntity
                .status(302)
                .location(URI.create(longUrl))
                .build();
    }
}