package org.ivkrylov.EvacuationBackend.Services;

import org.ivkrylov.EvacuationBackend.DTO.TestPost;
import org.ivkrylov.EvacuationBackend.Enitities.Tests.Answers;
import org.ivkrylov.EvacuationBackend.Enitities.Tests.Questions;
import org.ivkrylov.EvacuationBackend.Enitities.Tests.TestResults;
import org.ivkrylov.EvacuationBackend.Enitities.Tests.Tests;
import org.ivkrylov.EvacuationBackend.Enitities.Users;
import org.ivkrylov.EvacuationBackend.Repositories.Tests.AnswersRepository;
import org.ivkrylov.EvacuationBackend.Repositories.Tests.QuestionsRepository;
import org.ivkrylov.EvacuationBackend.Repositories.Tests.TestResultsRepository;
import org.ivkrylov.EvacuationBackend.Repositories.Tests.TestsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.ivkrylov.EvacuationBackend.DTO.Test;


import java.util.Date;
import java.util.Optional;

@Service
public class TestsService {
    @Autowired
    TestsRepository testsRepository;
    @Autowired
    QuestionsRepository questionsRepository;
    @Autowired
    AnswersRepository answersRepository;
    @Autowired
    TestResultsRepository testResultsRepository;

    @Autowired
    UsersService usersService;

    public Iterable<Tests> findAllTests(){
        return testsRepository.findAll();
    }

    public Optional<Tests> getTestByID(int id){
        return testsRepository.findById(id);
    }

    public Iterable<Questions> getQuestions(int testID){

        return questionsRepository.findByTest(testsRepository.findById(testID));
    }
    public Iterable<Answers> getAnswers(int testID){
        return answersRepository.findByQuestionIn(getQuestions(testID));
    }

    public String saveResult(TestPost testPost){
        System.out.println(testPost);
        for (int i = 0; i < testPost.getAnswer().length; i++){

            if(usersService.getUserByUsername(testPost.getUser()).isEmpty()){
                usersService.save(testPost.getUser());
            }
            Users user = usersService.getUserByUsername(testPost.getUser()).get();
            Answers answer = answersRepository.findById(testPost.getAnswer()[i]).get();
            Date date = new Date();
            TestResults testResults = new TestResults(user, answer, date);
            testResultsRepository.save(testResults);
        }
        return null;
    }

    public String saveNewTest(Test test){
        testsRepository.save(test.getTest());
        for(Questions q : test.getQuestions())
            questionsRepository.save(q);
        for(Answers a : test.getAnswers())
            answersRepository.save(a);
        return null;
    }

    public Optional<Tests> findTestById(int id){
        return testsRepository.findById(id);
    }

    public void deleteTest(int id){
        Optional<Tests> test = testsRepository.findById(id);
        Iterable<Questions> questions = questionsRepository.findByTest(test);
        Iterable<Answers> answers = answersRepository.findByQuestionIn(questions);

        for(Answers a : answers)
            answersRepository.delete(a);
        for(Questions o : questions)
            questionsRepository.delete(o);
        testsRepository.delete(test.get());
    }
}
