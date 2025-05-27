package com.portal.appliedJobs.service.impl;

import com.portal.appliedJobs.service.ResumeService;
import org.apache.commons.text.similarity.JaroWinklerSimilarity;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URL;
import java.util.Arrays;
import java.util.List;

@Service
public class ResumeServiceImpl implements ResumeService {

    private final JaroWinklerSimilarity similarity = new JaroWinklerSimilarity();

    @Override

    public String extractResumeText(String resumeUrl) throws IOException {
        InputStream inputStream = null;
        try {

            String encodedFileName = resumeUrl.substring(resumeUrl.lastIndexOf("/") + 1).replace(" ", "%20");
            String cleanedUrl = "https://reels-anshu.s3.eu-north-1.amazonaws.com/uploads/" + encodedFileName;


            System.out.println("Extracting resume text from URL: " + cleanedUrl);


            URL url = URI.create(cleanedUrl).toURL();
            inputStream = url.openStream();


            PDDocument document = PDDocument.load(inputStream);

            PDFTextStripper pdfTextStripper = new PDFTextStripper();
            String text = pdfTextStripper.getText(document);
            document.close();

            return text;
        } catch (IOException e) {
            System.err.println("IOException occurred while processing the PDF from the URL: " + resumeUrl);
            e.printStackTrace();
            throw e; // rethrow the exception after logging
        } catch (Exception e) {
            System.err.println("General Exception occurred while processing the PDF from the URL: " + resumeUrl);
            e.printStackTrace();
            throw e; // rethrow the exception after logging
        } finally {
            if (inputStream != null) {
                try {
                    inputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }



    @Override
    public double calculateMatchScore(String resumeText, String jobDescription) {
        // Preprocess both resume and job description to remove stop words, punctuation, etc.
        String preprocessedResume = preprocessText(resumeText);
        String preprocessedJobDesc = preprocessText(jobDescription);

        // Calculate similarity on preprocessed text
        return similarity.apply(preprocessedResume.toLowerCase(), preprocessedJobDesc.toLowerCase());
    }

    private String preprocessText(String text) {
        text = text.replaceAll("[^a-zA-Z0-9\\s]", "");
        text = text.toLowerCase();
        text = removeStopWords(text);
        return text;
    }

    private String removeStopWords(String text) {
        List<String> stopWords = Arrays.asList("the", "and", "is", "in", "to", "for", "of", "a", "an", "with");
        String[] words = text.split("\\s+");
        StringBuilder result = new StringBuilder();

        for (String word : words) {
            if (!stopWords.contains(word)) {
                result.append(word).append(" ");
            }
        }

        return result.toString().trim();
    }

}
