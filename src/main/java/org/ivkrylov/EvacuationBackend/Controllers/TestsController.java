package org.ivkrylov.EvacuationBackend.Controllers;

import org.ivkrylov.EvacuationBackend.DTO.TestPost;
import org.ivkrylov.EvacuationBackend.Enitities.Tests.TestResults;
import org.ivkrylov.EvacuationBackend.Services.TestsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Map;



@Controller
@RequestMapping("/tests")
public class TestsController {
    @Autowired
    TestsService testsService;
    @GetMapping
    public String getTests(Model model){
        model.addAttribute("tests", testsService.findAllTests());
        return "pages/tests/tests";
    }
    @GetMapping("/{id}")
    public String getTest(@PathVariable int id, Model model) {
        testsService.getTestByID(id).ifPresent(o -> model.addAttribute("test", o));
        model.addAttribute("questions", testsService.getQuestions(id));
        model.addAttribute("answers", testsService.getAnswers(id));
        // Количество вопросов
        int size = 0;
        for(Object o : testsService.getQuestions(id))
            size++;

        model.addAttribute("testPost", new TestPost(size));
        return "pages/tests/test";
    }

    @PostMapping("/")
    public String postTest(@ModelAttribute("testPost") TestPost testPost){
        System.out.println("Post request....");
        testsService.save(testPost);
        return "redirect:/tests";
    }
}
