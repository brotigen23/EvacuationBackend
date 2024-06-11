package org.ivkrylov.EvacuationBackend.Controllers.Admin;

import org.ivkrylov.EvacuationBackend.DTO.Test;
import org.ivkrylov.EvacuationBackend.Enitities.Tests.Answers;
import org.ivkrylov.EvacuationBackend.Enitities.Tests.Questions;
import org.ivkrylov.EvacuationBackend.Enitities.Tests.Tests;
import org.ivkrylov.EvacuationBackend.Services.TestsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/admin/tests")
public class TestsControllerAdmin {
    @Autowired
    TestsService service;
    @GetMapping
    public String getTests(Model model){
        model.addAttribute("tests", service.findAllTests());
        return "pages/admin/tests/tests";
    }

    @GetMapping("/{id}")
    public String getTestById(@PathVariable int id, Model model){
        Tests test = service.getTestByID(id).get();
        Iterable<Questions> questions = service.getQuestions(id);
        Iterable<Answers> answers = service.getAnswers(id);
        Test t = new Test(test, questions, answers);
        model.addAttribute("test", t);
        System.out.println(t);
        return "pages/admin/tests/test";
    }

    @GetMapping("/new")
    public String createNewTest(Model model){
        model.addAttribute("test", new Test());
        return "pages/admin/tests/test";
    }
    @GetMapping("/delete/{id}")
    public String deleteTest(@PathVariable int id, Model model){
        service.findTestById(id).ifPresent(o -> service.deleteTest(o.getId()));
        return "redirect:/admin/tests";
    }

    @PostMapping("/post")
    public String postArticle(@ModelAttribute("test") Test test){
        service.saveNewTest(test);
        System.out.println(test.toString());
        return "redirect:/admin/tests";
    }

}
