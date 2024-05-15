package org.ivkrylov.EvacuationBackend.Controllers;

import lombok.Getter;
import org.ivkrylov.EvacuationBackend.Enitities.Tests.Answers;
import org.ivkrylov.EvacuationBackend.Enitities.Tests.Questions;
import org.ivkrylov.EvacuationBackend.Enitities.Tests.Tests;
import org.ivkrylov.EvacuationBackend.Services.TestsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Getter
class Test{
    public Optional<Tests> t;
    public Iterable<Questions> q;
    public Iterable<Answers> a;
    Test(Optional<Tests> t, Iterable<Questions> q, Iterable<Answers> a){
        this.a = a;
        this.q = q;
        this.t = t;
    }
}

@RestController
@CrossOrigin
@RequestMapping("/tests")
public class TestsController {
    @Autowired
    TestsService testsService;
    @GetMapping
    public Iterable<Tests> getTests(){
        return testsService.getTests();
    }
    @GetMapping("/{id}")
    public Test getTest(@PathVariable int id) {
        return new Test(testsService.getTestByID(id), testsService.getQuestions(id), testsService.getAnswers(id));
    }
}
