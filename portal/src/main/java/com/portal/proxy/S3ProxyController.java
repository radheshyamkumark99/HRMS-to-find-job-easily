package com.portal.proxy;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@RestController
@RequestMapping("/proxy")
public class S3ProxyController {
    private final WebClient webClient;

    public S3ProxyController(WebClient webClient) {
        this.webClient = webClient;
    }

    @PostMapping("/putObject")
    public ResponseEntity<String> getPresignedUrl(@RequestBody Map<String, String> payload) {
        String fileName = payload.get("fileName");
        String contentType = payload.get("contentType");

        try {
            // Forward the request to the original API

            String presignedUrl = webClient.post()
                    .uri("https://api.poltic.in/api/putObject")
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                    .bodyValue(Map.of("fileName", fileName, "contentType", contentType))
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            return ResponseEntity.ok(presignedUrl);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching presigned URL: " + e.getMessage());
        }
    }
}
