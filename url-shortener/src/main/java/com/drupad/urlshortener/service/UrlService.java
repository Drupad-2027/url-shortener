package com.drupad.urlshortener.service;

import com.drupad.urlshortener.model.Url;
import com.drupad.urlshortener.repository.UrlRepository;
import com.drupad.urlshortener.util.Base62;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import java.util.concurrent.TimeUnit;

import java.time.LocalDateTime;

@Service
public class UrlService {

    private final UrlRepository repository;
    private final StringRedisTemplate redisTemplate;

    public UrlService(UrlRepository repository, StringRedisTemplate redisTemplate) {
        this.repository = repository;
        this.redisTemplate = redisTemplate;
    }

    public String shortenUrl(String longUrl) {

        Url url = new Url();
        url.setLongUrl(longUrl);
        url.setCreatedAt(LocalDateTime.now());

        // Save first to generate ID
        Url saved = repository.save(url);

        String shortCode = Base62.encode(saved.getId());

        saved.setShortCode(shortCode);
        repository.save(saved);

        return shortCode;
    }

    public String getOriginalUrl(String shortCode) {

        // 1. Check Redis cache
        String cachedUrl = redisTemplate.opsForValue().get(shortCode);

        if (cachedUrl != null) {
            return cachedUrl;
        }

        // 2. Fetch from DB if not in cache
        Url url = repository.findByShortCode(shortCode)
                .orElseThrow(() -> new RuntimeException("URL not found"));

        // 3. Store in Redis
        redisTemplate.opsForValue().set(shortCode, url.getLongUrl(), 10, TimeUnit.MINUTES);

        // 4. Update click count
        url.setClickCount(url.getClickCount() + 1);
        repository.save(url);

        return url.getLongUrl();
    }
}