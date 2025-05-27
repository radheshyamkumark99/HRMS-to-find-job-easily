package com.portal;

import io.github.cdimascio.dotenv.Dotenv;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class JobPortalApplication {

	public static void main(String[] args) {
		Logger logger = LoggerFactory.getLogger(JobPortalApplication.class);
		SpringApplication.run(JobPortalApplication.class, args);
		String Ip = getPublicIP();
		logger.info(Ip);
	}
	public static String getPublicIP() {
		try {
			return new RestTemplate().getForObject("https://api64.ipify.org", String.class);
		} catch (Exception e) {
			return "Can't fetch IP";
		}
	}

}
